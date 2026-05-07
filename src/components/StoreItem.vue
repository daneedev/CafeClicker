<template>
  <article class="store-item">
    <section class="item-data">
      <p class="item-emoji">{{ props.emoji }}</p>
      <section class="item-overview">
        <section class="item-header">
          <p class="item-title">{{ props.title }}</p>
          <div v-if="badgeText" class="item-badge">
            <font-awesome-icon v-if="badgeIcon" :icon="badgeIcon" />
            {{ badgeText }}
          </div>
        </section>
        <p v-if="props.description" class="item-description">
          {{ props.description }}
        </p>
        <p v-if="props.production" class="item-production">
          {{ props.production }}
        </p>
      </section>
    </section>

    <Button
      v-if="props.price !== undefined"
      :title="props.priceFormatted || props.price.toString()"
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
import { saveToLocalStorage } from "../composables/localStorageManager";

const props = defineProps<{
  id?: string;
  emoji: string;
  title: string;
  type?: "automation" | "upgrade" | "achievement";
  badgeIcon?: string;
  badge?: string;
  description?: string;
  production?: string;
  price?: number;
  priceFormatted?: string;
  disabled?: boolean;
}>();

const gameStore = useGameStore();
const automationStore = useAutomationStore();
const upgradeStore = useUpgradeStore();

// allow manual disabling in addition to affordability
const manualDisabled = ref(false);
const purchasedBadge = ref("");
const purchasedBadgeIcon = ref("");

const badgeText = computed(() => purchasedBadge.value || props.badge);
const badgeIcon = computed(() => purchasedBadgeIcon.value || props.badgeIcon);

const disabledBtn = computed(() => {
  const price = props.price ?? 0;
  return manualDisabled.value || gameStore.coins < price || props.disabled;
});

function handlePurchase() {
  const price = props.price ?? 0;
  if (props.id && gameStore.spendCoins(price)) {
    saveToLocalStorage("gameStore", gameStore);
    switch (props.type) {
      case "automation":
        automationStore.levelUp(Number(props.id.split("-")[1]));
        gameStore.coinsPerSecond = automationStore.totalCps;
        saveToLocalStorage("automationStore", automationStore);
        break;
      case "upgrade":
        upgradeStore.purchaseUpgrade(Number(props.id.split("-")[1]));
        manualDisabled.value = true;
        purchasedBadge.value = "Zakoupeno";
        purchasedBadgeIcon.value = "check";
        saveToLocalStorage("upgradeStore", upgradeStore);
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
  gap: 1rem;
}
.item-emoji {
  font-size: 2.5rem;
}

.item-data {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}
.item-overview {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.item-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  flex-wrap: wrap;
}

.item-title {
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 0;
  overflow-wrap: anywhere;
}
.item-badge {
  background-color: #99621e;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  flex: 0 0 auto;
  white-space: nowrap;
}

.item-description,
.item-production {
  min-width: 0;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.item-production {
  font-size: 0.9rem;
  color: #359b65;
}
</style>
