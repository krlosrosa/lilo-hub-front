import { ReactNode } from "react";
import { coupons } from "../data/data.cupom";

interface WorldMapProps {
  children: ReactNode;
}

/** Generate SVG path connecting all coupon nodes in order */
function buildPath() {
  if (coupons.length < 2) return "";
  const points = coupons.map((c) => ({ x: c.mapX, y: c.mapY }));
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpX1 = prev.x + (curr.x - prev.x) * 0.5;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (curr.x - prev.x) * 0.5;
    const cpY2 = curr.y;
    d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
  }
  return d;
}

// City decorations spread across the map
const decorations = [
  // Trees & parks
  { emoji: "🌳", x: 5, y: 15, size: 22 },
  { emoji: "🌳", x: 7, y: 17, size: 18 },
  { emoji: "🌲", x: 92, y: 12, size: 20 },
  { emoji: "🌳", x: 68, y: 62, size: 22 },
  { emoji: "🌲", x: 10, y: 65, size: 18 },
  { emoji: "🌳", x: 33, y: 46, size: 16 },
  { emoji: "🌲", x: 58, y: 26, size: 18 },
  { emoji: "🌳", x: 88, y: 74, size: 20 },
  { emoji: "🌳", x: 3, y: 38, size: 16 },
  { emoji: "🌲", x: 94, y: 38, size: 16 },
  { emoji: "🌳", x: 48, y: 85, size: 20 },
  { emoji: "🌲", x: 75, y: 48, size: 14 },

  // Buildings & city elements
  { emoji: "🏠", x: 40, y: 2, size: 18 },
  { emoji: "🏢", x: 55, y: 48, size: 16 },
  { emoji: "🏡", x: 86, y: 50, size: 16 },
  { emoji: "🏪", x: 8, y: 45, size: 16 },
  { emoji: "🏠", x: 22, y: 78, size: 16 },
  { emoji: "🏗️", x: 70, y: 2, size: 14 },
  { emoji: "🏢", x: 30, y: 18, size: 14 },
  { emoji: "🏬", x: 92, y: 28, size: 14 },

  // City infrastructure
  { emoji: "⛲", x: 48, y: 52, size: 20 },
  { emoji: "🚗", x: 37, y: 35, size: 12 },
  { emoji: "🚌", x: 62, y: 68, size: 12 },
  { emoji: "🛵", x: 18, y: 55, size: 12 },
  { emoji: "🚲", x: 82, y: 62, size: 12 },

  // Street elements
  { emoji: "🏪", x: 55, y: 82, size: 14 },
  { emoji: "🏛️", x: 15, y: 30, size: 14 },
  { emoji: "⛪", x: 85, y: 85, size: 16 },
  { emoji: "🏟️", x: 5, y: 82, size: 16 },
  { emoji: "🎡", x: 92, y: 5, size: 16 },

  // Nature accents
  { emoji: "🌻", x: 25, y: 12, size: 12 },
  { emoji: "🌺", x: 76, y: 38, size: 10 },
  { emoji: "🌷", x: 42, y: 62, size: 10 },
  { emoji: "☁️", x: 20, y: 1, size: 20, opacity: 0.3 },
  { emoji: "☁️", x: 65, y: 3, size: 16, opacity: 0.25 },
  { emoji: "☁️", x: 85, y: 0, size: 18, opacity: 0.2 },
];

// SVG roads pattern
function CityRoads() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 700"
      preserveAspectRatio="none"
    >
      {/* Horizontal roads */}
      <rect x="0" y="70" width="400" height="8" rx="4" fill="hsl(220 10% 85%)" opacity="0.4" />
      <rect x="0" y="200" width="400" height="8" rx="4" fill="hsl(220 10% 85%)" opacity="0.35" />
      <rect x="0" y="350" width="400" height="10" rx="5" fill="hsl(220 10% 85%)" opacity="0.4" />
      <rect x="0" y="490" width="400" height="8" rx="4" fill="hsl(220 10% 85%)" opacity="0.35" />
      <rect x="0" y="600" width="400" height="8" rx="4" fill="hsl(220 10% 85%)" opacity="0.3" />

      {/* Vertical roads */}
      <rect x="80" y="0" width="8" height="700" rx="4" fill="hsl(220 10% 85%)" opacity="0.3" />
      <rect x="200" y="0" width="10" height="700" rx="5" fill="hsl(220 10% 85%)" opacity="0.35" />
      <rect x="320" y="0" width="8" height="700" rx="4" fill="hsl(220 10% 85%)" opacity="0.3" />

      {/* Road dashes - horizontal */}
      {[74, 204, 355, 494].map((y) =>
        Array.from({ length: 20 }, (_, i) => (
          <rect
            key={`hd-${y}-${i}`}
            x={i * 22 + 5}
            y={y}
            width="10"
            height="2"
            rx="1"
            fill="hsl(45 80% 65%)"
            opacity="0.5"
          />
        ))
      )}

      {/* Road dashes - vertical */}
      {[84, 205, 324].map((x) =>
        Array.from({ length: 35 }, (_, i) => (
          <rect
            key={`vd-${x}-${i}`}
            x={x}
            y={i * 22 + 5}
            width="2"
            height="10"
            rx="1"
            fill="hsl(45 80% 65%)"
            opacity="0.5"
          />
        ))
      )}

      {/* Green park blocks */}
      <rect x="15" y="100" width="50" height="80" rx="12" fill="hsl(145 35% 82%)" opacity="0.5" />
      <rect x="335" y="220" width="50" height="100" rx="12" fill="hsl(145 35% 82%)" opacity="0.45" />
      <rect x="100" y="410" width="80" height="60" rx="12" fill="hsl(145 35% 82%)" opacity="0.4" />
      <rect x="240" y="550" width="60" height="80" rx="12" fill="hsl(145 40% 80%)" opacity="0.45" />
    </svg>
  );
}

const WorldMap = ({ children }: WorldMapProps) => {
  const pathD = buildPath();

  return (
    <div
      className="relative w-full min-h-[700px] mx-auto max-w-md overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, 
            hsl(200 60% 92%) 0%, 
            hsl(145 25% 94%) 15%, 
            hsl(145 30% 93%) 50%,
            hsl(140 28% 91%) 80%,
            hsl(38 30% 92%) 100%
          )
        `,
      }}
    >
      {/* City roads layer */}
      <CityRoads />

      {/* SVG path connecting coupon nodes */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 85"
        preserveAspectRatio="none"
      >
        {/* Path glow */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(38 90% 60%)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Main dotted path */}
        <path
          d={pathD}
          fill="none"
          stroke="hsl(38 85% 55%)"
          strokeWidth="1"
          strokeDasharray="1.5 1.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Decorative elements */}
      {decorations.map((d, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            fontSize: `${d.size}px`,
            opacity: (d as any).opacity ?? 0.55,
          }}
        >
          {d.emoji}
        </span>
      ))}

      {/* Coupon nodes */}
      {children}
    </div>
  );
};

export default WorldMap;
