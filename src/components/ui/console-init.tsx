"use client";

import { useEffect } from "react";
import { initConsoleMessage, logPerformanceMetrics } from "@/lib/utils/console-message";

/**
 * Client-side component that initializes console messages
 * This is loaded dynamically to avoid SSR issues
 */
export function ConsoleInit() {
  useEffect(() => {
    // Initialize console message for developers
    initConsoleMessage();
    
    // Log performance metrics
    logPerformanceMetrics();
  }, []);

  return null;
}

