<template>
  <button @click="handleClick" :disabled="props.disabled">
    {{ props.title }}
    <img
      v-if="props.icon"
      :src="props.icon"
      :alt="props.iconAlt || ''"
      :aria-hidden="!props.iconAlt"
      class="button-icon"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  icon?: string;
  iconAlt?: string;
  onClick?: () => void;
  disabled?: boolean;
}>();

function handleClick() {
  if (props.onClick && !props.disabled) {
    props.onClick();
  }
}
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  background-color: #99621e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition-duration: 0.3s;
}

button:hover {
  background-color: #ad814b;
}

.button-icon {
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
