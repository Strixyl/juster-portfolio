import React from "react";

interface AccentProps {
  className?: string;
}

/**
 * Fading horizontal pixel-block sequence (▪ ▪ ▪ ▪) for the top header bar
 */
export function HudPixelBlocks({ className = "" }: AccentProps) {
  return (
    <svg
      viewBox="0 0 38 6"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none shrink-0 w-[38px] h-[6px] ${className}`}
    >
      <rect x="0" y="1" width="4" height="4" fill="currentColor" fillOpacity="0.95" />
      <rect x="10" y="1" width="4" height="4" fill="currentColor" fillOpacity="0.7" />
      <rect x="20" y="1" width="4" height="4" fill="currentColor" fillOpacity="0.45" />
      <rect x="30" y="1" width="4" height="4" fill="currentColor" fillOpacity="0.22" />
    </svg>
  );
}

/**
 * Crisp 1px-stroke diagonal northeast arrow (↗) for primary buttons
 */
export function StudioArrowNE({ className = "w-3.5 h-3.5" }: AccentProps) {
  return (
    <svg
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none shrink-0 ${className}`}
    >
      <path
        d="M3 11L11 3M11 3H4.5M11 3V9.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * Minimalist 1px-stroke technical metadata icons for key-value spec rows
 */
export function StudioSpecIcon({
  variant,
  className = "w-3 h-3",
}: AccentProps & {
  variant: "layers" | "code" | "grid" | "terminal" | "shield" | "box";
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none shrink-0 ${className}`}
    >
      {variant === "layers" && (
        <>
          <rect x="1.5" y="1.5" width="9" height="3.5" stroke="currentColor" strokeWidth="1" />
          <path d="M1.5 7.5H10.5M1.5 10.5H10.5" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {variant === "code" && (
        <path
          d="M4 3L1.5 6L4 9M8 3L10.5 6L8 9"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="square"
        />
      )}
      {variant === "grid" && (
        <>
          <rect x="1.5" y="1.5" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
          <rect x="7" y="1.5" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
          <rect x="1.5" y="7" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
          <rect x="7" y="7" width="3.5" height="3.5" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {variant === "terminal" && (
        <>
          <rect x="1" y="1.5" width="10" height="9" stroke="currentColor" strokeWidth="1" />
          <path d="M3.5 4.5L5.5 6L3.5 7.5M6.5 7.5H8.5" stroke="currentColor" strokeWidth="1" />
        </>
      )}
      {variant === "shield" && (
        <path
          d="M6 1.25L10.25 2.75V6C10.25 8.4 8.4 10 6 10.75C3.6 10 1.75 8.4 1.75 6V2.75L6 1.25Z"
          stroke="currentColor"
          strokeWidth="1"
        />
      )}
      {variant === "box" && (
        <>
          <rect x="1.5" y="1.5" width="9" height="9" stroke="currentColor" strokeWidth="1" />
          <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 1.5" />
        </>
      )}
    </svg>
  );
}

/**
 * Ultra-faint architectural wireframe blueprint outline restricted to wide outer margins
 */
export function StudioBlueprintMargin({ className = "" }: AccentProps) {
  return (
    <svg
      viewBox="0 0 1440 800"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 w-full h-full opacity-[0.07] ${className}`}
    >
      {/* Left margin wireframe schematic */}
      <line x1="80" y1="0" x2="80" y2="800" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
      <rect x="32" y="160" width="96" height="96" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="160" x2="128" y2="256" stroke="currentColor" strokeWidth="1" />
      <path d="M74 620H86M80 614V626" stroke="currentColor" strokeWidth="1" />

      {/* Right margin wireframe schematic */}
      <line x1="1360" y1="0" x2="1360" y2="800" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
      <polygon points="1360,520 1412,550 1412,610 1360,640 1308,610 1308,550" stroke="currentColor" strokeWidth="1" />
      <line x1="1360" y1="520" x2="1360" y2="640" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M1354 180H1366M1360 174V186" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
