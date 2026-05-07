<template>
  <Toast />
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="actions">
      <Button
        title="Ocenění"
        icon="fa-trophy"
        icon-type="font-awesome"
        @click="achievementsModal = true"
      />
      <Button
        title="Nastavení"
        icon="fa-gear"
        icon-type="font-awesome"
        @click="settingsModal = true"
      />
    </section>
    <Button
      @click="menuOpen = !menuOpen"
      icon="fa-bars"
      icon-type="font-awesome"
      class="hamburger"
    />
  </header>
  <Transition name="slide">
    <nav v-if="menuOpen" class="mobile-menu">
      <Button
        icon="fa-xmark"
        icon-type="font-awesome"
        class="close-hamburger"
        @click="menuOpen = false"
      />
      <Button
        title="Ocenění"
        icon="fa-trophy"
        icon-type="font-awesome"
        @click="
          achievementsModal = true;
          menuOpen = false;
        "
      />
      <Button
        title="Nastavení"
        icon="fa-gear"
        icon-type="font-awesome"
        @click="
          settingsModal = true;
          menuOpen = false;
        "
      />
    </nav>
  </Transition>
  <div v-if="menuOpen" class="menu-overlay" @click="menuOpen = false" />
  <main>
    <Modal v-model:is-open="settingsModal">
      <h2>Nastavení</h2>
      <div class="info-cards">
        <InfoCard title="Automatické ukládání">
          <Switch v-model="autoSave" />
        </InfoCard>
        <InfoCard title="Offline výdělky">
          <Switch v-model="offlineEarnings" />
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
        <InfoCard title="Verze" :value="version" />
        <Button
          title="Uložit hru"
          icon="fa-save"
          icon-type="font-awesome"
          @click="saveAllData"
        />
        <Button
          title="Smazat data"
          icon="fa-trash"
          icon-type="font-awesome"
          @click="deleteAllData"
        />
      </div>
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
      <Modal v-model:is-open="achievementsModal">
        <h2>Ocenění</h2>
        <p>Získejte ocenění za vaše kávové úspěchy!</p>
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
      </Modal>
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
import Toast from "./components/Toast.vue";
import { useUpgradeStore } from "./stores/upgradeStore";
import { useAutomationStore } from "./stores/automationStore";
import { useGameLoop } from "./composables/useGameLoop";
import { version } from "../package.json";
import { useToastStore } from "./stores/toastStore";

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
const offlineEarnings = computed({
  get() {
    return gameStore.offlineEarnings;
  },
  set(value: boolean) {
    gameStore.offlineEarnings = value;
    saveAllData();
  },
});
const achievementsModal = ref(false);
const menuOpen = ref(false);

useGameLoop();

onMounted(() => {
  const savedGame = loadFromLocalStorage<typeof gameStore.$state>("gameStore");
  if (savedGame) {
    Object.assign(gameStore.$state, savedGame);
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

  if (gameStore.offlineEarnings) {
    const toastStore = useToastStore();
    const timeOfLastSave = Number(localStorage.getItem("lastSaved"));
    const now = Date.now();
    if (timeOfLastSave && now - timeOfLastSave > 1000) {
      const offlineSeconds = Math.floor((now - timeOfLastSave) / 1000);
      const offlineEarnings = offlineSeconds * gameStore.coinsPerSecond;
      if (offlineEarnings > 0) {
        gameStore.addCoins(offlineEarnings);
      }
      toastStore.show(
        {
          emoji: "⏰",
          title: "Offline zisk",
          description: `Získali jste ${nfEn.format(offlineEarnings)} mincí zatímco jste byli pryč!`,
        },
        5000,
      );
    }
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

.game-header .actions {
  display: flex;
  gap: 1rem;
}

.hamburger {
  display: none;
}
.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 220px;
  background-color: var(--accent-color);
  border-left: 2px solid var(--secondary-color);
  z-index: 200;
  padding: 1rem;
}

.close-hamburger {
  align-self: flex-end;
}

.menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 199;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

@media (max-width: 600px) {
  .game-header .actions {
    display: none;
  }
  .hamburger {
    display: block;
  }
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

@media (max-width: 1200px) {
  .main-section {
    flex-direction: column;
    width: 90%;
  }
}

@media (max-width: 1050px) {
  .grid-container {
    width: 90%;
  }
}

@media (max-width: 850px) {
  .grid-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .achievements-container {
    grid-template-columns: 1fr;
  }
  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>
