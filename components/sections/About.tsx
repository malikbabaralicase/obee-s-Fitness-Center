"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, Eye } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import CornerSquare from "@/components/ui/CornerSquare";
import { STATS, PILLARS, TIMELINE } from "@/lib/constants";
import { fadeUp, stagger, staggerItem } from "@/lib/motion";
import { motion } from "framer-motion";

const PILLAR_ICONS = { target: Target, eye: Eye } as const;

export default function About() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !sceneRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Parallax the oversized backdrop word as the section scrolls.
      gsap.to(".about-ghost", {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      // Clip-reveal the image composition.
      gsap.fromTo(
        ".about-image",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-image", start: "top 80%" },
        }
      );
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sceneRef} className="section-pad relative overflow-hidden bg-black">
      {/* Oversized ghost word */}
      <span
        aria-hidden
        className="about-ghost pointer-events-none absolute -top-10 left-0 select-none text-[22vw] font-bold leading-none tracking-tighter text-white/[0.03]"
      >
        DISCIPLINE
      </span>

      <div className="container-content relative">
        <SectionHeading
          eyebrow="About Obee's"
          title={
            <>
              More than a gym.
              <br />
              <span className="text-gradient-accent">A standard.</span>
            </>
          }
          intro="We built Obee's for people who refuse to settle — a space where premium equipment, expert coaching and relentless energy turn intention into transformation."
        />

        {/* Stats */}
        <motion.ul
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden border border-hairline-dark bg-hairline-dark lg:grid-cols-4"
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {STATS.map((s) => (
            <motion.li
              key={s.label}
              variants={staggerItem}
              className="relative flex flex-col gap-2 bg-black p-8"
            >
              <CornerSquare corner="tl" />
              <span className="text-display-lg font-bold text-accent lg:text-[2.75rem]">
                <Counter value={s.value} suffix={s.suffix} />
              </span>
              <span className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-on-dark-mute">
                {s.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        {/* Mission / Vision + image composition */}
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {PILLARS.map((p) => {
              const Icon = PILLAR_ICONS[p.icon as keyof typeof PILLAR_ICONS] ?? Target;
              return (
                <Reveal key={p.title} variants={fadeUp} className="card-dark relative p-8">
                  <CornerSquare corner="tl" />
                  <Icon className="mb-5 text-accent" size={26} aria-hidden />
                  <h3 className="mb-3 text-heading-md text-on-dark">{p.title}</h3>
                  <p className="text-body-md text-on-dark-mute">{p.copy}</p>
                </Reveal>
              );
            })}
          </div>

          {/* Image composition (CSS-rendered, no external asset needed) */}
          <Reveal variants={fadeUp} className="relative min-h-[320px]">
            <div
              className="about-image relative h-full min-h-[320px] overflow-hidden rounded-sm border border-hairline-dark"
              style={{
                background:
                  "radial-gradient(120% 120% at 100% 0%, rgba(232,176,75,0.35), transparent 55%), linear-gradient(155deg, #141414, #000)",
              }}
            >
              <CornerSquare corner="br" size={16} />
              <div className="absolute inset-0 flex items-end p-8">
                <div>
                  <p className="text-[0.72rem] font-bold uppercase tracking-[0.25em] text-accent">
                    Since 2017
                  </p>
                  <p className="mt-2 max-w-xs text-heading-md text-on-dark">
                    Engineered for results. Designed for those who show up.
                  </p>
                </div>
              </div>
              {/* Decorative concentric arcs echoing the hero sculpture */}
              <svg
                aria-hidden
                className="absolute -right-16 -top-16 h-64 w-64 opacity-40"
                viewBox="0 0 200 200"
                fill="none"
              >
                {[80, 60, 40].map((r) => (
                  <circle key={r} cx="100" cy="100" r={r} stroke="#e8b04b" strokeOpacity="0.5" strokeWidth="1" />
                ))}
              </svg>
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <div className="mt-20">
          <Reveal variants={fadeUp}>
            <h3 className="mb-10 text-heading-xl text-on-dark">Our journey</h3>
          </Reveal>
          <ol className="relative grid gap-10 border-l border-hairline-dark pl-8 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-10">
            {TIMELINE.map((t, i) => (
              <Reveal
                as="li"
                key={t.year}
                variants={fadeUp}
                delay={i * 0.08}
                className="relative lg:pr-6"
              >
                <span
                  aria-hidden
                  className="absolute -left-[35px] top-1 h-2.5 w-2.5 bg-accent lg:-top-[45px] lg:left-0"
                />
                <p className="text-caption-md font-bold uppercase tracking-[0.2em] text-accent">
                  {t.year}
                </p>
                <h4 className="mt-2 text-heading-sm text-on-dark">{t.title}</h4>
                <p className="mt-2 text-body-sm text-on-dark-mute">{t.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
