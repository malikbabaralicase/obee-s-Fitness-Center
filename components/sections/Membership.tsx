"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import CornerSquare from "@/components/ui/CornerSquare";
import { PLANS } from "@/lib/constants";
import { SELECT_PLAN_EVENT } from "@/lib/planSelection";
import { stagger, scaleReveal, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/cn";

export default function Membership() {
  // The featured plan starts selected; clicking any card highlights it
  // and tells the contact form to pre-select that plan.
  const [selected, setSelected] = useState<string>(
    PLANS.find((p) => p.featured)?.id ?? PLANS[0].id
  );

  const choosePlan = (id: string) => {
    setSelected(id);
    window.dispatchEvent(new CustomEvent(SELECT_PLAN_EVENT, { detail: id }));
  };

  return (
    <section id="membership" className="section-pad relative overflow-hidden bg-black">
      {/* Soft top divider from the previous chapter */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-hairline-dark" />

      <div className="container-content relative">
        <SectionHeading
          eyebrow="Membership"
          title={
            <>
              Choose your <span className="text-gradient-accent">commitment.</span>
            </>
          }
          intro="Every plan unlocks the full Obee's floor. The longer you commit, the more you unlock — and the more you save."
          align="center"
          className="mx-auto items-center text-center"
        />

        <motion.div
          className="mt-16 grid gap-6 lg:grid-cols-3 lg:items-stretch"
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {PLANS.map((plan) => {
            const isSelected = selected === plan.id;
            return (
              <motion.article
                key={plan.id}
                variants={scaleReveal}
                aria-current={isSelected ? "true" : undefined}
                className={cn(
                  "group relative flex flex-col rounded-sm p-8 transition-all duration-300 ease-out",
                  // Hover animation on every card
                  "hover:-translate-y-2 hover:shadow-accent-glow",
                  isSelected
                    ? "glass border border-accent shadow-accent-glow lg:-mt-4 lg:mb-4"
                    : "card-dark hover:border-accent/50"
                )}
              >
                <CornerSquare corner={isSelected ? "tr" : "tl"} size={isSelected ? 16 : 12} />

                {/* Cadence / selected tag */}
                <span
                  className={cn(
                    "mb-6 inline-flex w-fit items-center rounded-sm px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] transition-colors",
                    isSelected ? "bg-accent text-black" : "bg-white/5 text-on-dark-mute"
                  )}
                >
                  {isSelected ? "Selected" : plan.cadence}
                </span>

                <h3 className="text-heading-md text-on-dark">{plan.name}</h3>
                <p className="mt-2 text-body-sm text-on-dark-mute">{plan.blurb}</p>

                {/* Price */}
                <div className="mt-6 flex items-end gap-1.5">
                  <span className="text-[0.85rem] font-bold text-on-dark-mute">{plan.currency}</span>
                  <span className="text-[2.75rem] font-bold leading-none text-on-dark">
                    {plan.price}
                  </span>
                  <span className="mb-1 text-[0.85rem] text-on-dark-mute">{plan.period}</span>
                </div>

                <div aria-hidden className="my-7 h-px w-full bg-hairline-dark" />

                {/* Features */}
                <ul className="flex flex-1 flex-col gap-3.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-body-sm text-on-dark-mute">
                      <Check size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA — highlights this card and pre-selects the plan in the form */}
                <div className="mt-8">
                  {isSelected ? (
                    <MagneticButton
                      as="link"
                      href="#contact"
                      size="lg"
                      className="w-full"
                      cursorLabel="Join"
                      onClick={() => choosePlan(plan.id)}
                    >
                      Get Started
                    </MagneticButton>
                  ) : (
                    <Button
                      as="link"
                      href="#contact"
                      variant="outline"
                      size="lg"
                      className="w-full"
                      cursorLabel="Choose"
                      onClick={() => choosePlan(plan.id)}
                    >
                      Choose {plan.name}
                    </Button>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-10 text-center text-caption-sm text-mute">
          All plans include a free onboarding session · No hidden fees · Cancel anytime on monthly.
        </p>
      </div>
    </section>
  );
}
