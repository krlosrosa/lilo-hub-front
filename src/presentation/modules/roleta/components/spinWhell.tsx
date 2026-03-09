import { useRef, useEffect } from 'react';
import { partners } from '../data/mock';

const SEGMENTS = partners.length;
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS;

interface SpinWheelProps {
  rotation: number; // in degrees, animated externally
  isSpinning: boolean;
  onAnimationComplete?: () => void;
}

export function SpinWheel({ rotation, onAnimationComplete }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const prevRotation = useRef(rotation);
  const animFrameRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const startRotRef = useRef<number>(0);
  const targetRotRef = useRef<number>(0);
  const durationRef = useRef<number>(5000);

  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 4;

    ctx.clearRect(0, 0, size, size);

    partners.forEach((partner, i) => {
      const startAngle = i * SEGMENT_ANGLE - Math.PI / 2;
      const endAngle = startAngle + SEGMENT_ANGLE;

      // Segment fill
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();

      const isAlt = i % 2 === 0;
      ctx.fillStyle = partner.color;
      ctx.globalAlpha = isAlt ? 1 : 0.88;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Segment border
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label: rotated text centered in segment
      ctx.save();
      ctx.translate(cx, cy);
      // rotate to the middle of the segment, pointing outward (text reads from center out)
      ctx.rotate(startAngle + SEGMENT_ANGLE / 2);

      // Text center point — between center and edge
      const labelDist = radius * 0.64;

      // Shadow for readability
      ctx.shadowColor = 'rgba(0,0,0,0.55)';
      ctx.shadowBlur = 6;

      // Emoji — centered at labelDist, slightly above midline
      ctx.font = `${size * 0.068}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(partner.emoji, labelDist, -size * 0.036);

      // Name — below emoji, short & bold
      const firstName = partner.name.split(' ')[0]; // first word only for clarity
      ctx.font = `800 ${size * 0.037}px Nunito, Arial, sans-serif`;
      ctx.shadowBlur = 5;
      ctx.fillText(firstName, labelDist, size * 0.036);

      ctx.restore();
    });

    // Outer ring
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Gold outer rim
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 2, 0, 2 * Math.PI);
    ctx.strokeStyle = 'hsl(42, 100%, 54%)';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Center circle
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.09);
    grad.addColorStop(0, 'hsl(42, 100%, 70%)');
    grad.addColorStop(1, 'hsl(35, 100%, 46%)');
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.09, 0, 2 * Math.PI);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Center star/bolt
    ctx.font = `${size * 0.07}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    ctx.fillText('⭐', cx, cy);
  }, []);

  // Animate rotation
  useEffect(() => {
    if (rotation === prevRotation.current) return;

    const el = wheelRef.current;
    if (!el) return;

    // Cancel ongoing animation
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const from = prevRotation.current % 360;
    const to = rotation;
    const duration = 5000;

    startTimeRef.current = performance.now();
    startRotRef.current = from;
    targetRotRef.current = to;
    durationRef.current = duration;
    prevRotation.current = rotation;

    function easeOutCubic(t: number) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animate(now: number) {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / durationRef.current, 1);
      const easedT = easeOutCubic(t);
      const current = startRotRef.current + (targetRotRef.current - startRotRef.current) * easedT;

      if (el) el.style.transform = `rotate(${current}deg)`;

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (el) el.style.transform = `rotate(${targetRotRef.current}deg)`;
        onAnimationComplete?.();
      }
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [rotation, onAnimationComplete]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Pointer arrow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 z-20">
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '28px solid hsl(42, 100%, 54%)',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Outer glow ring */}
      <div
        className="pulse-ring absolute rounded-full"
        style={{
          width: 'calc(100% + 24px)',
          height: 'calc(100% + 24px)',
          border: '3px solid hsl(42 100% 54% / 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Wheel container */}
      <div
        ref={wheelRef}
        className="wheel-container relative"
        style={{ willChange: 'transform' }}
      >
        <canvas
          ref={canvasRef}
          width={340}
          height={340}
          className="rounded-full block"
          style={{ maxWidth: '100%' }}
        />
      </div>
    </div>
  );
}
