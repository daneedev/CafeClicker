import { onMounted, onUnmounted } from "vue";
import { useAutomationStore } from "../stores/automationStore";
import { useGameStore } from "../stores/gameStore";
import { useAchievementStore } from "../stores/achievementStore";

export function useGameLoop() {
  const gameStore = useGameStore();
  const automationStore = useAutomationStore();
  let interval: ReturnType<typeof setInterval>;
  let achievementInterval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      gameStore.addCoins(automationStore.totalCps);
    }, 1000);
    achievementInterval = setInterval(() => {
      const achievements = useAchievementStore();
      achievements.evaluateAll({ gameStore, automationStore });
    }, 100);
  });
  onUnmounted(() => {
    clearInterval(interval);
    clearInterval(achievementInterval);
  });
}
