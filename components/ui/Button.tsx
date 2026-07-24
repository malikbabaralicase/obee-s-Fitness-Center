import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-dark" | "ghost";
type Size = "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-sm font-bold uppercase tracking-wide " +
  "transition-colors duration-200 select-none disabled:cursor-not-allowed disabled:bg-soft disabled:text-mute";

const VARIANTS: Record<Variant, string> = {
  // Amber fill — reserved for dark surfaces (the whole site is dark).
  primary: "bg-accent text-black hover:bg-accent-dark active:bg-accent-dark",
  // Transparent pane bordered in amber.
  outline: "border-2 border-accent text-on-dark hover:bg-accent hover:text-black",
  // White outline on black — secondary in dark chapters.
  "outline-dark": "border border-on-dark/60 text-on-dark hover:border-on-dark hover:bg-white/5",
  // Inline arrow link.
  ghost: "text-accent hover:text-accent-pale px-0",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-6 text-[0.9rem]",
  lg: "h-[52px] px-8 text-[1rem]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  cursorLabel?: string;
  children: React.ReactNode;
}

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button"; href?: never };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { as: "link"; href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button({ variant = "primary", size = "md", className, cursorLabel, children, ...rest }, ref) {
    const classes = cn(BASE, VARIANTS[variant], variant !== "ghost" && SIZES[size], className);

    if (rest.as === "link") {
      const { as: _as, href, ...anchorProps } = rest as ButtonAsLink;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          data-cursor={cursorLabel}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    const { as: _as, ...buttonProps } = rest as ButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        data-cursor={cursorLabel}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

export default Button;
