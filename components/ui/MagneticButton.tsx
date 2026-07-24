"use client";

import Button from "./Button";
import { useMagnetic } from "@/hooks/useMagnetic";

type Props = React.ComponentProps<typeof Button> & { strength?: number };

/**
 * A Button wrapped in the magnetic-cursor effect. The wrapper span
 * eases toward the pointer for a layered, premium feel.
 */
export default function MagneticButton({ strength = 0.4, children, ...rest }: Props) {
  const ref = useMagnetic<HTMLSpanElement>(strength);

  return (
    <span ref={ref} className="inline-flex will-change-transform">
      <Button {...rest}>{children}</Button>
    </span>
  );
}
