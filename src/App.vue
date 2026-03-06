<template>
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="stats">
      <div class="stats-item">
        <p>{{ money }}</p>
        <img src="/img/coin.svg" alt="coin" class="coin-icon" />
      </div>
      <div class="stats-item">
        <p class="income">0/s</p>
      </div>
    </section>
  </header>
  <main>
    <div class="grid-container">
      <section class="click-box">
        <button class="click-button" @click="handleClick">
          Připravit kávu
        </button>
      </section>
      <section class="automation">
        <h2>Automatizace</h2>
        <p>Brzy přidáme možnost automatizace výroby kávy!</p>
        <StoreItem
          emoji="&#x1F3EB;"
          title="Barista"
          badge="Level 1"
          description="Produkce 1 káva/s"
          :price="50"
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
import { ref } from "vue";
import StoreItem from "./components/StoreItem.vue";

const money = ref(0);

function handleClick() {
  money.value += 1;
}
</script>
