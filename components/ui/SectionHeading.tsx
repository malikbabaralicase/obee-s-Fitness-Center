import Reveal from "./Reveal";
import { blurReveal, fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Consistent eyebrow + headline + optional intro block used to open
 * each section. Hierarchy comes from size/weight, per the design system.
 */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal variants={fadeUp}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <Reveal variants={blurReveal}>
        <h2 className="max-w-3xl text-display-lg font-bold leading-[1.05] text-on-dark lg:text-display-xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal variants={fadeUp} delay={0.1}>
          <p className="max-w-2xl text-heading-lg text-on-dark-mute">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
