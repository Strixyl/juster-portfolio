"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMxMjEzMTYiLz48L3N2Zz4=";

export default function Home() {
  // 1. All top-level hooks & state setups
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [typedText, setTypedText] = useState("");
  const [startTyping, setStartTyping] = useState(false);
  const fullPhrase = "Websites built to capture minds and hold attention.";
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Panicked Pepper Particle Engine Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;       // Current X position
      y: number;       // Current Y position
      baseX: number;   // Anchor target X coordinate
      baseY: number;   // Anchor target Y coordinate
      vx: number;      // Velocity X
      vy: number;      // Velocity Y
      color: string;   // Particle color
      size: number;    // Particle radius
    }> = [];

    const mouse = { x: -9999, y: -9999, radius: 120 }; // Expanded panic zone radius

    // Set dimensions based on the parent container width/height
    const resizeCanvas = () => {
      canvas.width = section.offsetWidth;
      canvas.height = section.offsetHeight;
      initParticles();
    };

    // Generates a dense field of scattered stars across the section bounds
    const initParticles = () => {
      particles = [];
      const starCount = canvas.width < 768 ? 200 : 450;

      for (let i = 0; i < starCount; i++) {
        const rx = Math.random() * canvas.width;
        const ry = Math.random() * canvas.height;
        
        // Color mapping: mostly crisp white stars, with a few faint blues and tiny hot red pepper flakes
        const colorRand = Math.random();
        let color = "rgba(255, 255, 255, 0.85)"; 
        if (colorRand > 0.85) color = "rgba(59, 130, 246, 0.75)"; 
        else if (colorRand > 0.96) color = "rgba(239, 68, 68, 0.85)"; 

        particles.push({
          x: rx,
          y: ry,
          baseX: rx,
          baseY: ry,
          vx: 0,
          vy: 0,
          color: color,
          size: Math.random() * 1.5 + 0.5 // Varied star sizing
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

        // Render point node onto canvas space
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
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
    <div className="relative min-h-screen bg-[#121316] text-white selection:bg-primary selection:text-surface">

      {/* Header Fixed Layout */}
      <header className={`fixed top-0 w-full z-50 bg-[#121316]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ease-in-out ${
        isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <nav className="flex justify-between items-center px-6 lg:px-[80px] py-4 max-w-container-max mx-auto h-[70px]">
          <div className="text-[26px] md:text-[32px] tracking-tighter text-white font-black uppercase leading-none scale-y-110 origin-left font-sans select-none flex-1">
            JUSTER
          </div>

          <div className="flex flex-col items-center justify-center text-center space-y-0.5 flex-1 hidden md:flex">
            <motion.a 
              whileTap={{ scale: 0.96 }}
              className="text-[10px] uppercase tracking-[0.25em] text-white font-bold hover:text-primary transition-colors" 
              href="#works"
            >
              PORTFOLIO
            </motion.a>
            <motion.a 
              whileTap={{ scale: 0.96 }}
              className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold hover:text-white transition-colors" 
              href="#stacks"
            >
              STACKS
            </motion.a>
          </div>

          <div className="flex flex-col items-end text-right text-[10px] uppercase tracking-[0.25em] font-bold flex-1 hidden md:flex">
            <span className="text-white/30 tracking-[0.3em] font-medium">STUDIO</span>
            <motion.a 
              whileTap={{ scale: 0.96 }}
              className="text-white hover:text-primary transition-colors" 
              href="#footer"
            >
              CONTACT
            </motion.a>
          </div>
        </nav>
      </header>

      {/* Hero Intro Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#121316]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25 scale-105"
          src="/videoholder.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/70 to-[#121316]/40 z-10" />

        <div className="relative z-20 text-center px-6 md:px-0">
          <p className="text-[14px] uppercase tracking-[0.3em] mb-8 opacity-80 text-primary font-mono">Frontend Developer</p>
          <h1 className="text-3xl md:text-5xl text-white max-w-5xl mx-auto mb-12 font-medium leading-relaxed tracking-tight opacity-95">
            A frontend developer who builds fast, responsive websites and turns complex user interfaces into{" "}
            <span className="italic text-primary font-medium">clean, friendly experiences.</span>
          </h1>
          <div className="flex flex-col items-center gap-6">
            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-4 border border-white/30 backdrop-blur-md overflow-hidden block transition-colors duration-500 hover:border-white" 
              href="#works"
            >
              <span className="relative z-10 text-[14px] uppercase text-white group-hover:text-[#121316] transition-colors duration-500 font-bold tracking-wider">See My Work</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </motion.a>
            <p className="text-[10px] tracking-widest opacity-50 uppercase font-mono">Explore projects below</p>
          </div>
        </div>
      </section>

      {/* Philosophy Statement Section (With Panicked Pepper Starfield Matrix Background) */}
      <section 
        ref={sectionRef}
        className="relative py-[140px] md:py-[200px] px-6 lg:px-[80px] w-full overflow-hidden bg-[#121316] border-b border-white/5 cursor-default select-none"
      >
        
        {/* Antigravity Starfield Canvas Layer */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-50 mix-blend-screen" 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-transparent to-[#121316] z-10 pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto">
          <div id="philosophy-container" className="relative min-h-[6rem] flex items-center justify-center mb-12">
            <div className="relative inline-block text-left max-w-2xl mx-auto">
              
              {/* Grey Underlay Phrase */}
              <h2 className="text-3xl md:text-5xl font-bold italic leading-snug tracking-tight text-white/10 select-none font-sans">
                {fullPhrase}
              </h2>
              
              {/* Dynamic Super White Typing Overlay */}
              <h2 className="absolute inset-0 text-3xl md:text-5xl font-bold italic leading-snug tracking-tight text-white font-sans text-left bg-transparent pointer-events-none whitespace-pre-wrap">
                {typedText}
                <span className={`inline-block w-[3px] h-[30px] md:h-[45px] bg-primary ml-1 align-middle not-italic ${
                  typedText.length === fullPhrase.length ? "animate-pulse" : ""
                }`}></span>
              </h2>
              
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-32">
            <div className="space-y-3 backdrop-blur-[4px] bg-[#121316]/60 p-5 rounded-lg border border-white/5 md:bg-[#121316]/40">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 01 / IDENTITY</span>
              <h3 className="text-xl font-bold tracking-tight">Precision</h3>
              <p className="text-white/60 text-sm leading-relaxed">Meticulous attention to every pixel and transition, ensuring a seamless digital performance.</p>
            </div>
            <div className="space-y-3 backdrop-blur-[4px] bg-[#121316]/60 p-5 rounded-lg border border-white/5 md:bg-[#121316]/40">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 02 / EXPERIENCE</span>
              <h3 className="text-xl font-bold tracking-tight">Intuition</h3>
              <p className="text-white/60 text-sm leading-relaxed">Creating interfaces that users understand instinctively, reducing friction and increasing joy.</p>
            </div>
            <div className="space-y-3 backdrop-blur-[4px] bg-[#121316]/60 p-5 rounded-lg border border-white/5 md:bg-[#121316]/40">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 03 / SYSTEM</span>
              <h3 className="text-xl font-bold tracking-tight">Inclusivity</h3>
              <p className="text-white/60 text-sm leading-relaxed">Design that speaks to everyone, regardless of ability or device, ensuring no user is left behind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Portfolio Bento Grid Showcase */}
      <section className="py-[120px] md:py-[160px] overflow-hidden" id="works">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto flex justify-between items-end mb-16">
          <div>
            <span className="text-[14px] text-primary uppercase tracking-wider">Portfolio</span>
            <h2 className="text-4xl font-bold mt-4">Selected Works</h2>
          </div>
          <div className="hidden md:block">
            <span className="text-[14px] text-white/40 font-mono">2024–NOW</span>
          </div>
        </div>

        <div className="px-6 lg:px-[80px] max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Traffic Management System - Live Project (col-span-2, row-span-2) */}
            <motion.a
              href="https://traffic-management-system-cyan.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#121316] border border-white/5 p-8 rounded-lg flex flex-col justify-between group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100 md:col-span-2 md:row-span-2 min-h-[480px]"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">// FEATURED WORK - 01</span>
                <span className="text-[11px] font-mono opacity-50 tracking-wider">VIEW LIVE PROJECT ↗</span>
              </div>
              
              <div className="relative w-full aspect-video rounded overflow-hidden border border-white/10 my-6 bg-white/5">
                <Image
                  src="/images/tms.png"
                  alt="Traffic Management System"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="text-left w-full">
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">Traffic Management System</h3>
                <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xl">
                  A high-performance real-time traffic analysis and control system designed to streamline transit logistics and smart-city dispatch routing pipelines.
                </p>
                <div className="flex gap-4 items-center mt-6 text-[10px] opacity-40 font-mono tracking-wider">
                  <span>FRONTEND // ARCHITECTURE</span>
                  <span>REACT // TAILWIND</span>
                </div>
              </div>
            </motion.a>

            {/* Card 2: Breeders Enterprise - Live Project (col-span-1) */}
            <motion.a
              href="https://www.breedersenterprise.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#121316] border border-white/5 p-6 rounded-lg flex flex-col justify-between group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100 md:col-span-1 md:row-span-1 min-h-[240px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">// WORK - 02</span>
                <span className="text-[11px] font-mono opacity-50 tracking-wider">LIVE ↗</span>
              </div>
              
              <div className="relative w-full aspect-video rounded overflow-hidden border border-white/10 my-4 bg-white/5">
                <Image
                  src="/images/bea.png"
                  alt="Breeders Enterprise"
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
              </div>

              <div className="text-left w-full">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">Breeders Enterprise</h3>
                <div className="flex justify-between items-baseline mt-2">
                  <span className="text-[10px] opacity-60 font-mono tracking-wider">FRONTEND // UI EXECUTION</span>
                </div>
              </div>
            </motion.a>

            {/* Card 3: Project Space Three - Coming Soon (col-span-1) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#121316] border border-white/5 p-6 rounded-lg flex flex-col justify-between group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100 md:col-span-1 md:row-span-1 min-h-[220px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">// SPACE 03</span>
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded font-mono tracking-widest uppercase scale-90">IN DEV</span>
              </div>
              <div className="my-4 text-left">
                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">Project Space Three</h3>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">
                  Advanced micro-interactions, complex physics engines, and custom canvas-based visuals.
                </p>
              </div>
              <div className="flex justify-between items-center text-[10px] opacity-40 font-mono tracking-wider w-full">
                <span>EXPERIMENTAL // UI</span>
                <span>COMING SOON</span>
              </div>
            </motion.div>

            {/* Card 4: Project Space Four - Coming Soon (col-span-1) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#121316] border border-white/5 p-6 rounded-lg flex flex-col justify-between group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100 md:col-span-1 min-h-[220px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase">// SPACE 04</span>
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded font-mono tracking-widest uppercase scale-90">IN DEV</span>
              </div>
              <div className="my-4 text-left">
                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-primary transition-colors">Project Space Four</h3>
                <p className="text-white/60 text-xs mt-2 leading-relaxed">
                  Optimized Next.js systems implementing dynamic client-side animations.
                </p>
              </div>
              <div className="flex justify-between items-center text-[10px] opacity-40 font-mono tracking-wider w-full">
                <span>UI SYSTEM // MOTION</span>
                <span>COMING SOON</span>
              </div>
            </motion.div>

            {/* Card 5: Project Space Five - Coming Soon (col-span-2) */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#121316] border border-white/5 p-8 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100 md:col-span-2 min-h-[220px]"
            >
              <div className="space-y-2 text-left w-full md:w-3/4">
                <span className="text-[11px] font-mono text-primary tracking-widest uppercase block">// SPACE 05</span>
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">Project Space Five</h3>
                <p className="text-white/60 text-sm leading-relaxed mt-2">
                  WebGL-based rendering pipelines and shaders sandbox, investigating procedural generative layouts and custom fluid physics.
                </p>
              </div>
              <div className="flex flex-row md:flex-col justify-between items-end gap-2 w-full md:w-1/4 shrink-0 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded font-mono tracking-widest uppercase">IN DEVELOPMENT</span>
                <span className="text-[10px] opacity-40 font-mono tracking-wider mt-1 block">CREATIVE SANDBOX</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verify Badges & Certificates Division */}
      <section className="py-[100px] md:py-[140px] bg-[#0d0e10] border-t border-b border-white/5" id="certificates">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[14px] text-primary uppercase tracking-wider">Verification</span>
              <h2 className="text-4xl font-bold mt-4 text-white">Certificates & Badges</h2>
            </div>
            <div className="hidden md:block">
              <span className="text-[14px] text-white/40 font-mono">CREDLY VERIFIED</span>
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <div className="carousel-track gap-8 px-8">
            {[
              { title: "IT Essentials", issuer: "CISCO SYSTEMS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/94a71fbe-61b8-4222-af0f-805dae3ef20f" },
              { title: "Introduction to Modern AI", issuer: "COMPUTING LABS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/37e10a6d-8405-45e3-bf3e-c4c0914e55ca" },
              { title: "Introduction to Data Science", issuer: "DATA ACADEMY // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/905ec9b4-b3cd-4470-9c1a-559772b329c9" },
              { title: "IT Essentials", issuer: "CISCO SYSTEMS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/94a71fbe-61b8-4222-af0f-805dae3ef20f" },
              { title: "Introduction to Modern AI", issuer: "COMPUTING LABS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/37e10a6d-8405-45e3-bf3e-c4c0914e55ca" },
              { title: "Introduction to Data Science", issuer: "DATA ACADEMY // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/905ec9b4-b3cd-4470-9c1a-559772b329c9" },
              { title: "IT Essentials", issuer: "CISCO SYSTEMS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/94a71fbe-61b8-4222-af0f-805dae3ef20f" },
              { title: "Introduction to Modern AI", issuer: "COMPUTING LABS // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/37e10a6d-8405-45e3-bf3e-c4c0914e55ca" },
              { title: "Introduction to Data Science", issuer: "DATA ACADEMY // CREDLY", badgeUrl: "https://www.credly.com/embedded_badge/905ec9b4-b3cd-4470-9c1a-559772b329c9" }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-[280px] md:w-[350px] shrink-0 bg-[#121316] border border-white/5 p-6 rounded-lg flex flex-col items-center justify-between text-center group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100"
              >
                <div className="w-full min-h-[240px] flex items-center justify-center relative rounded overflow-hidden p-2 bg-[#121316]/50 border border-white/5">
                  <iframe className="relative z-10 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity" src={item.badgeUrl} width="150" height="270" title={`${item.title} Badge`} loading="lazy" />
                </div>
                <div className="mt-4 border-t border-white/5 pt-4 w-full text-left font-sans">
                  <span className="text-[9px] font-mono text-primary tracking-widest uppercase block mb-1">// CREDLY VERIFIED</span>
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors truncate">{item.title}</h3>
                  <p className="text-[10px] font-mono opacity-50 mt-1 uppercase">{item.issuer.split(" // ")[0]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stacks Auto Scroll Carousel */}
      <section className="py-[100px] md:py-[140px] bg-[#121316] overflow-hidden" id="stacks">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto mb-12">
          <span className="text-[14px] text-primary uppercase tracking-wider block mb-2">Capabilities</span>
          <h2 className="text-3xl font-bold text-white tracking-tight">Core Stack & Ecosystem</h2>
        </div>

        <div className="relative w-full flex items-center">
          <div className="flex gap-16 items-center whitespace-nowrap animate-marquee-reverse hover:[animation-play-state:paused] transition-all duration-300">
            {[
              { name: "Figma", category: "PROTOTYPING", icon: "https://cdn.simpleicons.org/figma/ffffff" },
              { name: "Google Stitch", category: "PROTOTYPING", icon: "https://cdn.simpleicons.org/google/ffffff" },
              { name: "ReactJS", category: "FRONTEND", icon: "https://cdn.simpleicons.org/react/ffffff" },
              { name: "Next.js", category: "FRONTEND", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
              { name: "Tailwind CSS", category: "FRONTEND", icon: "https://cdn.simpleicons.org/tailwindcss/ffffff" },
              { name: "Bootstrap", category: "FRONTEND", icon: "https://cdn.simpleicons.org/bootstrap/ffffff" },
              { name: "Vite", category: "FRONTEND", icon: "https://cdn.simpleicons.org/vite/ffffff" },
              { name: "Python", category: "BACKEND // DEV", icon: "https://cdn.simpleicons.org/python/ffffff" }
            ].map((stack, i) => (
              <div key={i} className="flex items-center space-x-4 select-none opacity-50 hover:opacity-100 transition-opacity duration-300">
                <img src={stack.icon} alt={`${stack.name} icon`} className="w-6 h-6 md:w-8 md:h-8 object-contain" loading="lazy" />
                <span className="text-2xl md:text-4xl font-extrabold text-white font-mono tracking-tighter">{stack.name}</span>
                <span className="text-[9px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded font-mono tracking-widest uppercase">{stack.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Wrapper */}
      <footer className="bg-[#0d0e10] w-full border-t border-white/5 pt-[120px] md:pt-[160px] pb-12" id="footer">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto flex flex-col items-center text-center">
          <div className="mb-6">
            <p className="text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-white/60 font-mono">Have a vision that needs clarity?</p>
          </div>
          <div className="mb-32">
            <motion.a 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-4 text-4xl md:text-7xl font-extrabold text-white hover:text-primary transition-all duration-500" 
              href="mailto:uretajuster@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              START A PROJECT <span className="inline-block transform group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500">↗</span>
            </motion.a>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-xs">
            <div className="flex gap-8 order-2 sm:order-1">
              <motion.a 
                whileTap={{ scale: 0.96 }}
                className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" 
                href="https://www.instagram.com/peachmango.jus/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </motion.a>
              <motion.a 
                whileTap={{ scale: 0.96 }}
                className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" 
                href="https://github.com/Strixyl" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </motion.a>
              <motion.a 
                whileTap={{ scale: 0.96 }}
                className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" 
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
                className="text-[12px] text-white/40 hover:text-primary transition-colors tracking-widest font-mono" 
                href="tel:+639292153424"
              >
                PH // +63 929 215 3424
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}