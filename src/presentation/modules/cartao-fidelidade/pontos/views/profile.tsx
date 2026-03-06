"use client";
import { userProfile, LEVELS, achievements, STORE_NAME } from "../data/mock";
import LevelBadge from "../components/levalBadge";
import PointsProgress from "../components/pointsProgress";
import {  Star, Gift, Calendar } from "lucide-react";

const Profile = () => {
  const levelInfo = LEVELS[userProfile.level];

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="gradient-hero px-4 pb-10 pt-10 text-primary-foreground">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-card text-3xl font-bold text-foreground shadow-elevated">
            {userProfile.name.charAt(0)}
          </div>
          <h1 className="mt-3 text-xl font-bold">{userProfile.name}</h1>
          <p className="text-sm opacity-90">{userProfile.email}</p>
          <div className="mt-3 flex justify-center">
            <LevelBadge level={userProfile.level} />
          </div>
        </div>
      </div>

      <div className="mx-auto -mt-4 max-w-lg px-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 rounded-2xl bg-card p-4 shadow-elevated">
          <div className="text-center">
            <Star className="mx-auto h-5 w-5 text-gold" />
            <p className="mt-1 text-lg font-bold text-foreground">{userProfile.points.toLocaleString("pt-BR")}</p>
            <p className="text-[10px] text-muted-foreground">Pontos atuais</p>
          </div>
          <div className="text-center">
            <Gift className="mx-auto h-5 w-5 text-accent" />
            <p className="mt-1 text-lg font-bold text-foreground">{userProfile.rewardsRedeemed}</p>
            <p className="text-[10px] text-muted-foreground">Resgates</p>
          </div>
          <div className="text-center">
            <Calendar className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-1 text-lg font-bold text-foreground">{userProfile.memberSince}</p>
            <p className="text-[10px] text-muted-foreground">Membro desde</p>
          </div>
        </div>

        {/* Level progress */}
        {levelInfo.nextLevel && levelInfo.nextLevelMin && (
          <div className="rounded-xl bg-card p-4 shadow-card">
            <h2 className="text-sm font-bold text-foreground">Progresso de nível</h2>
            <div className="mt-3">
              <PointsProgress
                current={userProfile.totalPointsEarned}
                target={levelInfo.nextLevelMin}
                label={`${LEVELS[levelInfo.nextLevel].label} em ${levelInfo.nextLevelMin - userProfile.totalPointsEarned} pontos`}
              />
            </div>
            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
              <LevelBadge level={userProfile.level} size="sm" />
              <LevelBadge level={levelInfo.nextLevel} size="sm" />
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className="rounded-xl bg-card p-4 shadow-card">
          <h2 className="text-sm font-bold text-foreground">Conquistas</h2>
          <div className="mt-3 space-y-3">
            {achievements.map((a) => (
              <div key={a.id} className={`flex items-center gap-3 ${!a.unlocked ? "opacity-50" : ""}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-xl">
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.description}</p>
                  {!a.unlocked && (
                    <div className="mt-1">
                      <PointsProgress current={a.progress} target={a.target} />
                    </div>
                  )}
                </div>
                {a.unlocked && (
                  <span className="text-xs font-bold text-accent">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="rounded-xl bg-card p-4 text-center shadow-card">
          <p className="text-xs text-muted-foreground">
            Programa de fidelidade <span className="font-semibold text-foreground">{STORE_NAME}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
