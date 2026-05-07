<template>
  <article>
    <h2>Statistika</h2>
    <section class="stats">
      <div class="stats-item">
        <p class="stats-title">Počet mincí</p>
        <div class="stats-text">
          <p>
            {{ coins }}
          </p>
          <img src="/img/coin.svg" alt="coin" class="coin-icon" />
        </div>
      </div>
      <div class="stats-item">
        <p class="stats-title">Příjem</p>
        <div class="stats-text">
          <p>{{ coinsPerSecond }}</p>
          <img src="/img/coin.svg" alt="coin" class="coin-icon" />
          <p>/s</p>
        </div>
      </div>
      <div class="stats-item">
        <p class="stats-title">Celkové kliky</p>
        <p class="stats-text" v-if="gameStore.totalClicks > 0">
          {{ totalClicks }} kliků
        </p>
        <p class="stats-text" v-else>Žádné kliky zatím...</p>
      </div>
      <div class="stats-item">
        <p class="stats-title">Počet automatizací</p>
        <p class="stats-text">
          {{ automationStore.totalAutomations }}
        </p>
      </div>
      <div class="stats-item">
        <p class="stats-title">Počet vylepšení</p>
        <p class="stats-text">
          {{ upgradeStore.totalUpgrades }}
        </p>
      </div>
      <div class="stats-item">
        <p class="stats-title">Ocenění</p>
        <p class="stats-text">
          {{ achievementStore.unlockedAchievements.length }}/{{
            achievementStore.achievements.length
          }}
        </p>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { nfEn } from "../composables/priceFormatting";
import { useGameStore } from "../stores/gameStore";
import { useAutomationStore } from "../stores/automationStore";
import { useUpgradeStore } from "../stores/upgradeStore";
import { useAchievementStore } from "../stores/achievementStore";
import { computed } from "vue";
const gameStore = useGameStore();
const automationStore = useAutomationStore();
const upgradeStore = useUpgradeStore();
const achievementStore = useAchievementStore();

const coins = computed(() => nfEn.format(gameStore.coins));
const coinsPerSecond = computed(() => nfEn.format(gameStore.coinsPerSecond));
const totalClicks = computed(() => nfEn.format(gameStore.totalClicks));
</script>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid #c4c0b3;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f5f0e0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 15rem);
  gap: 1rem;
}

.stats-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: 1px solid #c4c0b3;
  border-radius: 8px;
  padding: 0.5rem;
}

.stats-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.stats-text {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.5rem;
}

.coin-icon {
  width: 20px;
  height: 20px;
}
</style>
