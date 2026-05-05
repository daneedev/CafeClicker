<template>
  <article class="store-item">
    <p class="item-emoji">{{ props.emoji }}</p>
    <section class="item-overview">
      <section class="item-header">
        <p class="item-title">{{ props.title }}</p>
        <div v-if="props.badge" class="item-badge">{{ props.badge }}</div>
      </section>
      <p v-if="props.production" class="item-production">
        {{ props.production }}
      </p>
    </section>
    <p v-if="props.description" class="item-description">
      {{ props.description }}
    </p>
    <Button
      v-if="props.price !== undefined"
      :title="btnTitle"
      icon="/img/coin.svg"
      :disabled="disabledBtn"
      :onClick="handlePurchase"
    />
  </article>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
import { useGameStore } from "../stores/gameStore";
import { useAutomationStore } from "../stores/automationStore";
import { computed, ref } from "vue";
import { useUpgradeStore } from "../stores/upgradeStore";

const props = defineProps<{
  id?: string;
  emoji: string;
  title: string;
  type?: "automation" | "upgrade" | "achievement";
  badge?: string;
  description?: string;
  production?: string;
  price?: number;
}>();

const gameStore = useGameStore();
const automationStore = useAutomationStore();
const upgradeStore = useUpgradeStore();

// allow manual disabling in addition to affordability
const manualDisabled = ref(false);
const disabledBtn = computed(() => {
  const price = props.price ?? 0;
  return manualDisabled.value || gameStore.coins < price;
});

const btnTitle = ref(props.price?.toString() ?? "N/A");

function handlePurchase() {
  const price = props.price ?? 0;
  if (props.id && gameStore.spendCoins(price)) {
    switch (props.type) {
      case "automation":
        automationStore.levelUp(Number(props.id.split("-")[1]));
        gameStore.coinsPerSecond = automationStore.totalCps;
        break;
      case "upgrade":
        upgradeStore.purchaseUpgrade(Number(props.id.split("-")[1]));
        manualDisabled.value = true;
        btnTitle.value = "Zakoupeno";
        break;
    }
  }
}
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
