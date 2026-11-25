"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HudPixelBlocks,
  StudioArrowNE,
  StudioSpecIcon,
  StudioBadgeEmblem,
  StudioBlueprintMargin,
} from "./components/HudAccents";

type CredentialItem = {
  index: string;
  id: string;
  title: string;
  issuer: string;
  platform: string;
  focus: string;
  emblem: "hardware" | "ai" | "data";
  badgeUrl: string;
  verifyUrl: string;
};

const CREDENTIALS: CredentialItem[] = [
  {
    index: "01",
    id: "94a71fbe-61b8-4222-af0f-805dae3ef20f",
    title: "IT Essentials",
    issuer: "CISCO SYSTEMS",
    platform: "CREDLY",
    focus: "SYSTEMS // HARDWARE",
    emblem: "hardware",
    badgeUrl:
      "https://www.credly.com/embedded_badge/94a71fbe-61b8-4222-af0f-805dae3ef20f",
    verifyUrl:
      "https://www.credly.com/badges/94a71fbe-61b8-4222-af0f-805dae3ef20f/public_url",
  },
  {
    index: "02",
    id: "37e10a6d-8405-45e3-bf3e-c4c0914e55ca",
    title: "Introduction to Modern AI",
    issuer: "COMPUTING LABS",
    platform: "CREDLY",
    focus: "AI // INTELLIGENCE",
    emblem: "ai",
    badgeUrl:
      "https://www.credly.com/embedded_badge/37e10a6d-8405-45e3-bf3e-c4c0914e55ca",
    verifyUrl:
      "https://www.credly.com/badges/37e10a6d-8405-45e3-bf3e-c4c0914e55ca/public_url",
  },
  {
    index: "03",
    id: "905ec9b4-b3cd-4470-9c1a-559772b329c9",
    title: "Introduction to Data Science",
    issuer: "DATA ACADEMY",
    platform: "CREDLY",
    focus: "DATA // ANALYTICS",
    emblem: "data",
    badgeUrl:
      "https://www.credly.com/embedded_badge/905ec9b4-b3cd-4470-9c1a-559772b329c9",
    verifyUrl:
      "https://www.credly.com/badges/905ec9b4-b3cd-4470-9c1a-559772b329c9/public_url",
  },
];

const blurDataURL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwODA4MDgiLz48L3N2Zz4=";

