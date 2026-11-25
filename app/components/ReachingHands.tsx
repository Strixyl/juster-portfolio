"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 115,
  damping: 22,
  mass: 0.9,
};

interface ReachingHandsProps {
  isTouching: boolean;
  onTouchingChange: (touching: boolean) => void;
}

export function ReachingHands({
  isTouching,
  onTouchingChange,
}: ReachingHandsProps) {
  return (
    <div
      onMouseEnter={() => onTouchingChange(true)}
      onMouseLeave={() => onTouchingChange(false)}
      onClick={() => onTouchingChange(!isTouching)}
      className="relative w-full max-w-5xl mx-auto h-[230px] sm:h-[300px] md:h-[360px] lg:h-[400px] mb-16 sm:mb-20 select-none cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label="Interactive monochrome wireframe and human hands reaching to touch fingertips"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onTouchingChange(!isTouching);
        }
      }}
    >
      {/* Fingertip contact spark & subtle warm-white bloom right at center (50%, 50%) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        {/* Expanding 1px contact ring */}
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { scale: [0.3, 2.3], opacity: [0.85, 0] }
              : { scale: 0.3, opacity: 0 }
          }
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="w-12 h-12 rounded-full border border-white/75"
        />

        {/* Subtle warm tungsten bloom on contact */}
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { scale: 1.25, opacity: 0.85 }
              : { scale: 0.2, opacity: 0 }
          }
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-amber-200/70 blur-[10px]"
        />

        {/* Crisp white contact core */}
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { scale: 1, opacity: 0.95 }
              : { scale: 0.2, opacity: 0 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white blur-[4px]"
        />

        {/* Sharp 4px pixel contact diamond */}
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { scale: 1, opacity: 1, rotate: 45 }
              : { scale: 0, opacity: 0, rotate: 0 }
          }
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white"
        />
      </div>

      {/* Left Wireframe Hand — stays crisp pure digital white */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10">
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { x: 2, y: 1, rotate: 0 }
              : { x: -46, y: -22, rotate: -2 }
          }
          transition={SPRING_TRANSITION}
          style={{ willChange: "transform" }}
        >
          <div
            style={{
              transform: "translate(-99.49%, -66.69%)",
              WebkitMaskImage:
                "linear-gradient(115deg, transparent 0%, black 22%, black 100%)",
              maskImage:
                "linear-gradient(115deg, transparent 0%, black 22%, black 100%)",
            }}
          >
            <Image
              src="/images/hand-wireframe.png"
              alt="Monochrome 3D wireframe digital hand"
              width={786}
              height={644}
              draggable={false}
              className="h-[170px] sm:h-[235px] md:h-[300px] lg:h-[340px] w-auto max-w-none select-none pointer-events-none opacity-95"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Human Hand — B&W at rest, warms subtly into tungsten skin tone on fingertip touch */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10">
        <motion.div
          initial={false}
          animate={
            isTouching
              ? { x: -2, y: -1, rotate: 0 }
              : { x: 46, y: 22, rotate: 2 }
          }
          transition={SPRING_TRANSITION}
          style={{ willChange: "transform" }}
        >
          <div
            style={{
              transform: "translate(-0.58%, -28.41%)",
              WebkitMaskImage:
                "linear-gradient(295deg, transparent 0%, black 20%, black 100%)",
              maskImage:
                "linear-gradient(295deg, transparent 0%, black 20%, black 100%)",
            }}
          >
            <Image
              src="/images/hand-human.png"
              alt="Monochrome human hand reaching"
              width={684}
              height={644}
              draggable={false}
              style={{
                filter: isTouching
                  ? "sepia(0.42) saturate(1.55) hue-rotate(-14deg) brightness(1.06)"
                  : "sepia(0) saturate(1) hue-rotate(0deg) brightness(1)",
                transition: "filter 450ms ease",
              }}
              className="h-[170px] sm:h-[235px] md:h-[300px] lg:h-[340px] w-auto max-w-none select-none pointer-events-none opacity-95"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
