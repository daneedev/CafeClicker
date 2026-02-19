<template>
  <header class="game-header">
    <h1>Café Clicker</h1>
    <section class="stats">
      <div class="stats-item">
        <span class="label">Peníze:</span>
        <span class="value">0</span>
      </div>
      <div class="stats-item">
        <span class="label">Příjem:</span>
        <span class="value">0/s</span>
      </div>
    </section>
    <section class="actions">
      <Button label="Obchod" />
    </section>
  </header>
</template>

<script setup lang="ts">
import "./style.css"
import Button from "./components/Button.vue";
</script>