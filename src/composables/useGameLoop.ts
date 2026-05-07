import { onMounted, onUnmounted } from "vue";
import { useAutomationStore } from "../stores/automationStore";
import { useGameStore } from "../stores/gameStore";
import { useAchievementStore } from "../stores/achievementStore";
import { checkDataAndSave } from "./localStorageManager";
import { useUpgradeStore } from "../stores/upgradeStore";

export function useGameLoop() {
  const gameStore = useGameStore();
  const automationStore = useAutomationStore();
  const upgradeStore = useUpgradeStore();
  const achievements = useAchievementStore();
  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      gameStore.addCoins(automationStore.totalCps);
      achievements.evaluateAll({ gameStore, automationStore, upgradeStore });
      if (gameStore.automaticSave) {
        checkDataAndSave("gameStore", gameStore);
        checkDataAndSave("automationStore", automationStore);
        checkDataAndSave("achievementStore", achievements);
        checkDataAndSave("upgradeStore", upgradeStore);
      }
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
}
