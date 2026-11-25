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
 * Bespoke 1px-stroke monochrome architectural credential emblems
 */
export function StudioBadgeEmblem({
  variant,
  className = "w-28 h-28",
}: AccentProps & {
  variant: "hardware" | "ai" | "data";
}) {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none select-none shrink-0 ${className}`}
    >
      {/* Shared outer architectural registration frame */}
      <polygon
        points="60,6 106,33 106,87 60,114 14,87 14,33"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <polygon
        points="60,14 99,37 99,83 60,106 21,83 21,37"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1"
      />
      {/* Cardinal registration ticks */}
      <path
        d="M60 2V10M60 110V118M6 60H14M106 60H114"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="1"
      />

      {variant === "hardware" && (
        <>
          {/* IT Essentials: Precision processor / circuit bus schematic */}
          <rect x="42" y="42" width="36" height="36" stroke="currentColor" strokeWidth="1.25" />
          <rect x="50" y="50" width="20" height="20" stroke="currentColor" strokeOpacity="0.65" strokeWidth="1" />
          <rect x="57" y="57" width="6" height="6" fill="currentColor" />
          {/* Top / Bottom / Left / Right pins */}
          <path
            d="M50 32V42M60 30V42M70 32V42M50 78V88M60 78V90M70 78V88M32 50H42M30 60H42M32 70H42M78 50H88M78 60H90M78 70H88"
            stroke="currentColor"
            strokeOpacity="0.75"
            strokeWidth="1"
          />
        </>
      )}

      {variant === "ai" && (
        <>
          {/* Modern AI: Symmetric neural graph lattice */}
          <circle cx="60" cy="60" r="24" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 3" />
          {/* Edges */}
          <path
            d="M40 46L60 36L80 46M40 74L60 84L80 74M40 46V74M80 46V74M40 46L60 60L80 46M40 74L60 60L80 74M60 36V84"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1"
          />
          {/* Nodes */}
          <rect x="56" y="56" width="8" height="8" fill="currentColor" />
          <rect x="57.5" y="33.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
          <rect x="57.5" y="81.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
          <rect x="37.5" y="43.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
          <rect x="77.5" y="43.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
          <rect x="37.5" y="71.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
          <rect x="77.5" y="71.5" width="5" height="5" fill="#080808" stroke="currentColor" strokeWidth="1.1" />
        </>
      )}

      {variant === "data" && (
        <>
          {/* Data Science: Telemetry axes, precision bars & plotted signal curve */}
          <path d="M36 38V82H86" stroke="currentColor" strokeOpacity="0.75" strokeWidth="1.2" />
          <path d="M36 52H84M36 67H84" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="2 3" />
          <rect x="43" y="66" width="7" height="16" stroke="currentColor" strokeOpacity="0.6" strokeWidth="1" />
          <rect x="55" y="54" width="7" height="28" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1" />
          <rect x="67" y="44" width="7" height="38" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.1" />
          <polyline
            points="46.5,60 58.5,48 70.5,40 81,46"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <rect x="44.5" y="58" width="4" height="4" fill="currentColor" />
          <rect x="56.5" y="46" width="4" height="4" fill="currentColor" />
          <rect x="68.5" y="38" width="4" height="4" fill="currentColor" />
          <rect x="79" y="44" width="4" height="4" fill="currentColor" />
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
