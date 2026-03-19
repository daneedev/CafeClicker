<template>
  <article class="store-item">
    <p class="item-emoji">{{ props.emoji }}</p>
    <section class="item-overview">
      <section class="item-header">
        <p class="item-title">{{ props.title }}</p>
        <div v-if="props.badge" class="item-badge">{{ props.badge }}</div>
      </section>
      <p v-if="props.production" class="item-production">
        +{{ props.production }}/s
      </p>
    </section>
    <p v-if="props.description" class="item-description">
      {{ props.description }}
    </p>
    <Button
      v-if="props.price !== undefined"
      :title="`${props.price}`"
      icon="/img/coin.svg"
      :disabled="disabledBtn"
    />
  </article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useGameStore } from "../stores/gameStore";
import { computed } from "vue";

const props = defineProps<{
  emoji: string;
  title: string;
  badge?: string;
  description?: string;
  production?: string;
  price?: number;
}>();

const gameStore = useGameStore();

const disabledBtn = computed(() => {
  const price = props.price ?? 0;
  return gameStore.coins < price;
});
</script>

<style scoped>
.store-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #c4c0b3;
  border-radius: 8px;
  padding: 1rem;
  background-color: #f5f0e0;
}
.item-emoji {
  font-size: 2.5rem;
}
.item-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.item-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.item-badge {
  background-color: #99621e;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.item-production {
  font-size: 0.9rem;
  color: #359b65;
}
</style>
