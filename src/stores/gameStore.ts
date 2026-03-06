import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    coins: 0,
    totalClicks: 0,
    coinsPerSecond: 0,
  }),
  actions: {
    addCoins(amount: number) {
      this.coins += amount;
    },
    addClick() {
      this.totalClicks++;
    },
    setCoinsPerSecond(amount: number) {
      this.coinsPerSecond = amount;
    },
  },
});
