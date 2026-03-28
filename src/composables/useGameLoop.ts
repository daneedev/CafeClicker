import { onMounted, onUnmounted } from "vue";
import { useAutomationStore } from "../stores/automationStore";
import { useGameStore } from "../stores/gameStore";

export function useGameLoop() {
  const gameStore = useGameStore();
  const automationStore = useAutomationStore();
  let interval: ReturnType<typeof setInterval>;

  onMounted(() => {
    interval = setInterval(() => {
      gameStore.addCoins(automationStore.totalCps);
    }, 1000);
  });
  onUnmounted(() => {
    clearInterval(interval);
  });
}
