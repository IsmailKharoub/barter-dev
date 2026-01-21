"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Character-by-character reveal animation
interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function TextReveal({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  as: Component = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  
  const characters = text.split("");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
  };

  return (
    <motion.span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={cn("inline-block", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ perspective: 1000 }}
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={characterVariants}
          style={{ 
            transformStyle: "preserve-3d",
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Word-by-word reveal animation
interface WordRevealProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  staggerDelay = 0.08,
  once = true,
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  
  const words = text.split(" ");

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={cn("inline-block mr-[0.25em]", wordClassName)}
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Line-by-line reveal animation
interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  staggerDelay = 0.15,
  once = true,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -30,
      clipPath: "inset(0 100% 0 0)",
    },
    visible: {
      opacity: 1,
      x: 0,
      clipPath: "inset(0 0% 0 0)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          className={lineClassName}
          variants={lineVariants}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Animated counter for numbers
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
}

export function CountUp({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
  once = true,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [count, setCount] = useState(from);
  const controls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delay * 1000;

      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const progress = Math.min(elapsed / (duration * 1000), 1);
      
      // Easing function (ease-out cubic)
      const eased = 1 - Math.pow(1 - progress, 3);
      
      const current = from + (to - from) * eased;
      setCount(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, from, to, duration, delay]);

  const formattedCount = count.toFixed(decimals);

  return (
    <motion.span
      ref={ref}
      className={cn("tabular-nums", className)}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      {prefix}
      {formattedCount}
      {suffix}
    </motion.span>
  );
}

// Typewriter effect
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  cursorChar?: string;
  once?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = "|",
  once = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    let timeout: NodeJS.Timeout;
    let charIndex = 0;

    const startTyping = () => {
      const typeChar = () => {
        if (charIndex <= text.length) {
          setDisplayText(text.slice(0, charIndex));
          charIndex++;
          timeout = setTimeout(typeChar, speed);
        }
      };
      typeChar();
    };

    const delayTimeout = setTimeout(startTyping, delay * 1000);

    return () => {
      clearTimeout(delayTimeout);
      clearTimeout(timeout);
    };
  }, [isInView, text, speed, delay]);

  // Cursor blink
  useEffect(() => {
    if (!cursor) return;
    
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {cursor && (
        <span
          className="text-accent-primary"
          style={{ opacity: showCursor ? 1 : 0 }}
        >
          {cursorChar}
        </span>
      )}
    </span>
  );
}

