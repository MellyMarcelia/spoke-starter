<script setup lang="ts">
// SummaryRow — Figma component 11:34.
// One line of the booking summary on screen 03.
defineProps<{
  label: string
  value: string
}>()
</script>

<template>
  <div class="summary-row">
    <span class="summary-row__label text-card-caption">{{ label }}</span>
    <span class="summary-row__value text-card-body">{{ value }}</span>
  </div>
</template>

<style scoped>
.summary-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-16);
}

.summary-row__label {
  color: var(--color-text-muted);
  white-space: nowrap;
}

.summary-row__value {
  color: var(--color-text-primary);
  text-align: right;
}
</style>
