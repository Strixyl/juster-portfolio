"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    // Smooth scrolling logic
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

    // Auto-hide header on scroll logic
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

  return (
    <div className="relative min-h-screen bg-[#121316] text-white selection:bg-primary selection:text-surface">
      
      {/* Header Fixed & Layout aligned verbatim to image_af73aa.png */}
      <header className={`fixed top-0 w-full z-50 bg-[#121316]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-500 ease-in-out ${
        isHeaderVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}>
        <nav className="flex justify-between items-center px-6 lg:px-[80px] py-4 max-w-container-max mx-auto h-[70px]">
          {/* Left: Condensed Tall Name Logo matching image_af73aa.png */}
          <div className="text-[26px] md:text-[32px] tracking-tighter text-white font-black uppercase leading-none scale-y-110 origin-left font-sans select-none flex-1">
            JUSTER
          </div>
          
          {/* Center Links stacked matching image_af73aa.png */}
          <div className="flex flex-col items-center justify-center text-center space-y-0.5 flex-1 hidden md:flex">
            <a className="text-[10px] uppercase tracking-[0.25em] text-white font-bold hover:text-primary transition-colors" href="#works">
              PORTFOLIO
            </a>
            <a className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold hover:text-white transition-colors" href="#stacks">
              STACKS
            </a>
          </div>
          
          {/* Right Links stacked matching image_af73aa.png */}
          <div className="flex flex-col items-end text-right text-[10px] uppercase tracking-[0.25em] font-bold flex-1 hidden md:flex">
            <span className="text-white/30 tracking-[0.3em] font-medium">STUDIO</span>
            <a className="text-white hover:text-primary transition-colors" href="#footer">
              CONTACT
            </a>
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
            <a className="group relative px-10 py-4 border border-white/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white" href="#works">
              <span className="relative z-10 text-[14px] uppercase text-white group-hover:text-[#121316] transition-colors duration-500 font-bold tracking-wider">See My Work</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            <p className="text-[10px] tracking-widest opacity-50 uppercase font-mono">Explore projects below</p>
          </div>
        </div>
      </section>

      {/* Studio Philosophy Statement */}
      <section className="py-[120px] md:py-[180px] px-6 lg:px-[80px] max-w-container-max mx-auto text-center border-b border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl mb-12 leading-snug tracking-tight font-medium text-white">
            &ldquo;Building digital spaces where <span className="italic text-primary">exceptional form</span> meets intuitive function. No noise. No template fluff. Just design that demands attention.&rdquo;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-24">
            <div className="space-y-3">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 01 / IDENTITY</span>
              <h3 className="text-xl font-bold tracking-tight">Precision</h3>
              <p className="text-white/60 text-sm leading-relaxed">Meticulous attention to every pixel and transition, ensuring a seamless digital performance.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 02 / EXPERIENCE</span>
              <h3 className="text-xl font-bold tracking-tight">Intuition</h3>
              <p className="text-white/60 text-sm leading-relaxed">Creating interfaces that users understand instinctively, reducing friction and increasing joy.</p>
            </div>
            <div className="space-y-3">
              <span className="text-[13px] text-primary font-mono tracking-widest block">// 03 / SYSTEM</span>
              <h3 className="text-xl font-bold tracking-tight">Inclusivity</h3>
              <p className="text-white/60 text-sm leading-relaxed">Design that speaks to everyone, regardless of ability or device, ensuring no user is left behind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Portfolio Marquee Showcase */}
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
        
        <div className="relative w-full">
          <div className="carousel-track gap-8 px-8">
            {[
              { id: "01", title: "Traffic Management System", tags: "FRONTEND // ARCHITECTURE", url: "https://traffic-management-system-cyan.vercel.app/", img: "/images/tms.png" },
              { id: "02", title: "Breeders Enterprise", tags: "FRONTEND // UI EXECUTION", url: "https://www.breedersenterprise.com/", img: "/images/bea.png" },
              { id: "03", title: "Project Space Three", tags: "COMING SOON", url: "#", img: null },
              { id: "04", title: "Project Space Four", tags: "COMING SOON", url: "#", img: null },
              { id: "05", title: "Project Space Five", tags: "COMING SOON", url: "#", img: null }
            ].map((item, index) => (   
              <a 
                key={index} 
                href={item.url} 
                target={item.url !== "#" ? "_blank" : undefined} 
                rel="noopener noreferrer" 
                className="w-[300px] md:w-[450px] shrink-0 space-y-4 opacity-40 hover:opacity-100 transition-opacity duration-300 block group"
              >
                <div className="aspect-video bg-white/5 border border-white/10 relative flex items-center justify-center overflow-hidden">
                  <span className="absolute top-4 right-6 text-sm opacity-50 font-mono group-hover:text-primary transition-colors z-20">{item.id}</span>
                  {item.img && (
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 z-10"
                      onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                    />
                  )}
                  <span className="text-[11px] tracking-[0.2em] uppercase font-mono opacity-30 group-hover:scale-105 transition-transform duration-500 z-20">
                    {item.url !== "#" ? "View Live Project ↗" : "In Development"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline px-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                  <span className="text-[10px] opacity-60 font-mono tracking-wider">{item.tags}</span>
                </div>
              </a>
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

      {/* New Division for Verify Badges & Certificates — Styled like Selected Works */}
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

          {/* Grids containing Credly Embed Frames with dark overlays */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Certificate Card 1 */}
            <div className="bg-[#121316] border border-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100">
              <div className="w-full min-h-[290px] flex items-center justify-center relative rounded overflow-hidden p-2 bg-[#121316]">
                <iframe 
                  className="relative z-10 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                  src="https://www.credly.com/embedded_badge/94a71fbe-61b8-4222-af0f-805dae3ef20f" 
                  width="150" 
                  height="270" 
                  title="IT Essentials Badge"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-primary transition-colors">IT Essentials</h3>
                <p className="text-[11px] font-mono opacity-50 mt-1">CISCO SYSTEMS // CREDLY</p>
              </div>
            </div>

            {/* Certificate Card 2 */}
            <div className="bg-[#121316] border border-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100">
              <div className="w-full min-h-[290px] flex items-center justify-center relative rounded overflow-hidden p-2 bg-[#121316]">
                <iframe 
                  className="relative z-10 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                  src="https://www.credly.com/embedded_badge/37e10a6d-8405-45e3-bf3e-c4c0914e55ca" 
                  width="150" 
                  height="270" 
                  title="Introduction to Modern AI Badge"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-primary transition-colors">Introduction to Modern AI</h3>
                <p className="text-[11px] font-mono opacity-50 mt-1">COMPUTING LABS // CREDLY</p>
              </div>
            </div>

            {/* Certificate Card 3 */}
            <div className="bg-[#121316] border border-white/5 p-8 rounded-lg flex flex-col items-center justify-center text-center group transition-all duration-300 hover:border-primary/30 opacity-70 hover:opacity-100">
              <div className="w-full min-h-[290px] flex items-center justify-center relative rounded overflow-hidden p-2 bg-[#121316]">
                <iframe 
                  className="relative z-10 mix-blend-screen opacity-90 group-hover:opacity-100 transition-opacity"
                  src="https://www.credly.com/embedded_badge/905ec9b4-b3cd-4470-9c1a-559772b329c9" 
                  width="150" 
                  height="270" 
                  title="Introduction to Data Science Badge"
                  loading="lazy"
                />
              </div>
              <div className="mt-4 border-t border-white/5 pt-4 w-full">
                <h3 className="text-lg font-semibold text-white tracking-tight group-hover:text-primary transition-colors">Introduction to Data Science</h3>
                <p className="text-[11px] font-mono opacity-50 mt-1">DATA ACADEMY // CREDLY</p>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* Footer Wrapper */}
      <footer className="bg-[#0d0e10] w-full border-t border-white/5 pt-[120px] md:pt-[160px] pb-12" id="footer">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto flex flex-col items-center text-center">
          <div className="mb-6">
            <p className="text-[12px] md:text-[14px] uppercase tracking-[0.25em] text-white/60 font-mono">
              Have a vision that needs clarity?
            </p>
          </div>
          <div className="mb-32">
            <a className="group flex items-center justify-center gap-4 text-4xl md:text-7xl font-extrabold text-white hover:text-primary transition-all duration-500" href="mailto:hello@juster.design" target="_blank" rel="noopener noreferrer">
              START A PROJECT <span className="inline-block transform group-hover:translate-x-3 group-hover:-translate-y-3 transition-transform duration-500">↗</span>
            </a>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-white/5 pt-12 text-xs">
            <div className="flex gap-8 order-2 sm:order-1">
              <a className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" href="https://www.instagram.com/peachmango.jus/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" href="https://github.com/Strixyl" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="uppercase tracking-[0.15em] hover:text-primary transition-colors font-mono text-white/50" href="https://www.linkedin.com/in/juster-ureta/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="order-1 sm:order-2">
              <a className="text-[12px] text-white/40 hover:text-primary transition-colors tracking-widest font-mono" href="tel:+639292153424">
                PH // +63 929 215 3424
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}