"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ReachingHands } from "./ReachingHands";

const PHRASE = "Websites built to capture minds and hold attention.";
const WORDS = PHRASE.split(" ");
const GLYPHS = "#/_01X+[]";

function ScrollWord({
  word,
  displayWord,
  index,
  total,
  progress,
  isIlluminated,
}: {
  word: string;
  displayWord: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  isIlluminated: boolean;
}) {
  const start = (index / total) * 0.72;
  const end = Math.min(1, start + 0.28);
  const scrollOpacity = useTransform(progress, [start, end], [0.18, 0.92]);

  return (
    <span className="relative inline-block mr-[0.3em]">
      {/* Scroll-driven opacity word */}
      <motion.span
        style={{
          opacity: isIlluminated ? 1 : scrollOpacity,
        }}
        animate={{
          color: isIlluminated ? "#ffffff" : "#efefef",
          textShadow: isIlluminated
            ? "0 0 22px rgba(255, 255, 255, 0.32)"
            : "0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        aria-label={word}
      >
        {displayWord}
      </motion.span>
    </span>
  );
}

export function PhilosophyStage() {
  const [isHandsTouching, setIsHandsTouching] = useState(false);
  const [decodedWords, setDecodedWords] = useState<string[]>(WORDS);
  const phraseRef = useRef<HTMLDivElement | null>(null);
  const hasDecodedRef = useRef(false);

  // Scroll-linked progress for word-by-word illumination
  const { scrollYProgress } = useScroll({
    target: phraseRef,
    offset: ["start 0.88", "center 0.45"],
  });

  // Crisp terminal glyph decode once on scroll into view (0.75s, zero lingering timers)
  useEffect(() => {
    const el = phraseRef.current;
    if (!el) return;

    let rafId = 0;

    const runDecode = () => {
      const duration = 750;
      const startTime = performance.now();
      const totalChars = PHRASE.length;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const ratio = Math.min(1, elapsed / duration);
        const resolvedCount = Math.floor(ratio * totalChars);

        if (ratio >= 1) {
          setDecodedWords(WORDS);
          return;
        }

        let built = "";
        for (let i = 0; i < totalChars; i++) {
          const ch = PHRASE[i];
          if (ch === " " || i < resolvedCount) {
            built += ch;
          } else if (i < resolvedCount + 6) {
            built += GLYPHS[(i + Math.floor(elapsed / 45)) % GLYPHS.length];
          } else {
            built += ch;
          }
        }
        setDecodedWords(built.split(" "));
        rafId = requestAnimationFrame(step);
      };

      rafId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasDecodedRef.current) {
          hasDecodedRef.current = true;
          runDecode();
        } else if (!entry.isIntersecting) {
          hasDecodedRef.current = false;
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Interactive Wireframe + Human Reaching Hands */}
      <ReachingHands
        isTouching={isHandsTouching}
        onTouchingChange={setIsHandsTouching}
      />

      {/* Scroll-Illuminated + Glyph-Decoded + Fingertip-Synced Statement */}
      <div className="max-w-4xl mx-auto">
        <div
          id="philosophy-container"
          ref={phraseRef}
          className="relative min-h-[6rem] flex items-center justify-center mb-12"
        >
          <div className="relative inline-block text-left max-w-2xl mx-auto overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-semibold uppercase leading-snug tracking-[0.04em] font-sans">
              {WORDS.map((word, idx) => (
                <ScrollWord
                  key={idx}
                  word={word}
                  displayWord={decodedWords[idx] ?? word}
                  index={idx}
                  total={WORDS.length}
                  progress={scrollYProgress}
                  isIlluminated={isHandsTouching}
                />
              ))}
            </h2>

            {/* Pure white light-sweep sheen triggered when fingertips touch */}
            <motion.div
              aria-hidden="true"
              initial={false}
              animate={
                isHandsTouching
                  ? { x: ["-120%", "140%"], opacity: [0, 0.55, 0] }
                  : { x: "-120%", opacity: 0 }
              }
              transition={{ duration: 0.85, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-18deg]"
            />
          </div>
        </div>
      </div>
    </>
  );
}
