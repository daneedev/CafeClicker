import { defineStore } from "pinia";
import upgradesData from "../data/upgrades.json";
import { nfEn } from "../composables/priceFormatting";

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

const UPGRADES_CATALOG = upgradesData as UpgradeDefinition[];

export const useUpgradeStore = defineStore("upgrades", {
  state: () => ({
    upgrades: UPGRADES_CATALOG.map((upgrade) => ({
      ...upgrade,
      costFormatted: nfEn.format(upgrade.cost),
    })),
    ownedUpgrades: [] as number[],
  }),
  getters: {
    totalUpgrades(): number {
      return this.ownedUpgrades.length;
    },
  },
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
