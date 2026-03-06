"use client";
import { rewards, userProfile, STORE_NAME } from "../data/mock";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/presentation/shared/components/ui/button";
import PointsProgress from "../components/pointsProgress";
import { QRCodeSVG } from "qrcode.react";

const RewardDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const reward = rewards.find((r) => r.id === id);
  const [redeemed, setRedeemed] = useState(false);

  if (!reward) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Recompensa não encontrada.</p>
      </div>
    );
  }

  const canRedeem = userProfile.points >= reward.pointsCost;
  const redeemCode = `RWD-${id}-${new Date().getTime().toString(36).toUpperCase().slice(-4)}`;
  const qrValue = JSON.stringify({
    type: "redeem_reward",
    rewardId: reward.id,
    rewardName: reward.name,
    code: redeemCode,
    userId: "usr_marina_001",
    store: STORE_NAME,
    pointsCost: reward.pointsCost,
  });

  return (
    <div className="pb-24">
      {/* Back button */}
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-background/80 backdrop-blur-lg px-4 py-3">
        <button
          onClick={() => router.back() as any}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-card shadow-card"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="text-base font-bold text-foreground">Detalhes</h1>
      </div>

      <div className="mx-auto max-w-lg px-4">
        {/* Image area */}
        <div className="flex items-center justify-center rounded-2xl bg-secondary py-12 text-7xl animate-scale-in">
          {reward.image}
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              {reward.category}
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground">{reward.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reward.description}</p>
          </div>

          {/* Points needed */}
          <div className="rounded-xl bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pontos necessários</span>
              <span className="text-xl font-bold text-gold">{reward.pointsCost} pts</span>
            </div>
            <div className="mt-3">
              <PointsProgress
                current={Math.min(userProfile.points, reward.pointsCost)}
                target={reward.pointsCost}
                label={canRedeem ? "Você pode resgatar!" : `Faltam ${reward.pointsCost - userProfile.points} pontos`}
              />
            </div>
          </div>

          {/* Redeem button / QR Code result */}
          {redeemed ? (
            <div className="rounded-2xl bg-card p-6 text-center shadow-elevated animate-scale-in">
              <h3 className="text-lg font-bold text-foreground">Resgatado com sucesso! 🎉</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Apresente o QR Code abaixo no balcão para validar
              </p>

              <div className="mt-5 inline-flex rounded-2xl border-4 border-accent/20 bg-card p-4">
                <QRCodeSVG
                  value={qrValue}
                  size={180}
                  level="M"
                  fgColor="hsl(220, 20%, 14%)"
                  bgColor="transparent"
                />
              </div>

              <div className="mt-4 rounded-xl bg-gold-light p-3">
                <p className="text-xs font-medium text-muted-foreground">Código de resgate</p>
                <p className="mt-0.5 font-mono text-base font-bold text-foreground tracking-wider">
                  {redeemCode}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse" />
                Aguardando validação • Válido por 7 dias
              </div>
            </div>
          ) : (
            <Button
              onClick={() => canRedeem && setRedeemed(true)}
              disabled={!canRedeem}
              className={`w-full py-6 text-base font-bold ${
                canRedeem
                  ? "gradient-gold text-primary-foreground hover:opacity-90 animate-pulse-gold"
                  : ""
              }`}
              size="lg"
            >
              {canRedeem ? (
                <>Resgatar por {reward.pointsCost} pontos</>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Pontos insuficientes
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardDetail;
