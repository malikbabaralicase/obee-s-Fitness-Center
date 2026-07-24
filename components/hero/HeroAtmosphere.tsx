"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Layer 1 — atmospheric background. Plays the cleaned smoke video full-bleed
 * with the matching poster (no load flicker), darkened for legibility and
 * GPU-accelerated. Falls back to the static poster image under reduced motion
 * or if the video can't play, and pauses when the tab is hidden.
 */
export default function HeroAtmosphere() {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    if (reduced) {
      setUseVideo(false);
      return;
    }
    const v = videoRef.current;
    if (!v) return;

    const onVisibility = () => {
      if (document.hidden) v.pause();
      else v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    v.play().catch(() => setUseVideo(false));

    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [reduced]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black" aria-hidden>
      {useVideo && !reduced ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover [transform:translateZ(0)] will-change-transform"
          poster="/assets/hero-bg-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setUseVideo(false)}
        >
          <source src="/assets/hero-bg.webm" type="video/webm" />
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/assets/hero-bg-poster.jpg"
          alt=""
          className="h-full w-full object-cover [transform:translateZ(0)]"
        />
      )}

      {/* Slight global darken so the atmosphere never fights foreground copy. */}
      <div className="absolute inset-0 bg-black/35" />
    </div>
  );
}
