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
  let interval: ReturnType<typeof setInterval>;
  let achievementInterval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      gameStore.addCoins(automationStore.totalCps);
      if (gameStore.automaticSave) {
        checkDataAndSave("gameStore", gameStore);
        checkDataAndSave("automationStore", automationStore);
        checkDataAndSave("achievementStore", useAchievementStore());
        checkDataAndSave("upgradeStore", upgradeStore);
      }
    }, 1000);
    achievementInterval = setInterval(() => {
      const achievements = useAchievementStore();
      achievements.evaluateAll({ gameStore, automationStore, upgradeStore });
    }, 100);
  });
  onUnmounted(() => {
    clearInterval(interval);
    clearInterval(achievementInterval);
  });
}
