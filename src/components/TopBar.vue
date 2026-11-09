<script setup lang="ts">
// TopBar — Figma component 6:24.
// Screen header with a back arrow, the flow title and the step counter.
import chevronLeft from '../assets/icons/chevron-left.svg'

defineProps<{
  title: string
  step?: string
}>()

defineEmits<{ back: [] }>()
</script>

<template>
  <header class="top-bar">
    <button type="button" class="top-bar__back" aria-label="Back" @click="$emit('back')">
      <img :src="chevronLeft" alt="" width="24" height="24" />
    </button>
    <h1 class="top-bar__title text-card-title">{{ title }}</h1>
    <p v-if="step" class="top-bar__step text-card-caption">{{ step }}</p>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  padding: var(--space-16) var(--space-20);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.top-bar__back {
  display: inline-flex;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: 0;
  cursor: pointer;
}

.top-bar__back:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

.top-bar__title {
  flex: 1;
  min-width: 0;
  margin: 0;
  color: var(--color-text-primary);
}

.top-bar__step {
  flex-shrink: 0;
  margin: 0;
  color: var(--color-text-muted);
  white-space: nowrap;
}
</style>
