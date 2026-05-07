<template>
  <Teleport to="body">
    <div v-if="props.isOpen" class="modal-overlay" @click.self="close">
      <div class="modal">
        <button class="modal-close" @click="close">✕</button>
        <div class="modal-container">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["update:isOpen"]);
function close() {
  emit("update:isOpen", false);
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal {
  background-color: #fff8f0;
  border-radius: 12px;
  padding: 1.5rem;
  min-width: 320px;
  max-width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #99621e;
  line-height: 1;
  padding: 0.25rem;
}

.modal-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.modal-close:hover {
  color: #ad814b;
}
</style>
