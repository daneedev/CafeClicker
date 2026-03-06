<template>
  <article class="store-item">
    <p class="item-emoji">{{ props.emoji }}</p>
    <p class="item-title">{{ props.title }}</p>
    <div v-if="props.badge" class="item-badge">{{ props.badge }}</div>
    <p v-if="props.description">{{ props.description }}</p>
    <button v-if="props.price" class="buy-button" disabled>
      {{ props.price }} coins
    </button>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  emoji: string;
  title: string;
  badge?: string;
  description?: string;
  price?: number;
}>();
</script>

<style scoped>
.store-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #99621e;
  border-radius: 8px;
  padding: 1rem;

  .item-emoji {
    font-size: 2rem;
  }
  .item-badge {
    background-color: #99621e;
    color: white;
    border-radius: 4px;
    padding: 0.2rem;
  }
}
</style>
