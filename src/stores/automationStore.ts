import { defineStore } from "pinia";
import automationsData from "../data/automations.json";
import { nfEn } from "../composables/priceFormatting";

type AutomationDefinition = {
  id: number;
  emoji: string;
  name: string;
  description: string;
  baseCost: number;
  baseCps: number;
  costMultiplier: number;
  cpsMultiplier: number;
};

type OwnedLevels = Record<AutomationDefinition["id"], number>;

const AUTOMATION_CATALOG = automationsData as AutomationDefinition[];

function createInitialOwnedLevels(
  catalog: AutomationDefinition[],
): OwnedLevels {
  const levels: Partial<OwnedLevels> = {};
  for (const item of catalog) {
    levels[item.id] = 0;
  }
  return levels as OwnedLevels;
}

export const useAutomationStore = defineStore("automation", {
  state: () => ({
    catalog: AUTOMATION_CATALOG,
    ownedLevels: createInitialOwnedLevels(AUTOMATION_CATALOG),
  }),
  getters: {
    automationCatalog(state) {
      const catalog = state.catalog.map((automation) => {
        const level = state.ownedLevels[automation.id] || 0;
        const cost = Math.floor(
          automation.baseCost * Math.pow(automation.costMultiplier, level),
        );
        const costFormatted = nfEn.format(cost);
        const cps =
          level === 0
            ? 0
            : automation.baseCps *
              Math.pow(automation.cpsMultiplier, level - 1);
        return {
          ...automation,
          level,
          cost,
          costFormatted,
          cps,
        };
      });
      return catalog;
    },
    totalCps(): number {
      return this.automationCatalog.reduce((sum, item) => sum + item.cps, 0);
    },
    totalAutomations(): number {
      return Object.entries(this.ownedLevels).filter(([_, level]) => level > 0)
        .length;
    },
  },
  actions: {
    levelUp(automationId: number) {
      const currentLevel = this.ownedLevels[automationId] || 0;
      this.ownedLevels[automationId] = currentLevel + 1;
    },
  },
});
