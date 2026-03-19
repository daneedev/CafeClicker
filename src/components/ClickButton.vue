<template>
  <button @click="handleClick">Připravit kávu</button>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

function handleClick() {
  gameStore.addCoins(1);
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
}

button:active {
  transform: scale(0.9);
}
</style>
