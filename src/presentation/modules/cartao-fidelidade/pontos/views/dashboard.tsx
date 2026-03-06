"use client";
import { userProfile, rewards, LEVELS, achievements, STORE_NAME } from "../data/mock";
import LevelBadge from "../components/levalBadge";
import PointsProgress from "../components/pointsProgress";
import RewardCard from "../components/rewardCard";
import NotificationBanner from "../components/notificationsBarnner";
import { ChevronRight, Trophy, Target } from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  const levelInfo = LEVELS[userProfile.level];
  const nextReward = rewards
    .filter((r) => r.pointsCost > userProfile.points)
    .sort((a, b) => a.pointsCost - b.pointsCost)[0];
  const redeemableRewards = rewards.filter((r) => r.pointsCost <= userProfile.points);
  const popularRewards = rewards.filter((r) => r.popular);
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="gradient-hero px-4 pb-8 pt-10 text-primary-foreground">
        <div className="mx-auto max-w-lg">
          <p className="text-sm font-medium opacity-90">{STORE_NAME}</p>
          <h1 className="mt-1 text-xl font-bold">Olá, {userProfile.name.split(" ")[0]}! 👋</h1>

          {/* Points Card */}
          <div className="mt-5 rounded-2xl bg-card p-5 shadow-elevated animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Seus pontos</p>
                <p className="mt-1 text-3xl font-extrabold text-foreground">
                  {userProfile.points.toLocaleString("pt-BR")}
                </p>
              </div>
              <LevelBadge level={userProfile.level} />
            </div>

            {/* Progress to next level */}
            {levelInfo.nextLevel && levelInfo.nextLevelMin && (
              <div className="mt-4">
                <PointsProgress
                  current={userProfile.totalPointsEarned}
                  target={levelInfo.nextLevelMin}
                  label={`Próximo nível: ${LEVELS[levelInfo.nextLevel].label}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification */}
      <div className="mx-auto -mt-2 max-w-lg">
        <NotificationBanner />
      </div>

      {/* Next reward progress */}
      {nextReward && (
        <div className="mx-auto mt-2 max-w-lg px-4">
          <Link
            href={`/rewards/${nextReward.id}`}
            className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card transition-all hover:shadow-elevated"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-2xl">
              {nextReward.image}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-muted-foreground">Próxima recompensa</p>
              <p className="text-sm font-bold text-foreground">{nextReward.name}</p>
              <div className="mt-1.5">
                <PointsProgress current={userProfile.points} target={nextReward.pointsCost} />
              </div>
            </div>
            <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
          </Link>
        </div>
      )}

      {/* Quick stats */}
      <div className="mx-auto mt-4 max-w-lg px-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{redeemableRewards.length}</p>
              <p className="text-xs text-muted-foreground">Disponíveis</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-light text-gold">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{unlockedAchievements}/{achievements.length}</p>
              <p className="text-xs text-muted-foreground">Conquistas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popular rewards */}
      <div className="mx-auto mt-6 max-w-lg px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Destaques</h2>
          <Link href="/rewards" className="text-sm font-medium text-primary hover:underline">
            Ver tudo
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {popularRewards.map((r) => (
            <RewardCard key={r.id} reward={r} userPoints={userProfile.points} />
          ))}
        </div>
      </div>

      {/* Motivational */}
      <div className="mx-auto mt-6 max-w-lg px-4">
        <div className="rounded-xl bg-card p-4 text-center shadow-card">
          <p className="text-2xl">🚀</p>
          <p className="mt-2 text-sm font-semibold text-foreground">Continue assim!</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Você já acumulou {userProfile.totalPointsEarned.toLocaleString("pt-BR")} pontos desde {userProfile.memberSince}.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
