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
import TechStackFallback from "./TechStackFallback";
import { WebGLErrorBoundary, isWebGLSupported } from "./WebGLErrorBoundary";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);
  const webglOk = isWebGLSupported();

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 1024;
    
    // On mobile: ensure native scroll works, skip Lenis entirely
    if (isMobile) {
      document.body.style.overflow = "";
      document.body.style.overflowY = "auto";
      document.documentElement.style.overflow = "";
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.height = "auto";
      document.body.style.height = "auto";
      return;
    }

    // Desktop only: smooth scroll via Lenis
    document.body.style.overflow = "hidden";
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, lerp: 0.1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    return () => {
      lenis.destroy();
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handle = () => setIsDesktop(window.innerWidth > 1024);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header", { y: -60, opacity: 0, duration: 1, delay: 0.5, ease: "power3.out" });
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
          webglOk ? (
            <WebGLErrorBoundary fallback={<TechStackFallback />}>
              <Suspense fallback={<div style={{ height: "60vh" }} />}>
                <TechStack />
              </Suspense>
            </WebGLErrorBoundary>
          ) : (
            <TechStackFallback />
          )
        )}
        <section className="section-reveal"><Achievements /></section>
        <Contact />
      </div>
    </div>
  );
};

export default MainContainer;
