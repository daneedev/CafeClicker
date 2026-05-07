import { defineStore } from "pinia";
import { useGameStore } from "./gameStore";

export interface Achievement {
  id: number;
  name: string;
  description: string;
  check: (ctx: AchievementCheckContext) => boolean;
  unlockedAt?: string;
}

export type AchievementCheckContext = Record<string, any>;

export const achievements: Achievement[] = [
  {
    id: 1,
    name: "První mince",
    description: "Získej první minci",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 1;
    },
  },
  {
    id: 2,
    name: "CPS 100",
    description: "Dosáhni 100 mincí za sekundu",
    check: (ctx) => {
      const automation = ctx.automationStore;
      return (automation?.totalCps ?? 0) >= 100;
    },
  },
  {
    id: 3,
    name: "Kafíčkař",
    description: "Měj alespoň 100 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 100;
    },
  },
  {
    id: 4,
    name: "Kávová hromádka",
    description: "Měj alespoň 1 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 1_000;
    },
  },
  {
    id: 5,
    name: "Pokladna praská",
    description: "Měj alespoň 10 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 10_000;
    },
  },
  {
    id: 6,
    name: "Solidní rozpočet",
    description: "Měj alespoň 100 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 100_000;
    },
  },
  {
    id: 7,
    name: "Milionová směna",
    description: "Měj alespoň 1 000 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 1_000_000;
    },
  },
  {
    id: 8,
    name: "Kávový magnát",
    description: "Měj alespoň 10 000 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 10_000_000;
    },
  },
  {
    id: 9,
    name: "Kávové impérium",
    description: "Měj alespoň 100 000 000 mincí",
    check: (ctx) => {
      const game = ctx.gameStore ?? useGameStore();
      return (game.coins ?? 0) >= 100_000_000;
    },
  },
  {
    id: 10,
    name: "CPS 10",
    description: "Dosáhni 10 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 10,
  },
  {
    id: 11,
    name: "CPS 50",
    description: "Dosáhni 50 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 50,
  },
  {
    id: 12,
    name: "CPS 250",
    description: "Dosáhni 250 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 250,
  },
  {
    id: 13,
    name: "CPS 500",
    description: "Dosáhni 500 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 500,
  },
  {
    id: 14,
    name: "CPS 1k",
    description: "Dosáhni 1 000 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 1_000,
  },
  {
    id: 15,
    name: "CPS 5k",
    description: "Dosáhni 5 000 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 5_000,
  },
  {
    id: 16,
    name: "CPS 10k",
    description: "Dosáhni 10 000 mincí za sekundu",
    check: (ctx) => (ctx.automationStore?.totalCps ?? 0) >= 10_000,
  },
  {
    id: 17,
    name: "Klik 10",
    description: "Klikni 10×",
    check: (ctx) => (ctx.gameStore?.totalClicks ?? 0) >= 10,
  },
  {
    id: 18,
    name: "Klik 100",
    description: "Klikni 100×",
    check: (ctx) => (ctx.gameStore?.totalClicks ?? 0) >= 100,
  },
  {
    id: 19,
    name: "Klik 1k",
    description: "Klikni 1 000×",
    check: (ctx) => (ctx.gameStore?.totalClicks ?? 0) >= 1_000,
  },
  {
    id: 20,
    name: "Klik 10k",
    description: "Klikni 10 000×",
    check: (ctx) => (ctx.gameStore?.totalClicks ?? 0) >= 10_000,
  },
  {
    id: 21,
    name: "První automatizace",
    description: "Kup si první automatizaci",
    check: (ctx) => {
      const automation = ctx.automationStore;
      if (!automation) return false;
      return Object.values(automation.ownedLevels ?? {}).some(
        (lvl) => Number(lvl) > 0,
      );
    },
  },
  {
    id: 22,
    name: "Základní výbava",
    description: "Kup první 4 upgrady",
    check: (ctx) => {
      const owned: number[] = ctx.upgradeStore?.ownedUpgrades ?? [];
      const required = [1, 2, 3, 4];
      return required.every((id) => owned.includes(id));
    },
  },
  {
    id: 23,
    name: "Specialista",
    description: "Dostaň libovolnou automatizaci na level 25",
    check: (ctx) => {
      const automation = ctx.automationStore;
      if (!automation) return false;
      return Object.values(automation.ownedLevels ?? {}).some(
        (lvl) => Number(lvl) >= 25,
      );
    },
  },
  {
    id: 24,
    name: "Manager mindset",
    description: "Kup Franchise manažera",
    check: (ctx) => {
      const automation = ctx.automationStore;
      if (!automation) return false;
      return Number(automation.ownedLevels?.[8] ?? 0) >= 1;
    },
  },
];

export const useAchievementStore = defineStore("achievements", {
  state: () => ({
    achievements: achievements,
    unlocked: [] as { id: number; unlockedAt: string }[],
  }),
  getters: {
    unlockedAchievements(state) {
      const achievements = state.achievements.filter((a) =>
        state.unlocked.find((u) => u.id === a.id),
      );
      for (const ach of achievements) {
        const unlockInfo = state.unlocked.find((u) => u.id === ach.id);
        if (unlockInfo) {
          ach.unlockedAt = unlockInfo.unlockedAt;
        }
      }
      achievements.sort((a, b) => {
        const aTime = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
        const bTime = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
        return bTime - aTime;
      });

      return achievements;
    },
    lockedAchievements(state) {
      return state.achievements.filter(
        (a) => !state.unlocked.find((u) => u.id === a.id),
      );
    },
  },
  actions: {
    unlockAchievement(id: number) {
      if (!this.unlocked.find((u) => u.id === id)) {
        this.unlocked.push({ id, unlockedAt: new Date().toISOString() });
      }
    },
    isUnlocked(id: number) {
      return !!this.unlocked.find((u) => u.id === id);
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
