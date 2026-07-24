import PremiumLoader from "@/components/loader/PremiumLoader";
import Providers from "@/components/providers/Providers";
import Nav from "@/components/nav/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Membership from "@/components/sections/Membership";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <PremiumLoader />
      <Providers>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:font-bold focus:text-black"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <About />
          <Membership />
          <Contact />
        </main>
        <Footer />
      </Providers>
    </>
  );
}
