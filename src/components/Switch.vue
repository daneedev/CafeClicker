<template>
  <label class="switch" :class="{ disabled: props.disabled }">
    <input
      type="checkbox"
      :checked="props.modelValue"
      :disabled="props.disabled"
      @change="
        emit('update:modelValue', ($event.target as HTMLInputElement).checked)
      "
    />
    <span class="track">
      <span class="thumb" />
    </span>
    <span v-if="props.label" class="label">{{ props.label }}</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  label?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();
</script>

<style scoped>
.switch {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  user-select: none;
}

.switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input {
  display: none;
}

.track {
  position: relative;
  width: 44px;
  height: 24px;
  background-color: var(--secondary-color);
  border-radius: 999px;
  transition: background-color 0.25s;
  flex-shrink: 0;
}

input:checked + .track {
  background-color: var(--primary-color);
}

.thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.25s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

input:checked + .track .thumb {
  transform: translateX(20px);
}

.label {
  font-family: "Sour Gummy", sans-serif;
  font-size: 1rem;
  color: #3a2a1a;
}
</style>
