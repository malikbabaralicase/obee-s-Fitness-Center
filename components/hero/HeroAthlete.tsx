"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Layer 2 — the cinematic athlete video.
 *
 * Below "md" (1024px — phones AND portrait tablets, which share a tall,
 * narrow viewport aspect) it renders as a normal, in-flow, full-width band
 * that sits BELOW the text (not as an absolute overlay behind it). This is
 * deliberate: an absolutely-positioned bottom band can collide with the
 * text block above it whenever the section vertically centers its content
 * (short content on a tall viewport), and a tall/narrow right-anchored crop
 * at phone aspect ratios forces object-cover to zoom in extremely tight,
 * showing little more than a sliver of the frame. Being a normal flow
 * element guarantees zero overlap regardless of content length or device
 * height.
 *
 * At "md" and up (reliably landscape: tablets-landscape, laptops, desktops)
 * it switches back to the original right-anchored, full-height absolute
 * treatment. Both variants share the same edge-feathered gradient blending
 * so the video reads as one continuous cinematic scene rather than "a video
 * pasted on a page".
 */
export default function HeroAthlete() {
  const reduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useVideo, setUseVideo] = useState(true);

  // Entrance: soft fade + cinematic scale settle — "emerging from darkness".
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (reduced) {
      gsap.set(wrap, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrap,
        { opacity: 0, scale: 1.06, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out", delay: 0.55 }
      );
    }, wrap);

    return () => ctx.revert();
  }, [reduced]);

  // Subtle mouse parallax — eased depth movement, never distracting.
  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let raf = 0;
    let cx = 0, cy = 0, tx = 0, ty = 0;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      tx = nx * 12;
      ty = ny * 8;
    };
    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      gsap.set(wrap, { x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Pause when the tab is hidden; fall back to poster on playback error.
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
    <div
      ref={wrapRef}
      className="pointer-events-none relative h-[42vh] w-full opacity-0 will-change-transform md:absolute md:right-0 md:top-0 md:h-full md:w-[56vw] md:max-w-[1000px] lg:w-[55vw] xl:w-[52vw]"
    >
      <div
        data-cursor-athlete
        className="pointer-events-auto relative h-full w-full overflow-hidden"
      >
        {useVideo && !reduced ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-[78%_center] [transform:translateZ(0)] will-change-transform"
            poster="/assets/hero-athlete-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setUseVideo(false)}
          >
            {/* Below the "md" breakpoint (1024px) — matches the bottom-band layout above.
                Covers phones AND portrait tablets, which share the same tall,
                narrow aspect that needs the lighter, less-cropped encode. */}
            <source media="(max-width: 1023px)" src="/assets/hero-athlete-mobile.webm" type="video/webm" />
            <source media="(max-width: 1023px)" src="/assets/hero-athlete-mobile.mp4" type="video/mp4" />
            <source src="/assets/hero-athlete.webm" type="video/webm" />
            <source src="/assets/hero-athlete.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/assets/hero-athlete-poster.jpg"
            alt="Athlete training at Obee's Fitness Center"
            className="h-full w-full object-cover object-[78%_center] [transform:translateZ(0)]"
          />
        )}

        {/* Cinematic edge blending — no visible rectangular edges. */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-[36%] bg-gradient-to-r from-black to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-black to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/55 to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-black/45 to-transparent" />
      </div>
    </div>
  );
}
