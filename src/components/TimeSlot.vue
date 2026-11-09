<script setup lang="ts">
// TimeSlot — Figma component 6:14.
// A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked.
withDefaults(
  defineProps<{
    label: string
    selected?: boolean
    disabled?: boolean
  }>(),
  { selected: false, disabled: false },
)

defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    class="time-slot text-label-field"
    :class="{ 'time-slot--selected': selected }"
    :aria-pressed="selected"
    :disabled="disabled"
    @click="$emit('select')"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.time-slot {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-16);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  white-space: nowrap;
  cursor: pointer;
}

.time-slot--selected {
  background: var(--color-brand);
  border-color: var(--color-brand);
  color: var(--color-on-brand);
}

.time-slot:disabled {
  color: var(--color-text-muted);
  opacity: 0.5;
  cursor: not-allowed;
}

.time-slot:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
</style>
