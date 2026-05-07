<template>
  <article v-if="props.disabled">
    <p class="item-emoji">&#x1F512;</p>
    <section class="item-overview">
      <p class="item-title">???</p>
      <p v-if="props.description" class="item-description">
        {{ props.description }}
      </p>
    </section>
  </article>
  <article v-else>
    <p class="item-emoji">{{ props.emoji }}</p>
    <section class="item-overview">
      <p class="item-title">{{ props.title }}</p>
      <p v-if="props.description" class="item-description">
        {{ props.description }}
      </p>
      <p v-if="props.unlockedAt" class="item-description">
        Odemčeno
        {{
          new Date(props.unlockedAt).toLocaleDateString("cs-CZ", {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  id?: string;
  emoji: string;
  title: string;
  description?: string;
  unlockedAt?: string;
  disabled?: boolean;
}>();
</script>

<style scoped>
article {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #c4c0b3;
  border-radius: 8px;
  padding: 1rem;
  background-color: v-bind("props.disabled ? '#ede6c9' : '#f5f0e0'");
}
.item-emoji {
  font-size: 2.5rem;
}

.item-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.item-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.item-description {
  color: v-bind("props.disabled ? '#966325' : 'inherit'");
}
</style>
