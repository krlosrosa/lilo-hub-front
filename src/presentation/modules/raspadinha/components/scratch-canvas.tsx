import { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCanvasProps {
  width: number;
  height: number;
  onComplete: () => void;
  threshold?: number;
}

export function ScratchCanvas({ width, height, onComplete, threshold = 50 }: ScratchCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const hasCompleted = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw scratch overlay
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#d4a017');
    gradient.addColorStop(0.5, '#f0c040');
    gradient.addColorStop(1, '#d4a017');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add decorative text
    ctx.fillStyle = '#b8860b';
    ctx.font = 'bold 18px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨ RASPE AQUI ✨', width / 2, height / 2 - 12);
    ctx.font = '13px system-ui';
    ctx.fillText('Descubra seu prêmio!', width / 2, height / 2 + 14);

    // Add subtle pattern
    ctx.strokeStyle = 'rgba(184, 134, 11, 0.3)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height, height);
      ctx.stroke();
    }
  }, [width, height]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const scratch = useCallback((x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const checkCompletion = useCallback(() => {
    if (hasCompleted.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    let cleared = 0;
    const total = imageData.data.length / 4;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    const pct = (cleared / total) * 100;
    if (pct >= threshold) {
      hasCompleted.current = true;
      onComplete();
    }
  }, [width, height, threshold, onComplete]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsScratching(false);
    checkCompletion();
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="absolute inset-0 cursor-pointer touch-none"
      style={{ width: '100%', height: '100%' }}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}
