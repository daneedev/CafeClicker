<template>
  <Teleport to="body">
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toastStore.toasts"
          :key="toast.id"
          class="toast"
          @click="toastStore.dismiss(toast.id)"
        >
          <span class="toast-emoji">{{ toast.emoji }}</span>
          <div class="toast-body">
            <p class="toast-title">{{ toast.title }}</p>
            <p v-if="toast.description" class="toast-description">{{ toast.description }}</p>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToastStore } from "../stores/toastStore";
const toastStore = useToastStore();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 200;
  pointer-events: none;
}

.toast {
  pointer-events: all;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: var(--accent-color);
  border: 2px solid var(--primary-color);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  white-space: nowrap;
  font-family: "Sour Gummy", sans-serif;
}

.toast-emoji {
  font-size: 1.75rem;
  line-height: 1;
}

.toast-body {
  display: flex;
  flex-direction: column;
}

.toast-title {
  font-weight: bold;
  font-size: 1rem;
  color: var(--primary-color);
}

.toast-description {
  font-size: 0.85rem;
  color: #5a4030;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
</style>
