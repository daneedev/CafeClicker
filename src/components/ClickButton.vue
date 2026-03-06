<template>
  <button class="click-button" @click="handleClick">Připravit kávu</button>
</template>

<script setup lang="ts">
import { useGameStore } from "../stores/gameStore";

const gameStore = useGameStore();

function handleClick() {
  gameStore.addCoins(1);
  gameStore.addClick();
}
</script>

<style scoped></style>
