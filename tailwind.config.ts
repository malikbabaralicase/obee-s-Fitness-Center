import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    // Design-system breakpoints (ultrawide → mobile-narrow)
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: "var(--accent)",
          dark: "var(--accent-dark)",
          pale: "var(--accent-pale)",
        },
        canvas: "var(--canvas)",
        soft: "var(--surface-soft)",
        dark: "var(--surface-dark)",
        elevated: "var(--surface-elevated)",
        hairline: "var(--hairline)",
        "hairline-dark": "var(--hairline-dark)",
        ink: "var(--ink)",
        body: "var(--body)",
        mute: "var(--mute)",
        "on-dark": "var(--on-dark)",
        "on-dark-mute": "var(--on-dark-mute)",
        danger: "var(--error)",
        success: "var(--success)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
      },
      fontSize: {
        // 12-tier NVIDIA hierarchy — [size, { lineHeight, letterSpacing, fontWeight }]
        "display-xl": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "700" }],
        "heading-xl": ["1.5rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-lg": ["1.375rem", { lineHeight: "1.5", fontWeight: "400" }],
        "heading-md": ["1.25rem", { lineHeight: "1.25", fontWeight: "700" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "700" }],
        "card-title": ["1.0625rem", { lineHeight: "1.47", fontWeight: "700" }],
        "body-md": ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.67" }],
        "caption-md": ["0.875rem", { lineHeight: "1.43", fontWeight: "700" }],
        "caption-sm": ["0.75rem", { lineHeight: "1.25" }],
        "utility-xs": ["0.625rem", { lineHeight: "1.5", letterSpacing: "0.08em", fontWeight: "700" }],
      },
      borderRadius: {
        none: "0px",
        xs: "1px",
        sm: "2px",
        DEFAULT: "2px",
      },
      spacing: {
        section: "4rem", // 64px section rhythm
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        // The only allowed shadow in the system: sticky-chrome ambient
        chrome: "0 0 5px 0 rgba(0,0,0,0.3)",
        "accent-glow": "0 0 40px -8px rgba(232,176,75,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards",
        "scroll-hint": "scroll-hint 1.6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
