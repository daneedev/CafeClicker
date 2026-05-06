<template>
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="stats">
      <div class="stats-item">
        <p>{{ gameStore.coins.toFixed(2) }}</p>
        <img src="/img/coin.svg" alt="coin" class="coin-icon" />
      </div>
      <div class="stats-item">
        <p class="income">{{ gameStore.coinsPerSecond.toFixed(2) }}/s</p>
      </div>
    </section>
  </header>
  <main>
    <div class="grid-container">
      <section class="click-box">
        <ClickButton />
      </section>
      <section class="automation">
        <h2>Automatizace</h2>
        <p>Brzy přidáme možnost automatizace výroby kávy!</p>
        <StoreItem
          v-for="item in automationStore.automationCatalog"
          :id="`automation-${item.id}`"
          :key="`automation-${item.id}`"
          :emoji="item.emoji"
          :title="item.name"
          :description="item.description"
          :badge="'Lvl ' + item.level"
          :price="item.cost"
          :type="'automation'"
          :production="`+ ${item.cps.toFixed(2)}/s`"
        />
      </section>
      <section class="achievements">
        <h2>Ocenění</h2>
        <p>Brzy přidáme možnost získat ocenění za vaše kávové úspěchy!</p>
        <div class="achievements-container">
          <StoreItem
            v-for="achievement in achievementStore.achievements"
            :id="`achievement-${achievement.id}`"
            :key="`achievement-${achievement.id}`"
            :emoji="'🏆'"
            :title="achievement.name"
            :production="achievement.description"
            :badge="
              achievementStore.isUnlocked(achievement.id)
                ? 'Odemčeno'
                : 'Zamčeno'
            "
            :badgeIcon="
              achievementStore.isUnlocked(achievement.id) ? 'check' : 'lock'
            "
          />
        </div>
      </section>
      <section class="upgrades">
        <h2>Vylepšení</h2>
        <p>Brzy přidáme možnost vylepšit vaši kávovou produkci!</p>
        <StoreItem
          v-for="item in upgradeStore.upgrades"
          :id="`upgrade-${item.id}`"
          :key="`upgrade-${item.id}`"
          :emoji="item.emoji"
          :title="item.name"
          :production="item.label"
          :description="item.description"
          :price="item.cost"
          :type="'upgrade'"
          :badge="upgradeStore.isOwned(item.id) ? 'Zakoupeno' : ''"
          :badge-icon="upgradeStore.isOwned(item.id) ? 'check' : ''"
          :disabled="upgradeStore.isOwned(item.id)"
        />
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import "./style.css";
import StoreItem from "./components/StoreItem.vue";
import ClickButton from "./components/ClickButton.vue";

import { useGameStore } from "./stores/gameStore";
const gameStore = useGameStore();

import { useAutomationStore } from "./stores/automationStore";
import { useGameLoop } from "./composables/useGameLoop";
const automationStore = useAutomationStore();

import { useUpgradeStore } from "./stores/upgradeStore";
const upgradeStore = useUpgradeStore();

import { useAchievementStore } from "./stores/achievementStore";
import { onMounted } from "vue";
import { loadFromLocalStorage } from "./composables/localStorageManager";
const achievementStore = useAchievementStore();

useGameLoop();

onMounted(() => {
  const savedGame = loadFromLocalStorage<typeof gameStore.$state>("gameStore");
  if (savedGame) {
    gameStore.coins = savedGame.coins;
    gameStore.totalClicks = savedGame.totalClicks;
    gameStore.coinsPerSecond = savedGame.coinsPerSecond;
  }
  const savedAutomation =
    loadFromLocalStorage<typeof automationStore.$state>("automationStore");
  if (savedAutomation) {
    automationStore.ownedLevels = savedAutomation.ownedLevels;
  }
  const savedUpgrades =
    loadFromLocalStorage<typeof upgradeStore.$state>("upgradeStore");
  if (savedUpgrades) {
    upgradeStore.ownedUpgrades = savedUpgrades.ownedUpgrades;
  }
  const savedAchievements =
    loadFromLocalStorage<typeof achievementStore.$state>("achievementStore");
  if (savedAchievements) {
    achievementStore.unlocked = savedAchievements.unlocked;
  }
});
</script>

<style scoped>
.game-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--secondary-color);
  padding: 1rem 5rem;
  background-color: var(--accent-color);
}

.game-header h1 {
  color: var(--primary-color);
  font-weight: 700;
}

.game-header .stats {
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
}

.game-header .stats-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-header .coin-icon {
  width: 24px;
  height: 24px;
  margin-left: 0.5rem;
}

.game-header .stats-item p {
  font-size: 1.5rem;
  font-weight: bold;
}

.game-header .stats-item .income {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-left: 0.5rem;
}

main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.grid-container {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem;
}

.click-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.automation,
.upgrades,
.achievements {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.achievements-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

@media (max-width: 700px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 550px) {
  .grid-container {
    width: 95%;
    padding: 1rem;
  }
}
</style>
