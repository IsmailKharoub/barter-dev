"use client";

import { useState, useRef, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "password" | "tel" | "url" | "number";
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function AnimatedInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
  disabled,
  error,
  className,
  icon,
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;
  
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      {/* Main input container */}
      <motion.div
        className={cn(
          "relative rounded-xl overflow-hidden cursor-text",
          "bg-bg-tertiary/50 backdrop-blur-sm",
          "border transition-colors duration-300",
          error
            ? "border-red-500/50"
            : isFocused
            ? "border-accent-primary/50"
            : "border-border-default",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleContainerClick}
        animate={{
          boxShadow: isFocused
            ? "0 0 0 4px rgba(255, 255, 255, 0.08)"
            : "0 0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white via-gray-300 to-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        
        {/* Icon */}
        {icon && (
          <motion.div
            className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-muted"
            animate={{
              color: isFocused ? "var(--accent-primary)" : "var(--fg-muted)",
              scale: isFocused ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        )}
        
        {/* Floating label */}
        <motion.label
          htmlFor={id}
          className={cn(
            "absolute pointer-events-none transition-colors duration-200",
            icon ? "left-12" : "left-4",
            isActive ? "text-accent-primary" : "text-fg-muted"
          )}
          initial={false}
          animate={{
            y: isActive ? -10 : 0,
            scale: isActive ? 0.75 : 1,
            x: isActive ? (icon ? -8 : 0) : 0,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            top: "50%",
            translateY: "-50%",
            transformOrigin: "left",
          }}
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </motion.label>
        
        {/* Input */}
        <input
          ref={inputRef}
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isFocused ? placeholder : ""}
          required={required}
          disabled={disabled}
          className={cn(
            "w-full bg-transparent text-fg-primary",
            "pt-6 pb-2 outline-none",
            icon ? "pl-12 pr-4" : "px-4",
            "placeholder:text-fg-muted/50"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Character count or validation indicator */}
        <AnimatePresence>
          {isFocused && hasValue && (
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <motion.div
                className={cn(
                  "w-5 h-5 rounded-full flex items-center justify-center",
                  error ? "bg-red-500/20" : "bg-success/20"
                )}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3 }}
              >
                {error ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="absolute -bottom-5 left-0 text-xs text-red-400"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

// Textarea variant
interface AnimatedTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
}

export function AnimatedTextarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  error,
  className,
  rows = 4,
  maxLength,
}: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const id = useId();
  
  const hasValue = value.length > 0;
  const isActive = isFocused || hasValue;
  
  const handleContainerClick = () => {
    textareaRef.current?.focus();
  };

  return (
    <div className={cn("relative", className)}>
      {/* Main container */}
      <motion.div
        className={cn(
          "relative rounded-xl overflow-hidden cursor-text",
          "bg-bg-tertiary/50 backdrop-blur-sm",
          "border transition-colors duration-300",
          error
            ? "border-red-500/50"
            : isFocused
            ? "border-accent-primary/50"
            : "border-border-default",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleContainerClick}
        animate={{
          boxShadow: isFocused
            ? "0 0 0 4px rgba(255, 255, 255, 0.08)"
            : "0 0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white via-gray-300 to-white"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ transformOrigin: "left" }}
        />
        
        {/* Floating label */}
        <motion.label
          htmlFor={id}
          className={cn(
            "absolute left-4 pointer-events-none transition-colors duration-200",
            isActive ? "text-accent-primary" : "text-fg-muted"
          )}
          initial={false}
          animate={{
            y: isActive ? 0 : 12,
            scale: isActive ? 0.75 : 1,
          }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            top: 12,
            transformOrigin: "left",
          }}
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </motion.label>
        
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={isFocused ? placeholder : ""}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={cn(
            "w-full bg-transparent text-fg-primary resize-none",
            "pt-8 pb-3 px-4 outline-none",
            "placeholder:text-fg-muted/50"
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {/* Character count */}
        {maxLength && (
          <div className="absolute bottom-2 right-3 text-xs text-fg-muted">
            <motion.span
              animate={{
                color: value.length > maxLength * 0.9 ? "#ef4444" : "var(--fg-muted)",
              }}
            >
              {value.length}
            </motion.span>
            /{maxLength}
          </div>
        )}
      </motion.div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.p
            className="absolute -bottom-5 left-0 text-xs text-red-400"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

