"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroAthlete from "@/components/hero/HeroAthlete";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { BUSINESS } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/cn";

const headline = ["Train", "Like It", "Matters."];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const athleteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scroll storytelling: the athlete video drifts slightly on scroll.
      gsap.to(athleteRef.current, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-start overflow-hidden bg-black md:justify-center"
    >
      {/* Foreground athlete video — the section's own bg-black is the base layer.
          On mobile this is a normal in-flow block stacked BELOW the text (order-2,
          via mt-8 for breathing room), guaranteeing it can never overlap the copy
          above it regardless of content length or device height. On desktop it
          reverts to an absolute, full-height, right-anchored overlay. */}
      <div
        ref={athleteRef}
        className="relative z-[1] order-2 mt-8 w-full will-change-transform md:absolute md:inset-0 md:order-none md:mt-0"
      >
        <HeroAthlete />
      </div>

      {/* Layer 3 — legibility gradient (copy hugs the left third) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-black via-black/70 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-t from-black to-transparent"
      />

      <div className="container-content relative z-10 pt-28">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE_OUT }}
        >
          Premium Fitness · Rawalpindi
        </motion.p>

        <h1 className="max-w-4xl text-[3rem] font-bold leading-[0.98] tracking-tight text-on-dark xs:text-[3.75rem] sm:text-[5rem] lg:text-[6.75rem]">
          {headline.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className={cn(i === 2 && "text-gradient-accent", "inline-block")}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: EASE_OUT }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-heading-lg text-on-dark-mute"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: EASE_OUT }}
        >
          {BUSINESS.description}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: EASE_OUT }}
        >
          <MagneticButton as="link" href="#membership" size="lg" cursorLabel="Join">
            Join Now
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-10 flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
