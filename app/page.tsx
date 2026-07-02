"use client";

import { useEffect } from "react";

export default function Home() {
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

    document.addEventListener("click", handleScrollClick);
    return () => {
      document.removeEventListener("click", handleScrollClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-primary selection:text-surface">
      {/* 
        NAVIGATION HEADER 
        NOTE: To hide the header ENTIRELY on mobile, change the className below to:
        "hidden md:block sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30"
      */}
      <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30">
        <nav className="flex justify-between items-center px-6 lg:px-[80px] py-4 md:py-6 max-w-container-max mx-auto">
          {/* Keeps branding clean and visible on mobile, no menu clutter */}
          <div className="text-[20px] md:text-[32px] tracking-tighter text-on-surface font-extrabold flex-1">
            JUSTER
          </div>
          <div className="flex-1 text-center hidden md:block">
            <a className="text-[14px] uppercase text-primary font-bold tracking-widest" href="#works">
              PORTFOLIO
            </a>
          </div>
          <div className="flex-1 text-right hidden md:block">
            <a className="px-6 py-2 bg-secondary-container text-on-surface text-[14px] uppercase hover:bg-surface-bright/20 transition-all duration-400" href="#footer">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Intro Section with Local Video Layer */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#121316]">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 scale-105"
          src="/videoholder.mp4" 
        />
        {/* Adjusted Gradient Blur Overlay for Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/70 to-[#121316]/40 z-10" />
        
        <div className="relative z-20 text-center px-6 md:px-0">
          <p className="text-[14px] uppercase tracking-[0.3em] mb-8 opacity-80 text-primary font-mono">Independent Brand Studio</p>
          <h1 className="text-4xl md:text-7xl text-white max-w-4xl mx-auto mb-12 font-extrabold leading-tight tracking-tight">
            Designer for brands that <span className="italic font-light text-primary">refuse</span> to blend in.
          </h1>
          <div className="flex flex-col items-center gap-6">
            <a className="group relative px-10 py-4 border border-white/30 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-white" href="#works">
              <span className="relative z-10 text-[14px] uppercase text-white group-hover:text-surface transition-colors duration-500 font-bold tracking-wider">Work With Me</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
            <p className="text-[10px] tracking-widest opacity-50 uppercase font-mono">Scroll to discover</p>
          </div>
        </div>
      </section>

      {/* Studio Philosophy Statement */}
      <section className="py-[120px] md:py-[160px] px-6 lg:px-[80px] max-w-container-max mx-auto text-center border-b border-outline-variant/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-5xl mb-12 italic leading-tight font-semibold">
            &ldquo;Designing inclusive, responsive, and user-centered websites where exceptional UI meets intuitive UX, empowering businesses to connect with diverse audiences.&rdquo;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-24">
            <div className="space-y-4">
              <span className="text-[14px] text-primary font-mono">01</span>
              <h3 className="text-2xl font-bold">Precision</h3>
              <p className="text-on-surface-variant">Meticulous attention to every pixel and transition, ensuring a seamless digital performance.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[14px] text-primary font-mono">02</span>
              <h3 className="text-2xl font-bold">Intuition</h3>
              <p className="text-on-surface-variant">Creating interfaces that users understand instinctively, reducing friction and increasing joy.</p>
            </div>
            <div className="space-y-4">
              <span className="text-[14px] text-primary font-mono">03</span>
              <h3 className="text-2xl font-bold">Inclusivity</h3>
              <p className="text-on-surface-variant">Design that speaks to everyone, regardless of ability or device, ensuring no user is left behind.</p>
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
            <span className="text-[14px] text-on-surface-variant/40 font-mono">2024–NOW</span>
          </div>
        </div>
        
        <div className="relative w-full">
          <div className="carousel-track gap-8 px-8">
            {[
              { id: "01", title: "Project Space One", tags: "COMING SOON" },
              { id: "02", title: "Project Space Two", tags: "COMING SOON" },
              { id: "03", title: "Project Space Three", tags: "COMING SOON" },
              { id: "04", title: "Project Space Four", tags: "COMING SOON" },
              { id: "05", title: "Project Space Five", tags: "COMING SOON" }
            ].map((item, index) => (   
              <div key={index} className="w-[300px] md:w-[450px] shrink-0 space-y-4 opacity-40 hover:opacity-80 transition-opacity duration-300">
                <div className="aspect-video bg-surface-container-highest/40 border border-outline-variant/20 relative flex items-center justify-center group">
                  <span className="absolute top-4 right-6 text-sm opacity-50 font-mono">{item.id}</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase font-mono opacity-30">Placeholder Container</span>
                </div>
                <div className="flex justify-between items-baseline px-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{item.title}</h3>
                  <span className="text-[10px] opacity-60 font-mono tracking-wider">{item.tags}</span>
                </div>
              </div>
            ))}
            {[
              { id: "01", title: "Project Space One", tags: "COMING SOON" },
              { id: "02", title: "Project Space Two", tags: "COMING SOON" },
              { id: "03", title: "Project Space Three", tags: "COMING SOON" },
              { id: "04", title: "Project Space Four", tags: "COMING SOON" },
              { id: "05", title: "Project Space Five", tags: "COMING SOON" }
            ].map((item, index) => (
              <div key={`dup-${index}`} className="w-[300px] md:w-[450px] shrink-0 space-y-4 opacity-40 hover:opacity-80 transition-opacity duration-300">
                <div className="aspect-video bg-surface-container-highest/40 border border-outline-variant/20 relative flex items-center justify-center group">
                  <span className="absolute top-4 right-6 text-sm opacity-50 font-mono">{item.id}</span>
                  <span className="text-[11px] tracking-[0.2em] uppercase font-mono opacity-30">Placeholder Container</span>
                </div>
                <div className="flex justify-between items-baseline px-2">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight">{item.title}</h3>
                  <span className="text-[10px] opacity-60 font-mono tracking-wider">{item.tags}</span>
                </div>
              </div>
            ))}
          </div>
        </div> 
      </section>

      {/* Journal Insights Grid with Elegant Fallback Layout Cards */}
      <section className="py-[120px] md:py-[160px] px-6 lg:px-[80px] bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <div className="mb-16">
            <span className="text-[14px] text-primary uppercase tracking-wider">Journal</span>
            <h2 className="text-4xl font-bold mt-4">Latest Insights</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                title: "The Psychology Behind Great UX Design", 
                date: "UX Psychology", 
                url: "https://krishnamohanyag.medium.com/the-psychology-behind-great-ux-design-1100d981d6c5",
                img: "https://miro.medium.com/v2/resize:fit:1200/1*m_T_b1_WnB2pL99i8gA43w.jpeg" 
              },
              { 
                title: "UI/UX Articles & Tidbits of the Week", 
                date: "Design Tidbits", 
                url: "https://pedrocanhenha.medium.com/ui-ux-articles-and-interesting-tidbits-of-the-week-f6abca984885",
                img: "https://miro.medium.com/v2/resize:fit:1200/1*S7wK9Fv-M1pXpB0v0uQx3Q.jpeg" 
              },
              { 
                title: "Companies Want Three Types of Designers in 2026", 
                date: "Industry Shift", 
                url: "https://nurxmedov.medium.com/companies-want-three-types-of-designers-in-2026-the-traditional-senior-isnt-one-9c5f7921249f",
                img: "https://miro.medium.com/v2/resize:fit:1200/1*p3b21g76_Xb4vA2vW2x5_Q.png" 
              },
              { 
                title: "Designers, Communication and Telling Stories", 
                date: "Creative Process", 
                url: "https://pedrocanhenha.medium.com/designers-communication-and-telling-stories-371f92ac8449",
                img: "https://miro.medium.com/v2/resize:fit:1200/1*dD0f666f7g3xM2x5v8u9_Q.jpeg" 
              }
            ].map((article, i) => (
              <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" className="space-y-6 group cursor-pointer block">
                <article>
                  <div className="aspect-4/5 overflow-hidden bg-surface-container-highest/60 relative mb-6 border border-outline-variant/10 flex items-center justify-center">
                    {/* Dark Minimalist Fallback Placeholder Layer */}
                    <div className="absolute inset-0 bg-gradient-to-br from-surface-container-highest to-surface flex flex-col justify-between p-6 opacity-40">
                      <span className="text-[10px] font-mono tracking-widest text-primary align-super">ARTICLE // 0{i + 1}</span>
                      <span className="text-[48px] font-black tracking-tighter text-on-surface-variant/10 select-none">JOURNAL</span>
                    </div>
                    <img 
                      src={article.img} 
                      alt={article.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 z-10" 
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[12px] text-primary uppercase font-mono tracking-wider">{article.date}</span>
                    <h3 className="text-xl leading-tight font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">{article.title}</h3>
                  </div>
                </article>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Contact Footer Wrapper */}
      <footer className="bg-surface-container w-full rounded-t-xl border-t border-outline-variant/20 pt-[120px] md:pt-[160px] pb-12" id="footer">
        <div className="px-6 lg:px-[80px] max-w-container-max mx-auto flex flex-col items-center">
          <div className="w-full text-left mb-16">
            <a className="text-[14px] text-on-surface-variant hover:text-primary transition-colors tracking-widest font-mono" href="tel:+639292153424" target="_blank" rel="noopener noreferrer">
              +63 929 215 3424
            </a>
          </div>
          <div className="mb-32">
            <a className="group flex items-center gap-4 text-4xl md:text-7xl font-extrabold text-on-surface hover:text-primary transition-all duration-500" href="mailto:hello@juster.design" target="_blank" rel="noopener noreferrer">
              START A PROJECT
              <span className="inline-block transform group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500">↗</span>
            </a>
          </div>
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-8 border-t border-outline-variant/20 pt-12 text-sm">
            <a className="uppercase tracking-[0.2em] hover:text-primary transition-colors font-mono" href="https://www.instagram.com/peachmango.jus/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="uppercase tracking-[0.2em] hover:text-primary transition-colors font-mono" href="https://github.com/Strixyl" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="uppercase tracking-[0.2em] hover:text-primary transition-colors font-mono" href="https://www.linkedin.com/in/juster-ureta/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}