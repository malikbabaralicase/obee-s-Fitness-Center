"use client";

import { MotionConfig } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";

/**
 * Client-side app shell: reduced-motion aware Framer config, smooth
 * scroll bridge and the custom cursor. `reducedMotion="user"` makes
 * every Framer animation respect the OS preference automatically.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
      <CustomCursor />
    </MotionConfig>
  );
}
