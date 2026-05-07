<template>
  <button @click="handleClick">
    Připravit kávu (+ {{ coinsToAdd }} <img src="/img/coin.svg" alt="coin" />)
  </button>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";
import { useUpgradeStore } from "../stores/upgradeStore";
import { computed } from "vue";

const gameStore = useGameStore();

const coinsToAdd = computed(() => {
  let baseCoins = 1;
  let clickMultiplier = 0;
  for (const upgrade of upgradeStore.ownedUpgrades) {
    const upgradeDef = upgradeStore.upgrades.find((u) => u.id === upgrade);
    if (upgradeDef) {
      if (upgradeDef.effect === "additive") {
        baseCoins += upgradeDef.value;
      } else if (upgradeDef.effect === "multiplier") {
        clickMultiplier += upgradeDef.value;
      }
    }
  }
  if (clickMultiplier > 0) {
    return baseCoins * clickMultiplier;
  } else {
    return baseCoins;
  }
});

const upgradeStore = useUpgradeStore();

function handleClick() {
  gameStore.addCoins(coinsToAdd.value);
  gameStore.addClick();
}
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  width: 300px;
  height: 300px;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  transition-duration: 0.3s;
}

button:active {
  transform: scale(0.8);
}

img {
  width: 20px;
  height: 20px;
  margin-left: 0.5rem;
}
</style>