export default function Home() {
  // 1. All top-level hooks & state setups
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const [activeBadge, setActiveBadge] = useState<CredentialItem | null>(null);
  const fullPhrase = "Websites built to capture minds and hold attention.";

  // Close live Credly badge modal on Escape
  useEffect(() => {
    if (!activeBadge) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveBadge(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBadge]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Panicked Pepper Particle Engine Effect (Pitch Monochrome Palette)
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number; // Current X position
      y: number; // Current Y position
      baseX: number; // Anchor target X coordinate
      baseY: number; // Anchor target Y coordinate
      vx: number; // Velocity X
      vy: number; // Velocity Y
      color: string; // Particle color
      size: number; // Particle radius
    }> = [];

    const mouse = { x: -9999, y: -9999, radius: 120 }; // Expanded panic zone radius

    // Set dimensions based on the parent container width/height
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      initParticles();
    };

    // Generates a dense field of monochrome architectural points across the section bounds
    const initParticles = () => {
      particles = [];
      const starCount = canvas.width < 768 ? 200 : 450;

      for (let i = 0; i < starCount; i++) {
        const rx = Math.random() * canvas.width;
        const ry = Math.random() * canvas.height;

        // High-contrast monochrome dots: stark white and muted neutral grey
        const colorRand = Math.random();
        let color = "rgba(255, 255, 255, 0.65)";
        if (colorRand > 0.85) color = "rgba(255, 255, 255, 0.9)";
        else if (colorRand > 0.5) color = "rgba(142, 142, 142, 0.45)";

        particles.push({
          x: rx,
          y: ry,
          baseX: rx,
          baseY: ry,
          vx: 0,
          vy: 0,
          color: color,
          size: Math.random() * 1.4 + 0.5, // Crisp pixel/dot sizing
        });
      }
    };

    // Canvas Frame Loop logic computing Panicked Pepper vectors
    const renderLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Compute distances relative to user pointer position coordinates
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          // PANIC ACCELERATION: Explodes away violently based on cursor proximity
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);

          const burstVelocity = 18; // High speed scatter kick force
          const pushX = Math.cos(angle) * force * burstVelocity;
          const pushY = Math.sin(angle) * force * burstVelocity;

          p.vx -= pushX;
          p.vy -= pushY;
        } else {
          // CALMING DOWN: Slowly pull back to original coordinate coordinates
          const homeDx = p.baseX - p.x;
          const homeDy = p.baseY - p.y;

          p.vx += homeDx * 0.03; // Smooth spring back formula
          p.vy += homeDy * 0.03;
        }

        // Friction/Drag mechanics to damp the chaotic speed vector naturally
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        // Render sharp square pixel point onto canvas space
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size * 1.3, p.size * 1.3);
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    window.addEventListener("resize", resizeCanvas);
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    renderLoop();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Effect: Smooth Scroll & Header Auto-hide Visibility
  useEffect(() => {
    const handleScrollClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.getAttribute("href");
        if (id) {
          document.querySelector(id)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    };

    const handleScrollVisibility = () => {
      if (window.scrollY > 20) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };

    document.addEventListener("click", handleScrollClick);
    window.addEventListener("scroll", handleScrollVisibility);

    return () => {
      document.removeEventListener("click", handleScrollClick);
      window.removeEventListener("scroll", handleScrollVisibility);
    };
  }, []);

  // Effect: Intersection Observer (Detecting Scroll position + Resetting on leave)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartTyping(true);
        } else {
          setStartTyping(false);
          setTypedText("");
        }
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById("philosophy-container");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  // Effect: Typing Engine Frame Interval
  useEffect(() => {
    if (!startTyping) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullPhrase.slice(0, index + 1));
      index++;
      if (index >= fullPhrase.length) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [startTyping]);

  return (
    <div className="relative min-h-screen bg-studio-bg text-studio-fg selection:bg-studio-fg selection:text-studio-bg">
      {/* Header Fixed Layout (Approved Top Bar harmonized to Pitch-Black Dashed Grid) */}
      <header
        className={`fixed top-0 w-full z-50 bg-hud-bg/95 backdrop-blur-md border-b border-dashed border-studio-dashed transition-all duration-500 ease-in-out ${
          isHeaderVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex justify-between items-center px-6 lg:px-[80px] py-4 max-w-container-max mx-auto h-[70px]">
          <div className="flex items-center gap-3 text-[24px] md:text-[28px] tracking-[0.22em] text-hud-fg-bright font-bold uppercase leading-none font-header-display select-none flex-1">
            <span>JUSTER</span>
            <HudPixelBlocks className="text-hud-fg/80 hidden sm:inline-block" />
          </div>

          <div className="hidden md:flex flex-col items-center justify-center text-center space-y-1 flex-1">
            <motion.a
              whileTap={{ scale: 0.96 }}
              className="hud-header-label studio-link text-[10px] text-hud-fg-bright font-semibold"
              href="#works"
            >
              PORTFOLIO
            </motion.a>
            <motion.a
              whileTap={{ scale: 0.96 }}
              className="hud-header-label text-[10px] text-hud-muted font-medium hover:text-hud-fg-bright transition-colors"
              href="#stacks"
            >
              STACKS
            </motion.a>
          </div>

          <div className="hidden md:flex flex-col items-end text-right text-[10px] uppercase tracking-[0.26em] font-header-mono flex-1 space-y-1">
            <span className="text-hud-muted tracking-[0.3em] font-medium">
              STUDIO
            </span>
            <motion.a
              whileTap={{ scale: 0.96 }}
              className="studio-link text-hud-fg-bright font-semibold"
              href="#footer"
            >
              CONTACT
            </motion.a>
          </div>
        </nav>
      </header>

      {/* Hero Intro Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-studio-bg border-b border-dashed border-studio-dashed">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-[0.14] scale-105 grayscale contrast-125 brightness-75"
          src="/videoholder.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-studio-bg/80 to-studio-bg/60 z-10" />
        <StudioBlueprintMargin className="z-10 text-studio-fg" />

        <div className="relative z-20 text-center px-6 md:px-0">
          <p className="inline-flex items-center gap-2.5 text-[11px] md:text-[12px] uppercase tracking-[0.26em] mb-8 text-studio-secondary font-mono">
            <StudioSpecIcon variant="terminal" className="w-3.5 h-3.5 text-studio-fg" />
            <span>Frontend Developer</span>
          </p>
          <h1 className="font-pixel uppercase text-xl sm:text-2xl md:text-3xl lg:text-[38px] text-studio-fg max-w-5xl mx-auto mb-12 font-normal leading-[1.45] tracking-[0.02em]">
            A frontend developer who builds fast, responsive websites and turns
            complex user interfaces into{" "}
            <span className="underline decoration-1 underline-offset-[8px] decoration-studio-border text-studio-fg">
              clean, friendly experiences.
            </span>
          </h1>
          <div className="flex flex-col items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="studio-btn-primary group px-8 py-4 text-[12px]"
              href="#works"
            >
              <span>See My Work</span>
              <StudioArrowNE className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </motion.a>
            <p className="text-[10px] tracking-[0.26em] text-studio-muted uppercase font-mono">
              Explore projects below
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Statement Section (With Panicked Pepper Starfield Matrix Background) */}
      <section
        ref={sectionRef}
        className="relative py-[140px] md:py-[200px] px-6 lg:px-[80px] w-full overflow-hidden bg-studio-bg border-b border-dashed border-studio-dashed cursor-default select-none"
      >
        {/* Antigravity Starfield Canvas Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-45 mix-blend-screen"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-studio-bg via-transparent to-studio-bg z-10 pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto">
          <div
            id="philosophy-container"
            className="relative min-h-[6rem] flex items-center justify-center mb-12"
          >
            <div className="relative inline-block text-left max-w-2xl mx-auto">
              {/* Grey Underlay Phrase */}
              <h2 className="text-3xl md:text-5xl font-semibold uppercase leading-snug tracking-[0.04em] text-white/10 select-none font-sans">
                {fullPhrase}
              </h2>

              {/* Dynamic Super White Typing Overlay */}
              <h2 className="absolute inset-0 text-3xl md:text-5xl font-semibold uppercase leading-snug tracking-[0.04em] text-studio-fg font-sans text-left bg-transparent pointer-events-none whitespace-pre-wrap">
                {typedText}
                <span
                  className={`inline-block w-[3px] h-[30px] md:h-[44px] bg-studio-fg ml-1 align-middle ${
                    typedText.length === fullPhrase.length ? "animate-pulse" : ""
                  }`}
                ></span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 text-left mt-28 border-y border-dashed border-studio-dashed divide-y md:divide-y-0 md:divide-x divide-dashed divide-studio-dashed bg-studio-bg/75 backdrop-blur-[2px]">
            <div className="space-y-4 p-7 md:p-8 rounded-none">
              <span className="text-[11px] text-studio-muted font-mono tracking-[0.18em] uppercase block">
                <span>{"// "}</span>
                <span className="font-pixel text-xl md:text-2xl text-studio-fg align-baseline mx-0.5">
                  01
                </span>
                <span>{" / IDENTITY"}</span>
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-studio-fg">
                  Precision
                </h3>
                <span className="studio-accent-bar mt-2.5" aria-hidden="true" />
              </div>
              <p className="text-studio-secondary text-sm leading-relaxed">
                Meticulous attention to every pixel and transition, ensuring a
                seamless digital performance.
              </p>
            </div>
            <div className="space-y-4 p-7 md:p-8 rounded-none">
              <span className="text-[11px] text-studio-muted font-mono tracking-[0.18em] uppercase block">
                <span>{"// "}</span>
                <span className="font-pixel text-xl md:text-2xl text-studio-fg align-baseline mx-0.5">
                  02
                </span>
                <span>{" / EXPERIENCE"}</span>
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-studio-fg">
                  Intuition
                </h3>
                <span className="studio-accent-bar mt-2.5" aria-hidden="true" />
              </div>
              <p className="text-studio-secondary text-sm leading-relaxed">
                Creating interfaces that users understand instinctively,
                reducing friction and increasing joy.
              </p>
            </div>
            <div className="space-y-4 p-7 md:p-8 rounded-none">
              <span className="text-[11px] text-studio-muted font-mono tracking-[0.18em] uppercase block">
                <span>{"// "}</span>
                <span className="font-pixel text-xl md:text-2xl text-studio-fg align-baseline mx-0.5">
                  03
                </span>
                <span>{" / SYSTEM"}</span>
              </span>
              <div>
                <h3 className="text-base font-semibold uppercase tracking-[0.14em] text-studio-fg">
                  Inclusivity
                </h3>
                <span className="studio-accent-bar mt-2.5" aria-hidden="true" />
              </div>
              <p className="text-studio-secondary text-sm leading-relaxed">
                Design that speaks to everyone, regardless of ability or device,
                ensuring no user is left behind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Portfolio Bento Grid Showcase */}
      <section
        className="py-[120px] md:py-[160px] overflow-hidden bg-studio-bg border-b border-dashed border-studio-dashed"
        id="works"
      >
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto flex justify-between items-end mb-16 pb-8 border-b border-dashed border-studio-dashed">
          <div>
            <span className="text-[11px] text-studio-muted uppercase tracking-[0.24em] font-mono block">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-[0.12em] text-studio-fg mt-3">
              Selected Works
            </h2>
            <span className="studio-accent-bar mt-4" aria-hidden="true" />
          </div>
          <div className="hidden md:block">
            <span className="font-pixel text-base md:text-lg text-studio-fg tracking-[0.06em]">
              2024–NOW
            </span>
          </div>
        </div>

        <div className="px-6 lg:px-[80px] max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Traffic Management System - Live Project (col-span-2, row-span-2) */}
            <motion.a
              href="https://traffic-management-system-cyan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              className="studio-card p-8 flex flex-col justify-between group md:col-span-2 md:row-span-2 min-h-[480px]"
            >
              <div className="flex justify-between items-center w-full gap-4">
                <span className="text-[11px] font-mono text-studio-muted tracking-[0.18em] uppercase">
                  <span>{"// FEATURED WORK - "}</span>
                  <span className="font-pixel text-sm text-studio-fg">01</span>
                </span>
                <span className="studio-btn-secondary px-3 py-1.5 text-[10px]">
                  VIEW LIVE PROJECT ↗
                </span>
              </div>

              <div className="relative w-full aspect-video rounded-none overflow-hidden border border-studio-subtle my-6 bg-studio-bg">
                <Image
                  src="/images/tms.png"
                  alt="Traffic Management System"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="studio-media object-cover group-hover:scale-[1.03]"
                />
              </div>

              <div className="text-left w-full">
                <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.08em] text-studio-fg">
                  Traffic Management System
                </h3>
                <span className="studio-accent-bar mt-3" aria-hidden="true" />
                <p className="text-studio-secondary text-sm mt-4 leading-relaxed max-w-xl">
                  A high-performance real-time traffic analysis and control
                  system designed to streamline transit logistics and smart-city
                  dispatch routing pipelines.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 items-center mt-6 pt-4 border-t border-dashed border-studio-dashed text-[11px] font-mono uppercase tracking-[0.14em]">
                  <span className="inline-flex items-center gap-2">
                    <StudioSpecIcon variant="layers" className="w-3 h-3 text-studio-muted" />
                    <span className="text-studio-muted">FRONTEND</span>
                    <span className="text-studio-muted">{"//"}</span>
                    <span className="text-studio-fg">ARCHITECTURE</span>
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <StudioSpecIcon variant="code" className="w-3 h-3 text-studio-muted" />
                    <span className="text-studio-muted">REACT</span>
                    <span className="text-studio-muted">{"//"}</span>
                    <span className="text-studio-fg">TAILWIND</span>
                  </span>
                </div>
              </div>
            </motion.a>

            {/* Card 2: Breeders Enterprise - Live Project (col-span-1) */}
            <motion.a
              href="https://www.breedersenterprise.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              className="studio-card p-6 flex flex-col justify-between group md:col-span-1 md:row-span-1 min-h-[240px]"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-[11px] font-mono text-studio-muted tracking-[0.18em] uppercase">
                  <span>{"// WORK - "}</span>
                  <span className="font-pixel text-sm text-studio-fg">02</span>
                </span>
                <span className="studio-btn-secondary px-2.5 py-1 text-[10px]">
                  LIVE ↗
                </span>
              </div>

              <div className="relative w-full aspect-video rounded-none overflow-hidden border border-studio-subtle my-4 bg-studio-bg">
                <Image
                  src="/images/bea.png"
                  alt="Breeders Enterprise"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="studio-media object-cover group-hover:scale-[1.03]"
                />
              </div>

              <div className="text-left w-full">
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-studio-fg">
                  Breeders Enterprise
                </h3>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-studio-dashed text-[10px] font-mono uppercase tracking-[0.14em]">
                  <span className="inline-flex items-center gap-1.5">
                    <StudioSpecIcon variant="grid" className="w-3 h-3 text-studio-muted" />
                    <span className="text-studio-muted">FRONTEND</span>
                    <span className="text-studio-muted">{"//"}</span>
                    <span className="text-studio-fg">UI EXECUTION</span>
                  </span>
                </div>
              </div>
            </motion.a>

            {/* Card 3: Project Space Three - Coming Soon (col-span-1) */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              className="studio-card p-6 flex flex-col justify-between group md:col-span-1 md:row-span-1 min-h-[220px]"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-[11px] font-mono text-studio-muted tracking-[0.18em] uppercase">
                  <span>{"// SPACE "}</span>
                  <span className="font-pixel text-sm text-studio-fg">03</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-studio-bg text-studio-fg border border-studio-border rounded-none font-mono tracking-[0.16em] uppercase">
                  IN DEV
                </span>
              </div>
              <div className="my-4 text-left">
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-studio-fg">
                  Project Space Three
                </h3>
                <p className="text-studio-secondary text-xs mt-2.5 leading-relaxed">
                  Advanced micro-interactions, complex physics engines, and
                  custom canvas-based visuals.
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-dashed border-studio-dashed text-[10px] font-mono uppercase tracking-[0.14em] w-full">
                <span className="inline-flex items-center gap-1.5">
                  <StudioSpecIcon variant="box" className="w-3 h-3 text-studio-muted" />
                  <span className="text-studio-muted">EXPERIMENTAL</span>
                  <span className="text-studio-muted">{"//"}</span>
                  <span className="text-studio-fg">UI</span>
                </span>
                <span className="text-studio-muted">COMING SOON</span>
              </div>
            </motion.div>

            {/* Card 4: Project Space Four - Coming Soon (col-span-1) */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              className="studio-card p-6 flex flex-col justify-between group md:col-span-1 min-h-[220px]"
            >
              <div className="flex justify-between items-center gap-2">
                <span className="text-[11px] font-mono text-studio-muted tracking-[0.18em] uppercase">
                  <span>{"// SPACE "}</span>
                  <span className="font-pixel text-sm text-studio-fg">04</span>
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-studio-bg text-studio-fg border border-studio-border rounded-none font-mono tracking-[0.16em] uppercase">
                  IN DEV
                </span>
              </div>
              <div className="my-4 text-left">
                <h3 className="text-base font-semibold uppercase tracking-[0.08em] text-studio-fg">
                  Project Space Four
                </h3>
                <p className="text-studio-secondary text-xs mt-2.5 leading-relaxed">
                  Optimized Next.js systems implementing dynamic client-side
                  animations.
                </p>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-dashed border-studio-dashed text-[10px] font-mono uppercase tracking-[0.14em] w-full">
                <span className="inline-flex items-center gap-1.5">
                  <StudioSpecIcon variant="layers" className="w-3 h-3 text-studio-muted" />
                  <span className="text-studio-muted">UI SYSTEM</span>
                  <span className="text-studio-muted">{"//"}</span>
                  <span className="text-studio-fg">MOTION</span>
                </span>
                <span className="text-studio-muted">COMING SOON</span>
              </div>
            </motion.div>

            {/* Card 5: Project Space Five - Coming Soon (col-span-2) */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              whileTap={{ scale: 0.99 }}
              className="studio-card p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group md:col-span-2 min-h-[220px]"
            >
              <div className="space-y-2.5 text-left w-full md:w-3/4">
                <span className="text-[11px] font-mono text-studio-muted tracking-[0.18em] uppercase block">
                  <span>{"// SPACE "}</span>
                  <span className="font-pixel text-sm text-studio-fg">05</span>
                </span>
                <h3 className="text-xl md:text-2xl font-semibold uppercase tracking-[0.08em] text-studio-fg">
                  Project Space Five
                </h3>
                <p className="text-studio-secondary text-sm leading-relaxed">
                  WebGL-based rendering pipelines and shaders sandbox,
                  investigating procedural generative layouts and custom fluid
                  physics.
                </p>
              </div>
              <div className="flex flex-row md:flex-col justify-between items-end gap-2.5 w-full md:w-1/4 shrink-0 border-t md:border-t-0 md:border-l border-dashed border-studio-dashed pt-4 md:pt-0 md:pl-6">
                <span className="text-[10px] px-2.5 py-1 bg-studio-bg text-studio-fg border border-studio-border rounded-none font-mono tracking-[0.16em] uppercase">
                  IN DEVELOPMENT
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] text-studio-muted font-mono uppercase tracking-[0.14em]">
                  <StudioSpecIcon variant="box" className="w-3 h-3 text-studio-muted" />
                  <span>CREATIVE SANDBOX</span>
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verify Badges & Certificates Division */}
      <section
        className="py-[100px] md:py-[140px] bg-studio-bg-alt border-b border-dashed border-studio-dashed overflow-hidden"
        id="certificates"
      >
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-dashed border-studio-dashed">
            <div>
              <span className="text-[11px] text-studio-muted uppercase tracking-[0.24em] font-mono block">
                Verification
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-[0.12em] mt-3 text-studio-fg">
                Certificates & Badges
              </h2>
              <span className="studio-accent-bar mt-4" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-baseline gap-2.5 border-r border-dashed border-studio-dashed pr-6">
                <span className="font-pixel text-xl md:text-2xl text-studio-fg">
                  03
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-studio-muted">
                  INDEXED
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-studio-secondary font-mono uppercase tracking-[0.2em]">
                <StudioSpecIcon variant="shield" className="w-3.5 h-3.5 text-studio-fg" />
                <span>CREDLY VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-[80px] max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-dashed border-studio-dashed divide-y md:divide-y-0 md:divide-x divide-dashed divide-studio-dashed bg-studio-surface">
            {CREDENTIALS.map((item) => (
              <motion.article
                key={item.id}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group relative flex flex-col justify-between bg-studio-surface hover:bg-studio-surface-hover transition-colors duration-300 rounded-none"
              >
                {/* Card Top Index Row */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-dashed border-studio-dashed">
                  <span className="text-[11px] font-mono text-studio-muted uppercase tracking-[0.18em]">
                    <span>{"// "}</span>
                    <span className="font-pixel text-base text-studio-fg mx-0.5">
                      {item.index}
                    </span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-studio-fg">
                    <span
                      aria-hidden="true"
                      className="inline-block w-1.5 h-1.5 bg-studio-fg"
                    />
                    <span>VERIFIED</span>
                  </span>
                </div>

                {/* Precision Monochrome Blueprint Emblem Stage */}
                <div className="relative h-[200px] flex items-center justify-center bg-studio-bg border-b border-dashed border-studio-dashed overflow-hidden px-6">
                  {/* Subtle dashed crosshair axes */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-dashed border-white/[0.06]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-1/2 border-l border-dashed border-white/[0.06]"
                  />

                  <StudioBadgeEmblem
                    variant={item.emblem}
                    className="relative z-10 w-32 h-32 text-studio-fg opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />

                  {/* Subtle corner focus label */}
                  <span className="pointer-events-none absolute bottom-3 left-4 text-[9px] font-mono uppercase tracking-[0.22em] text-studio-muted">
                    {item.focus}
                  </span>
                </div>

                {/* Credential Details & Key-Value Specs */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold uppercase tracking-[0.08em] text-studio-fg leading-snug">
                      {item.title}
                    </h3>
                    <span className="studio-accent-bar mt-3" aria-hidden="true" />

                    <dl className="mt-6 border-y border-dashed border-studio-dashed divide-y divide-dashed divide-studio-dashed text-[11px] font-mono uppercase tracking-[0.14em]">
                      <div className="flex items-center justify-between py-2.5 gap-3">
                        <dt className="inline-flex items-center gap-1.5 text-studio-muted">
                          <StudioSpecIcon variant="layers" className="w-3 h-3" />
                          <span>ISSUER</span>
                        </dt>
                        <dd className="text-studio-fg text-right truncate">
                          {item.issuer}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-2.5 gap-3">
                        <dt className="inline-flex items-center gap-1.5 text-studio-muted">
                          <StudioSpecIcon variant="shield" className="w-3 h-3" />
                          <span>REGISTRY</span>
                        </dt>
                        <dd className="text-studio-fg text-right">
                          {item.platform}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between py-2.5 gap-3">
                        <dt className="inline-flex items-center gap-1.5 text-studio-muted">
                          <StudioSpecIcon variant="code" className="w-3 h-3" />
                          <span>BADGE ID</span>
                        </dt>
                        <dd className="text-studio-secondary text-right">
                          {item.id.slice(0, 8).toUpperCase()}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center gap-2 mt-6">
                    <a
                      href={item.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="studio-btn-secondary flex-1 px-3.5 py-2.5 text-[10px]"
                    >
                      <span>VERIFY CREDENTIAL</span>
                      <span>↗</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveBadge(item)}
                      className="px-3 py-2.5 border border-dashed border-studio-border bg-studio-bg text-studio-secondary hover:border-studio-fg hover:text-studio-fg text-[10px] font-mono uppercase tracking-[0.16em] rounded-none transition-colors duration-200 cursor-pointer"
                      aria-label={`Preview official Credly badge for ${item.title}`}
                    >
                      EMBED
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stacks Auto Scroll Carousel */}
      <section
        className="py-[100px] md:py-[140px] bg-studio-bg border-b border-dashed border-studio-dashed overflow-hidden"
        id="stacks"
      >
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto mb-12">
          <span className="text-[11px] text-studio-muted uppercase tracking-[0.24em] font-mono block mb-3">
            Capabilities
          </span>
          <h2 className="text-3xl font-semibold uppercase text-studio-fg tracking-[0.12em]">
            Core Stack & Ecosystem
          </h2>
          <span className="studio-accent-bar mt-4" aria-hidden="true" />
        </div>

        <div className="relative w-full flex items-center py-6 border-y border-dashed border-studio-dashed">
          <div className="flex gap-12 items-center whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused] transition-all duration-300">
            {[
              {
                name: "Figma",
                category: "PROTOTYPING",
                icon: "https://cdn.simpleicons.org/figma/ffffff",
              },
              {
                name: "Google Stitch",
                category: "PROTOTYPING",
                icon: "https://cdn.simpleicons.org/google/ffffff",
              },
              {
                name: "ReactJS",
                category: "FRONTEND",
                icon: "https://cdn.simpleicons.org/react/ffffff",
              },
              {
                name: "Next.js",
                category: "FRONTEND",
                icon: "https://cdn.simpleicons.org/nextdotjs/ffffff",
              },
              {
                name: "Tailwind CSS",
                category: "FRONTEND",
                icon: "https://cdn.simpleicons.org/tailwindcss/ffffff",
              },
              {
                name: "Bootstrap",
                category: "FRONTEND",
                icon: "https://cdn.simpleicons.org/bootstrap/ffffff",
              },
              {
                name: "Vite",
                category: "FRONTEND",
                icon: "https://cdn.simpleicons.org/vite/ffffff",
              },
              {
                name: "Python",
                category: "BACKEND // DEV",
                icon: "https://cdn.simpleicons.org/python/ffffff",
              },
            ].map((stack, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 px-5 py-3 border border-dashed border-studio-dashed bg-studio-surface rounded-none select-none opacity-75 hover:opacity-100 hover:border-studio-fg transition-all duration-300"
              >
                <img
                  src={stack.icon}
                  alt={`${stack.name} icon`}
                  className="w-5 h-5 md:w-6 md:h-6 object-contain"
                  loading="lazy"
                />
                <span className="text-lg md:text-2xl font-semibold uppercase text-studio-fg font-sans tracking-[0.08em]">
                  {stack.name}
                </span>
                <span className="text-[10px] px-2.5 py-0.5 bg-studio-bg text-studio-muted border border-studio-subtle rounded-none font-mono tracking-[0.16em] uppercase">
                  {stack.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Wrapper */}
      <footer
        className="relative overflow-hidden bg-studio-bg-alt w-full pt-[120px] md:pt-[160px] pb-12"
        id="footer"
      >
        <StudioBlueprintMargin className="text-studio-fg" />

        <div className="relative z-10 px-6 lg:px-[80px] max-w-container-max mx-auto flex flex-col items-center text-center">
          <div className="mb-8">
            <p className="text-[11px] md:text-[12px] uppercase tracking-[0.26em] text-studio-secondary font-mono">
              Have a vision that needs clarity?
            </p>
          </div>
          <div className="mb-32">
            <motion.a
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="studio-btn-secondary group px-8 sm:px-12 py-5 sm:py-6 text-2xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-[0.1em]"
              href="mailto:uretajuster@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>START A PROJECT</span>
              <span className="inline-block transform group-hover:translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-300">
                ↗
              </span>
            </motion.a>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-dashed border-studio-dashed pt-12 text-xs">
            <div className="flex gap-8 order-2 sm:order-1">
              <motion.a
                whileTap={{ scale: 0.96 }}
                className="studio-link uppercase tracking-[0.18em] font-mono text-studio-secondary"
                href="https://www.instagram.com/peachmango.jus/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.96 }}
                className="studio-link uppercase tracking-[0.18em] font-mono text-studio-secondary"
                href="https://github.com/Strixyl"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.96 }}
                className="studio-link uppercase tracking-[0.18em] font-mono text-studio-secondary"
                href="https://www.linkedin.com/in/juster-ureta/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </motion.a>
            </div>
            <div className="order-1 sm:order-2">
              <motion.a
                whileTap={{ scale: 0.96 }}
                className="studio-link text-[11px] text-studio-muted tracking-[0.2em] font-mono"
                href="tel:+639292153424"
              >
                PH // +63 929 215 3424
              </motion.a>
            </div>
          </div>
        </div>
      </footer>

      {/* On-Demand Official Credly Badge Embed Modal */}
      {activeBadge && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="credly-modal-title"
          onClick={() => setActiveBadge(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-studio-bg border border-studio-border rounded-none"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-dashed border-studio-dashed">
              <div className="flex items-center gap-2.5 text-[11px] font-mono uppercase tracking-[0.18em]">
                <span className="font-pixel text-sm text-studio-fg">
                  {activeBadge.index}
                </span>
                <span className="text-studio-muted">{"// CREDLY EMBED"}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveBadge(null)}
                className="px-2.5 py-1 border border-studio-border text-[10px] font-mono uppercase tracking-[0.18em] text-studio-fg hover:bg-studio-fg hover:text-studio-bg rounded-none transition-colors cursor-pointer"
              >
                CLOSE [ESC]
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col items-center text-center">
              <h3
                id="credly-modal-title"
                className="text-lg font-semibold uppercase tracking-[0.1em] text-studio-fg"
              >
                {activeBadge.title}
              </h3>
              <span className="studio-accent-bar mt-3 mb-6" aria-hidden="true" />

              {/* Clean official specimen frame (no mix-blend-screen washout) */}
              <div className="p-4 bg-white border border-studio-border rounded-none">
                <iframe
                  src={activeBadge.badgeUrl}
                  width="150"
                  height="270"
                  title={`${activeBadge.title} Official Credly Badge`}
                  className="block border-0"
                />
              </div>

              <p className="mt-5 text-[10px] font-mono uppercase tracking-[0.18em] text-studio-muted">
                {activeBadge.issuer} {"//"} ID {activeBadge.id.slice(0, 8).toUpperCase()}
              </p>

              <a
                href={activeBadge.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="studio-btn-primary w-full mt-6 px-5 py-3 text-[11px]"
              >
                <span>OPEN OFFICIAL CREDLY PAGE</span>
                <StudioArrowNE className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
