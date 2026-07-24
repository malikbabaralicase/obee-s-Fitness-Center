import { cn } from "@/lib/cn";

type Corner = "tl" | "tr" | "bl" | "br";

const POS: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0",
};

/**
 * The design system's signature ornament: a small amber square
 * anchored to one corner of a card.
 */
export default function CornerSquare({
  corner = "tl",
  size = 12,
  className,
}: {
  corner?: Corner;
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn("absolute bg-accent", POS[corner], className)}
      style={{ width: size, height: size }}
    />
  );
}
