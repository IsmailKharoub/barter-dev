"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

/**
 * Reduced effects mode:
 * - coarse pointers (most phones/tablets)
 * - prefers-reduced-motion
 * - data saver (Save-Data)
 *
 * Intended to keep scroll smooth on mobile by disabling heavy/continuous effects.
 */
export function useReducedEffects(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    const hoverNoneQuery = window.matchMedia("(hover: none)");

    const updatePointer = () => {
      setIsCoarsePointer(coarseQuery.matches || hoverNoneQuery.matches);
    };

    updatePointer();

    coarseQuery.addEventListener("change", updatePointer);
    hoverNoneQuery.addEventListener("change", updatePointer);

    return () => {
      coarseQuery.removeEventListener("change", updatePointer);
      hoverNoneQuery.removeEventListener("change", updatePointer);
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    setSaveData(Boolean(connection?.saveData));
  }, []);

  return useMemo(
    () => prefersReducedMotion || isCoarsePointer || saveData,
    [prefersReducedMotion, isCoarsePointer, saveData]
  );
}


