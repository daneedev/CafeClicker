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
        <article class="store-item">
          <p class="item-emoji">&#x2615;</p>
          <p class="item-title">Kávovar</p>
          <div class="level-badge">Level 1</div>
          <p>Produkce: 1 coin/s</p>
          <button class="buy-button" disabled>20 coins</button>
        </article>
      </section>
      <section class="achievements">
        <h2>Ocenění</h2>
        <p>Brzy přidáme možnost získat ocenění za vaše kávové úspěchy!</p>
        <article class="store-item">
          <p class="item-emoji">&#x2615;</p>
          <p class="item-title">Připrav 50 káv</p>
          <div class="level-badge">0/50</div>
        </article>
      </section>
      <section class="upgrades">
        <h2>Vylepšení</h2>
        <p>Brzy přidáme možnost vylepšit vaši kávovou produkci!</p>
        <article class="store-item">
          <p class="item-emoji">&#x1FAD8;</p>
          <p class="item-title">Lepší zrnka kávy</p>
          <button class="buy-button" disabled>100 coins</button>
        </article>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import "./style.css";
import { ref } from "vue";

const money = ref(0);

function handleClick() {
  money.value += 1;
}
</script>
