/**
 * Centralized logging utility for CloudWatch and MongoDB
 * All logs are automatically captured by Amplify and sent to CloudWatch
 * Important logs are also saved to MongoDB for long-term analysis
 */

import { saveLogToDatabase, type LogEntry } from './db/logs';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
  requestId?: string;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
}

class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string, data?: LogContext) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      context: this.context,
      message,
      ...(data && { data }),
    };

    return logEntry;
  }

  private async saveToDatabase(
    level: LogLevel,
    message: string,
    error?: Error | unknown,
    data?: LogContext
  ) {
    // Only save important logs to database (errors, warnings, and important info)
    const shouldSave = 
      level === 'error' || 
      level === 'warn' || 
      (level === 'info' && (data?.requestId || message.includes('submission') || message.includes('created')));

    if (shouldSave) {
      const logEntry: LogEntry = {
        timestamp: new Date(),
        level,
        context: this.context,
        message,
        data,
        requestId: data?.requestId as string | undefined,
        userId: data?.userId as string | undefined,
        ipAddress: data?.ipAddress as string | undefined,
        userAgent: data?.userAgent as string | undefined,
        ...(error instanceof Error && {
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
        }),
      };

      // Save to MongoDB asynchronously (don't wait)
      saveLogToDatabase(logEntry).catch(err => {
        console.error('[Logger] Failed to save to database:', err);
      });
    }
  }

  info(message: string, data?: LogContext) {
    const logEntry = this.formatMessage('info', message, data);
    console.log(JSON.stringify(logEntry));
    this.saveToDatabase('info', message, undefined, data);
  }

  warn(message: string, data?: LogContext) {
    const logEntry = this.formatMessage('warn', message, data);
    console.warn(JSON.stringify(logEntry));
    this.saveToDatabase('warn', message, undefined, data);
  }

  error(message: string, error?: Error | unknown, data?: LogContext) {
    const logEntry = this.formatMessage('error', message, {
      ...data,
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
      } : error,
    });
    console.error(JSON.stringify(logEntry));
    this.saveToDatabase('error', message, error, data);
  }

  debug(message: string, data?: LogContext) {
    if (process.env.NODE_ENV === 'development') {
      const logEntry = this.formatMessage('debug', message, data);
      console.debug(JSON.stringify(logEntry));
    }
  }
}

// Create logger instances for different parts of the app
export const createLogger = (context: string) => new Logger(context);

// Pre-configured loggers
export const apiLogger = createLogger('API');
export const dbLogger = createLogger('DATABASE');
export const authLogger = createLogger('AUTH');
export const emailLogger = createLogger('EMAIL');

