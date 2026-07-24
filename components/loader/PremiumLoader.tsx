"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_IN_OUT, EASE_OUT } from "@/lib/motion";
import { BUSINESS } from "@/lib/constants";

/**
 * Full-screen premium loader: animated wordmark + amber progress
 * counter, then a curtain-wipe reveal into the page. Ties its
 * lifetime to fonts + window load, capped so it never hangs.
 */
export default function PremiumLoader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const MIN_MS = 1400; // ensure the brand moment is felt
    let ready = false;

    const markReady = () => {
      ready = true;
    };
    if (document.readyState === "complete") ready = true;
    else window.addEventListener("load", markReady, { once: true });
    // Fonts add polish but shouldn't block forever.
    document.fonts?.ready.then(markReady).catch(() => {});

    const tick = (now: number) => {
      const elapsed = now - start;
      // Approach 90% smoothly, then snap to 100 once ready + min time met.
      const ceiling = ready && elapsed > MIN_MS ? 100 : 90;
      setProgress((p) => {
        const next = p + (ceiling - p) * 0.06 + 0.4;
        return Math.min(next, ceiling);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", markReady);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100 && !done) {
      const t = setTimeout(() => setDone(true), 450);
      return () => clearTimeout(t);
    }
  }, [progress, done]);

  // Lock scroll while loading.
  useEffect(() => {
    document.body.style.overflow = done ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: EASE_IN_OUT }}
        >
          {/* Curtain wipe */}
          <motion.div
            className="pointer-events-none absolute inset-0 origin-bottom bg-black"
            initial={{ scaleY: 0 }}
            animate={progress >= 100 ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
            style={{ display: progress >= 100 ? "block" : "none" }}
          />

          <div className="relative flex flex-col items-center gap-8 px-6">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_OUT }}
            >
              <span className="h-3 w-3 bg-accent" aria-hidden />
              <span className="text-2xl font-bold uppercase tracking-[0.32em] text-on-dark">
                {BUSINESS.shortName}
              </span>
            </motion.div>

            {/* Progress track */}
            <div className="flex w-64 flex-col gap-3">
              <div className="h-px w-full overflow-hidden bg-white/15">
                <div
                  className="h-full bg-accent transition-[width] duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-[0.25em] text-on-dark-mute">
                <span>Preparing your experience</span>
                <span className="tabular-nums text-accent">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
