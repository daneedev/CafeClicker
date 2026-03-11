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
          emoji="&#x1F3EB;"
          title="Barista"
          badge="Lvl 1"
          description="Základní pomocník pro vaši kavárnu!"
          :production="1"
          :price="20"
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
</script>
