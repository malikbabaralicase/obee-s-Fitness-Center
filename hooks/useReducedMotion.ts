"use client";

import { useEffect, useState } from "react";

/**
 * Reactive `prefers-reduced-motion` hook. Returns `true` when the
 * user has requested reduced motion. SSR-safe (defaults to false).
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
