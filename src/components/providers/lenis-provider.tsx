"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedEffects } from "@/lib/hooks";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reducedEffects = useReducedEffects();

  useEffect(() => {
    // Allow CSS to adapt (e.g., kill heavy blur/backdrop-filter on mobile)
    if (reducedEffects) {
      document.documentElement.dataset.reducedEffects = "true";
    } else {
      delete document.documentElement.dataset.reducedEffects;
    }
  }, [reducedEffects]);

  useEffect(() => {
    if (reducedEffects) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [reducedEffects]);

  return <>{children}</>;
}

