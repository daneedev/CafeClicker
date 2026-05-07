<template>
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="stats">
      <div class="stats-item">
        <p>{{ coins }}</p>
        <img src="/img/coin.svg" alt="coin" class="coin-icon" />
      </div>
      <div class="stats-item">
        <p class="income">{{ coinsPerSecond }}/s</p>
      </div>
    </section>
    <section class="actions">
      <Button
        title="Nastavení"
        icon="fa-gear"
        icon-type="font-awesome"
        @click="settingsModal = true"
      />
    </section>
  </header>
  <main>
    <Modal v-model:is-open="settingsModal">
      <h2>Nastavení</h2>
      <div class="info-cards">
        <InfoCard title="Automatické ukládání">
          <Switch v-model="autoSave" />
        </InfoCard>
        <InfoCard
          title="Naposledy uloženo"
          :value="
            new Date(lastSaved || Date.now()).toLocaleDateString('cs-CZ', {
              hour: '2-digit',
              minute: '2-digit',
            })
          "
        />
        <InfoCard title="Uživatel" value="N/A" />
        <InfoCard title="Verze" :value="version" />
      </div>
      <Button title="Uložit hru" @click="saveAllData" />
      <Button title="Smazat data" @click="deleteAllData" />
    </Modal>
    <section class="main-section">
      <ClickButton />
      <StatsBox />
    </section>
    <div class="grid-container">
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
          :priceFormatted="item.costFormatted"
          :type="'automation'"
          :production="`+ ${item.cps.toFixed(2)}/s`"
        />
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
          :priceFormatted="item.costFormatted"
          :type="'upgrade'"
          :badge="upgradeStore.isOwned(item.id) ? 'Zakoupeno' : ''"
          :badge-icon="upgradeStore.isOwned(item.id) ? 'check' : ''"
          :disabled="upgradeStore.isOwned(item.id)"
        />
      </section>
      <section class="achievements">
        <h2>Ocenění</h2>
        <p>Brzy přidáme možnost získat ocenění za vaše kávové úspěchy!</p>
        <div class="achievements-container">
          <AchievementItem
            v-for="item in achievementStore.unlockedAchievements"
            :id="`achievement-${item.id}`"
            :key="`achievement-${item.id}`"
            :emoji="item.emoji"
            :title="item.name"
            :description="item.description"
            :unlocked-at="item.unlockedAt"
            :disabled="false"
          />
          <AchievementItem
            v-for="item in achievementStore.lockedAchievements"
            :id="`achievement-${item.id}`"
            :key="`achievement-${item.id}`"
            :emoji="item.emoji"
            :title="item.name"
            :description="item.description"
            :disabled="true"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import "./style.css";
import StoreItem from "./components/StoreItem.vue";
import ClickButton from "./components/ClickButton.vue";
import Button from "./components/Button.vue";
import {
  clearLocalStorage,
  saveToLocalStorage,
  loadFromLocalStorage,
} from "./composables/localStorageManager";
import { nfEn } from "./composables/priceFormatting";
import { useGameStore } from "./stores/gameStore";
import { useAchievementStore } from "./stores/achievementStore";
import { computed, onMounted, ref } from "vue";
import AchievementItem from "./components/AchievementItem.vue";
import StatsBox from "./components/StatsBox.vue";
import Modal from "./components/Modal.vue";
import InfoCard from "./components/InfoCard.vue";
import Switch from "./components/Switch.vue";
import { useUpgradeStore } from "./stores/upgradeStore";
import { useAutomationStore } from "./stores/automationStore";
import { useGameLoop } from "./composables/useGameLoop";
import { version } from "../package.json";

const gameStore = useGameStore();
const automationStore = useAutomationStore();
const upgradeStore = useUpgradeStore();
const achievementStore = useAchievementStore();

function saveAllData() {
  saveToLocalStorage("gameStore", gameStore.$state);
  saveToLocalStorage("automationStore", automationStore.$state);
  saveToLocalStorage("upgradeStore", upgradeStore.$state);
  saveToLocalStorage("achievementStore", achievementStore.$state);
}

function deleteAllData() {
  clearLocalStorage();
  location.reload();
}

const coins = computed(() => nfEn.format(gameStore.coins));
const coinsPerSecond = computed(() => nfEn.format(gameStore.coinsPerSecond));
const settingsModal = ref(false);
const lastSaved = computed(() => Number(localStorage.getItem("lastSaved")));
const autoSave = computed({
  get() {
    return gameStore.automaticSave;
  },
  set(value: boolean) {
    gameStore.automaticSave = value;
    saveAllData();
  },
});

useGameLoop();

onMounted(() => {
  const savedGame = loadFromLocalStorage<typeof gameStore.$state>("gameStore");
  if (savedGame) {
    gameStore.coins = savedGame.coins;
    gameStore.totalClicks = savedGame.totalClicks;
    gameStore.coinsPerSecond = savedGame.coinsPerSecond;
    gameStore.automaticSave = savedGame.automaticSave ?? true;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.main-section {
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin: 2rem;
}

.grid-container {
  width: 70%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin: 1rem;
}

.automation,
.upgrades,
.achievements {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.achievements {
  grid-column: span 2;
}

.achievements-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-cards {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
