<template>
  <div class="info-card">
    <p class="info-title">{{ props.title }}</p>
    <div class="info-text">
      <slot />
      <p>{{ props.value }}</p>
      <img
        v-if="props.iconSrc && props.iconType === 'image'"
        :src="props.iconSrc"
        class="info-icon"
      />
      <font-awesome-icon
        v-else-if="props.iconSrc && props.iconType === 'font-awesome'"
        :icon="props.iconSrc"
        class="info-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  value?: string | number;
  iconSrc?: string;
  iconType?: "font-awesome" | "image";
}>();
</script>

<style scoped>
.info-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border: 1px solid #c4c0b3;
  border-radius: 8px;
  padding: 0.5rem;
}

.info-title {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.info-text {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  gap: 0.5rem;
}

.info-icon {
  width: 20px;
  height: 20px;
}
</style>
