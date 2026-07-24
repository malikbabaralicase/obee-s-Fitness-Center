"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Premium custom cursor: a precise dot plus a trailing ring that
 * grows and labels itself over interactive elements. Pointer devices
 * only; fully disabled on touch and under reduced-motion.
 */
export default function CustomCursor() {
  const isTouch = useIsTouch();
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const enabled = !isTouch && !reduced;

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(render);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], [data-cursor-athlete], input, textarea, select, label, .cursor-target"
      );
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor") ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent"
        style={{ transition: "width 0.2s, height 0.2s" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center rounded-full border border-accent/70 text-[10px] font-bold uppercase tracking-widest text-accent"
        style={{
          width: active ? 64 : 34,
          height: active ? 64 : 34,
          marginLeft: active ? -32 : -17,
          marginTop: active ? -32 : -17,
          backgroundColor: active ? "rgba(232,176,75,0.08)" : "transparent",
          transition: "width 0.25s, height 0.25s, margin 0.25s, background-color 0.25s",
        }}
      >
        {label}
      </div>
    </div>
  );
}
