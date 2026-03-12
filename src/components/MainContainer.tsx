import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import Landing from "./Landing";
import About from "./About";
import WhatIDo from "./WhatIDo";
import Education from "./Education";
import Projects from "./Projects";
import Achievements from "./Achievements";
import Contact from "./Contact";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.6, smoothWheel: true, lerp: 0.08 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      gsap.ticker.remove((t) => lenis.raf(t * 1000));
    };
  }, []);

  /* ── Resize ── */
  useEffect(() => {
    const handle = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  /* ── GSAP scroll animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Navbar fade in */
      gsap.from(".header", { y: -60, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
      /* Section reveals */
      gsap.utils.toArray<Element>(".section-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50, opacity: 0, duration: 1, ease: "power3.out",
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar lenisRef={lenisRef} />
      <SocialIcons />
      <div className="smooth-wrapper">
        <Landing />
        <section className="section-reveal"><About /></section>
        <section className="section-reveal"><WhatIDo /></section>
        <section className="section-reveal"><Education /></section>
        <Projects />
        {isDesktop && (
          <Suspense fallback={<div style={{ height: "100vh" }} />}>
            <TechStack />
          </Suspense>
        )}
        <section className="section-reveal"><Achievements /></section>
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
