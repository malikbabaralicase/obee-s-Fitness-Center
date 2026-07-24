export default function ScrollIndicator() {
  return (
    <a
      href="#about"
      aria-label="Scroll to explore"
      className="group flex flex-col items-center gap-3 text-on-dark-mute transition-colors hover:text-accent"
      data-cursor="Scroll"
    >
      <span className="text-[0.65rem] font-bold uppercase tracking-[0.3em]">Scroll</span>
      <span className="relative flex h-10 w-6 justify-center rounded-full border border-on-dark-mute/50 pt-2 group-hover:border-accent">
        <span className="h-2 w-0.5 rounded-full bg-current animate-scroll-hint" />
      </span>
    </a>
  );
}
