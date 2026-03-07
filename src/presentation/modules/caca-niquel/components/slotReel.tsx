import { motion } from "framer-motion";
import { Partner, partners } from "../data/mock";
import PartnerCard from "./partenCard";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SLOT_HEIGHT_PX = 100;
const LOOPS = 3; // voltas completas antes de parar
const STRIP_COPIES = 4; // cópias da lista para rolagem longa

interface SlotReelProps {
  spinning: boolean;
  result: Partner | null;
  stopDelay: number;
  highlight?: boolean;
}

/** Faixa vertical repetida para rolagem contínua estilo caça-níquel */
const STRIP = Array.from({ length: STRIP_COPIES }, () => [...partners]).flat();

const SlotReel = ({ spinning, result, stopDelay, highlight }: SlotReelProps) => {
  const resultIndex = result != null ? partners.findIndex((p) => p.id === result.id) : 0;

  // Posição atual da faixa; ao girar, anima desta posição até o resultado
  const [targetY, setTargetY] = useState(0);
  const targetYRef = useRef(0);
  const stripRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    targetYRef.current = targetY;
  }, [targetY]);

  useEffect(() => {
    if (spinning && result) {
      const idx = partners.findIndex((p) => p.id === result.id);
      if (idx >= 0) {
        const finalY = -(partners.length * LOOPS + idx) * SLOT_HEIGHT_PX;
        if (targetYRef.current > finalY) {
          requestAnimationFrame(() => setTargetY(finalY));
        }
      }
    } else {
      const y = result != null ? -(resultIndex * SLOT_HEIGHT_PX) : 0;
      queueMicrotask(() => setTargetY(y));
    }
  }, [spinning, result, resultIndex]);

  const isStopped = !spinning;
  // Sempre usar targetY: ao parar fica onde a animação terminou
  const currentY = targetY;

  return (
    <div
      className={`reel-window overflow-hidden transition-all duration-300 ${highlight && isStopped ? "border-primary ring-2 ring-primary/40" : ""}`}
      style={{ height: SLOT_HEIGHT_PX }}
    >
      <motion.div
        ref={stripRef}
        className="flex flex-col w-full"
        initial={false}
        animate={{ y: currentY }}
        transition={{
          type: "tween",
          duration: isStopped ? 0 : stopDelay / 1000,
          ease: [0.22, 0.61, 0.36, 1], // ease-out forte: começa rápido, desacelera no fim
        }}
      >
        {STRIP.map((partner, i) => (
          <div
            key={`${partner.id}-${i}`}
            className="shrink-0 w-full"
            style={{ height: SLOT_HEIGHT_PX, minHeight: SLOT_HEIGHT_PX }}
          >
            <PartnerCard
              partner={partner}
              highlight={highlight && isStopped && result?.id === partner.id}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlotReel;
