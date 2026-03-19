<template>
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="stats">
      <div class="stats-item">
        <p>{{ gameStore.coins }}</p>
        <img src="/img/coin.svg" alt="coin" class="coin-icon" />
      </div>
      <div class="stats-item">
        <p class="income">{{ gameStore.coinsPerSecond }}/s</p>
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
          :key="item.id"
          :emoji="item.emoji"
          :title="item.name"
          :description="item.description"
          :badge="'Lvl ' + item.level"
          :price="item.cost"
          :production="item.cps.toFixed(2)"
        />
      </section>
      <section class="achievements">
        <h2>Ocenění</h2>
        <p>Brzy přidáme možnost získat ocenění za vaše kávové úspěchy!</p>
      </section>
      <section class="upgrades">
        <h2>Vylepšení</h2>
        <p>Brzy přidáme možnost vylepšit vaši kávovou produkci!</p>
        <StoreItem
          emoji="&#x1FAD8;"
          title="Lepší zrnka kávy"
          description="Zvyšte kvalitu vaší kávy!"
          :price="100"
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
const automationStore = useAutomationStore();
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
  padding: 2rem;
}

.click-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.automation {
  display: flex;
  flex-direction: column;
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
