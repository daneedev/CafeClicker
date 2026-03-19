import { defineStore } from "pinia";

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

const AUTOMATION_CATALOG: AutomationDefinition[] = [
  {
    id: 1,
    emoji: "🏫",
    name: "Barista",
    description: "Základní pomocník pro vaši kavárnu.",
    baseCost: 20,
    baseCps: 1,
    costMultiplier: 1.15,
    cpsMultiplier: 1.05,
  },
  {
    id: 2,
    emoji: "☕",
    name: "Espresso stroj",
    description: "Automatizuje přípravu espressa.",
    baseCost: 125,
    baseCps: 6,
    costMultiplier: 1.17,
    cpsMultiplier: 1.07,
  },
  {
    id: 3,
    emoji: "🔥",
    name: "Pražírna",
    description: "Zvyšuje produkci díky lepším zrnům.",
    baseCost: 750,
    baseCps: 32,
    costMultiplier: 1.2,
    cpsMultiplier: 1.08,
  },
];

function createInitialOwnedLevels(): OwnedLevels {
  return {
    1: 0,
    2: 0,
    3: 0,
  };
}

export const useAutomationStore = defineStore("automation", {
  state: () => ({
    catalog: AUTOMATION_CATALOG,
    ownedLevels: createInitialOwnedLevels() as OwnedLevels,
  }),
  getters: {
    automationCatalog(state) {
      const catalog = state.catalog.map((automation) => {
        const level = state.ownedLevels[automation.id] || 0;
        const cost = Math.floor(
          automation.baseCost * Math.pow(automation.costMultiplier, level),
        );
        const cps = (
          automation.baseCps * Math.pow(automation.cpsMultiplier, level)
        ).toFixed(2);
        return {
          ...automation,
          level,
          cost,
          cps,
        };
      });
      return catalog;
    },
  },
});
