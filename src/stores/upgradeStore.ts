import { defineStore } from "pinia";

interface UpgradeDefinition {
  id: number;
  emoji: string;
  name: string;
  description: string;
  cost: number;
  label: string;
  effect: "multiplier" | "additive";
  value: number;
}

const UPGRADES_CATALOG: UpgradeDefinition[] = [
  {
    id: 1,
    emoji: "\u{1F9F0}",
    name: "Lepší nástroje",
    description: "Zvyšte efektivitu vašich kliků!",
    cost: 50,
    label: "+1 klik",
    effect: "additive",
    value: 1,
  },
  {
    id: 2,
    emoji: "\u{1FAD8}",
    name: "Lepší zrnka kávy",
    description: "Zvyšte kvalitu vaší kávy!",
    cost: 50,
    label: "1,5x kliknutí",
    effect: "multiplier",
    value: 1.5,
  },
];

export const useUpgradeStore = defineStore("upgrades", {
  state: () => ({
    upgrades: UPGRADES_CATALOG,
    ownedUpgrades: [] as number[],
  }),

  actions: {
    purchaseUpgrade(upgradeId: number) {
      const upgrade = this.upgrades.find((u) => u.id === upgradeId);
      if (upgrade && !this.ownedUpgrades.includes(upgrade.id)) {
        this.ownedUpgrades.push(upgrade.id);
      }
    },
    isOwned(upgradeId: number) {
      return this.ownedUpgrades.includes(upgradeId);
    },
  },
});
