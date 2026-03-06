"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Clock, CalendarClock, MapPin } from "lucide-react";
import QueueProgressStepper from "../components/queueProgressStep";
import QueueReadyState from "../components/queueRedingStep";

const MOCK_DATA = {
  restaurantName: "Sabor & Arte",
  groupSize: 4,
  entryTime: "19:32",
  avgWaitTime: "35 min",
};

const STAGES = [
  { position: 5, estimatedMinutes: 25, step: 0 },
  { position: 3, estimatedMinutes: 18, step: 1 },
  { position: 1, estimatedMinutes: 8, step: 1 },
  { position: 0, estimatedMinutes: 3, step: 2 },
  { position: 0, estimatedMinutes: 0, step: 3 },
];

const Index = () => {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = STAGES[stageIndex];
  const isReady = stage.step === 3;

  // Simulate progression
  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) return;
    const timer = setTimeout(() => setStageIndex((i) => i + 1), 6000);
    return () => clearTimeout(timer);
  }, [stageIndex]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-md mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src={'https://images.vexels.com/media/users/3/142789/isolated/preview/2bfb04ad814c4995f0c537c68db5cd0b-logotipo-do-circulo-multicolorido.png'}
            alt="Logo do restaurante"
            className="w-12 h-12 rounded-xl object-contain"
          />
          <div>
            <h1 className="text-xl font-display font-bold text-foreground leading-tight">
              {MOCK_DATA.restaurantName}
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe sua fila de espera
            </p>
          </div>
        </div>

        {/* Main status card */}
        <motion.div
          className="bg-card rounded-2xl shadow-card p-6"
          layout
        >
          <AnimatePresence mode="wait">
            {isReady ? (
              <QueueReadyState key="ready" />
            ) : (
              <motion.div
                key="waiting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-6"
              >
                {/* Position highlight */}
                <div className="flex flex-col items-center">
                  <span className="text-sm text-muted-foreground font-medium mb-1">
                    Sua posição na fila
                  </span>
                  <motion.span
                    key={stage.position}
                    className="text-6xl font-display font-bold text-primary"
                    initial={{ scale: 1.3, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                  >
                    {stage.position === 0 ? "—" : `${stage.position}º`}
                  </motion.span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {stage.position > 0
                      ? `${stage.position} grupo${stage.position > 1 ? "s" : ""} à sua frente`
                      : "Sua vez está chegando!"}
                  </span>
                </div>

                {/* Estimated time */}
                <div className="flex items-center gap-2 bg-accent rounded-xl px-5 py-3">
                  <Clock className="w-5 h-5 text-accent-foreground" />
                  <div>
                    <span className="text-sm text-accent-foreground">
                      Tempo estimado
                    </span>
                    <motion.p
                      key={stage.estimatedMinutes}
                      className="text-xl font-bold text-accent-foreground"
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      ~{stage.estimatedMinutes} min
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress stepper */}
        <div className="bg-card rounded-2xl shadow-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">
            Progresso
          </h3>
          <QueueProgressStepper currentStep={stage.step} />
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3">
          <InfoCard
            icon={<Users className="w-4 h-4" />}
            label="Grupo"
            value={`${MOCK_DATA.groupSize} pessoas`}
          />
          <InfoCard
            icon={<CalendarClock className="w-4 h-4" />}
            label="Entrada na fila"
            value={MOCK_DATA.entryTime}
          />
          <InfoCard
            icon={<Clock className="w-4 h-4" />}
            label="Média de espera"
            value={MOCK_DATA.avgWaitTime}
          />
          <InfoCard
            icon={<MapPin className="w-4 h-4" />}
            label="Preferência"
            value="Área interna"
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground pt-2 pb-4">
          Esta página atualiza automaticamente.
          <br />
          Você não precisa recarregar.
        </p>
      </div>
    </div>
  );
};

const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-card rounded-xl shadow-card p-4 flex flex-col gap-1">
    <div className="flex items-center gap-1.5 text-muted-foreground">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
    <span className="text-sm font-semibold text-foreground">{value}</span>
  </div>
);

export default Index;
