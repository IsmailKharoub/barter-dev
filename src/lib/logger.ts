/**
 * Centralized logging utility for CloudWatch integration
 * All logs are automatically captured by Amplify and sent to CloudWatch
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
  [key: string]: unknown;
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

  info(message: string, data?: LogContext) {
    const logEntry = this.formatMessage('info', message, data);
    console.log(JSON.stringify(logEntry));
  }

  warn(message: string, data?: LogContext) {
    const logEntry = this.formatMessage('warn', message, data);
    console.warn(JSON.stringify(logEntry));
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

