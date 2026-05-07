<template>
  <article>
    <h2>Statistika</h2>
    <section class="stats">
      <InfoCard
        :title="'Počet mincí'"
        :value="coins"
        :icon-src="'/img/coin.svg'"
        :icon-type="'image'"
      />
      <InfoCard
        :title="'Příjem/s'"
        :value="coinsPerSecond"
        :icon-src="'/img/coin.svg'"
        :icon-type="'image'"
      />
      <InfoCard :title="'Celkové kliky'" :value="totalClicks" />
      <InfoCard
        :title="'Počet automatizací'"
        :value="automationStore.totalAutomations"
      />
      <InfoCard
        :title="'Počet vylepšení'"
        :value="upgradeStore.totalUpgrades"
      />
      <InfoCard
        :title="'Ocenění'"
        :value="`${achievementStore.unlockedAchievements.length}/${achievementStore.achievements.length}`"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { nfEn } from "../composables/priceFormatting";
import { useGameStore } from "../stores/gameStore";
import { useAutomationStore } from "../stores/automationStore";
import { useUpgradeStore } from "../stores/upgradeStore";
import { useAchievementStore } from "../stores/achievementStore";
import InfoCard from "./InfoCard.vue";
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

@media (max-width: 550px) {
  article {
    width: 100%;
  }
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
