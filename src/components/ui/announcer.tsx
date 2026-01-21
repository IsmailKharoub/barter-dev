"use client";

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";

type AriaLive = "polite" | "assertive" | "off";

interface Announcement {
  message: string;
  priority: AriaLive;
  id: string;
}

interface AnnouncerContextValue {
  announce: (message: string, priority?: AriaLive) => void;
  announcePolite: (message: string) => void;
  announceAssertive: (message: string) => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | null>(null);

/**
 * Provider component that manages ARIA live announcements
 * Place this at the root of your app to enable screen reader announcements
 */
export function AnnouncerProvider({ children }: { children: React.ReactNode }) {
  const [politeAnnouncement, setPoliteAnnouncement] = useState("");
  const [assertiveAnnouncement, setAssertiveAnnouncement] = useState("");
  
  // Use refs to track timeouts
  const politeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const assertiveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const announce = useCallback((message: string, priority: AriaLive = "polite") => {
    if (priority === "assertive") {
      // Clear previous timeout
      if (assertiveTimeoutRef.current) {
        clearTimeout(assertiveTimeoutRef.current);
      }
      
      // Set message, then clear after delay
      setAssertiveAnnouncement(message);
      assertiveTimeoutRef.current = setTimeout(() => {
        setAssertiveAnnouncement("");
      }, 1000);
    } else {
      // Clear previous timeout
      if (politeTimeoutRef.current) {
        clearTimeout(politeTimeoutRef.current);
      }
      
      // Set message, then clear after delay
      setPoliteAnnouncement(message);
      politeTimeoutRef.current = setTimeout(() => {
        setPoliteAnnouncement("");
      }, 1000);
    }
  }, []);

  const announcePolite = useCallback((message: string) => {
    announce(message, "polite");
  }, [announce]);

  const announceAssertive = useCallback((message: string) => {
    announce(message, "assertive");
  }, [announce]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (politeTimeoutRef.current) clearTimeout(politeTimeoutRef.current);
      if (assertiveTimeoutRef.current) clearTimeout(assertiveTimeoutRef.current);
    };
  }, []);

  return (
    <AnnouncerContext.Provider value={{ announce, announcePolite, announceAssertive }}>
      {children}
      
      {/* Polite live region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {politeAnnouncement}
      </div>
      
      {/* Assertive live region */}
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
      >
        {assertiveAnnouncement}
      </div>
    </AnnouncerContext.Provider>
  );
}

/**
 * Hook to access the announcer context
 */
export function useAnnouncer() {
  const context = useContext(AnnouncerContext);
  
  if (!context) {
    throw new Error("useAnnouncer must be used within an AnnouncerProvider");
  }
  
  return context;
}

/**
 * Screen reader only content - visually hidden but accessible
 */
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  );
}

/**
 * Accessible loading indicator
 */
export function LoadingIndicator({ 
  message = "Loading...",
  className 
}: { 
  message?: string;
  className?: string;
}) {
  return (
    <div 
      role="status" 
      aria-live="polite"
      className={className}
    >
      <span className="sr-only">{message}</span>
      <div 
        className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin"
        aria-hidden="true"
      />
    </div>
  );
}

/**
 * Focus trap for modals and overlays
 */
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements
    const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus when trap is deactivated
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

