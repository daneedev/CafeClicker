<template>
    <button class="btn-primary">
        {{ props.label }}
    </button>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string
}>()
</script>

<style scoped>
.btn-primary {
    border: 4px solid #99621E;
    color: #99621E;
    background-color: #faf9ef;
    padding: 10px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 0.5rem;
    transition-duration: 0.3s;
}
.btn-primary:hover {
    box-shadow: 0 0px 10px #99621E;
}
</style>