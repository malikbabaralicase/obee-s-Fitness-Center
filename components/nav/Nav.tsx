"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, BUSINESS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[9000] transition-all duration-300",
        scrolled ? "bg-black/85 shadow-chrome backdrop-blur-md" : "bg-transparent"
      )}
    >
      <nav
        aria-label="Primary"
        className="container-content flex h-16 items-center justify-between lg:h-[72px]"
      >
        {/* Wordmark */}
        <a
          href="#hero"
          className="flex items-center gap-2.5"
          aria-label={`${BUSINESS.name} — home`}
          data-cursor="Home"
        >
          <span className="h-2.5 w-2.5 bg-accent" aria-hidden />
          <span className="text-lg font-bold uppercase tracking-[0.28em] text-on-dark">
            {BUSINESS.shortName}
          </span>
        </a>

        {/* Desktop links — right-aligned, Contact sits where the CTA used to */}
        <ul className="ml-auto hidden items-center gap-10 sm:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[0.95rem] font-bold text-on-dark-mute transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-on-dark sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-0 z-[8999] flex flex-col bg-black px-6 pt-24 sm:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <ul className="flex flex-col gap-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: EASE_OUT }}
                  className="border-b border-hairline-dark"
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 text-3xl font-bold uppercase tracking-tight text-on-dark"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
