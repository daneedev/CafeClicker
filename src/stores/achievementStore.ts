import { defineStore } from "pinia";
import { useGameStore } from "./gameStore";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  check: (ctx: AchievementCheckContext) => boolean;
}

export type AchievementCheckContext = Record<string, any>;

export const achievements: Achievement[] = [
  {
    id: 1,
    name: "First Coin",
    description: "Earn your first coin",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 1;
    },
  },
  {
    id: 2,
    name: "CPS 100",
    description: "Reach 100 coins per second",
    check: (ctx) => {
      const automation = ctx.automationStore;
      return (automation?.totalCps ?? 0) >= 100;
    },
  },
];

export const useAchievementStore = defineStore("achievements", {
  state: () => ({
    achievements: achievements,
    unlocked: [] as number[],
  }),
  actions: {
    unlockAchievement(id: number) {
      if (!this.unlocked.includes(id)) {
        this.unlocked.push(id);
      }
    },
    isUnlocked(id: number) {
      return this.unlocked.includes(id);
    },
    evaluateAll(ctx: AchievementCheckContext) {
      for (const def of achievements) {
        if (!this.isUnlocked(def.id) && def.check(ctx)) {
          this.unlockAchievement(def.id);
        }
      }
    },
  },
});
