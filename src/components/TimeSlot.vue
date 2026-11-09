<script setup lang="ts">
// TimeSlot — Figma component 6:14.
// A pickable day or drop-off time. Selected is the user's choice, Disabled is fully booked.
import { useTapReplay } from '../composables/useTapReplay'

withDefaults(
  defineProps<{
    label: string
    selected?: boolean
    disabled?: boolean
  }>(),
  { selected: false, disabled: false },
)

defineEmits<{ select: [] }>()

const { replay } = useTapReplay()
</script>

<template>
  <button
    type="button"
    class="time-slot text-label-field"
    :class="{ 'time-slot--selected': selected }"
    :aria-pressed="selected"
    :disabled="disabled"
    @pointerdown="replay"
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
  transition:
    transform var(--duration-fast) var(--easing-spring),
    background var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard),
    box-shadow var(--duration-fast) var(--easing-standard);
}

/* Hover: the slot turns light grey with a thick brand border and does a little wiggle,
   like a bell being rung. Tapping shows the same thing on touch screens. */
.time-slot:not(:disabled):hover,
.time-slot:not(:disabled):active {
  border-color: var(--color-brand);
  box-shadow:
    inset 0 0 0 1px var(--color-brand),
    0 var(--space-8) var(--space-16) calc(var(--space-4) * -1)
      color-mix(in srgb, var(--color-brand) 60%, transparent);
  animation: time-slot-wiggle var(--duration-slow) var(--easing-standard);
  transform: translateY(calc(var(--space-4) * -1)) scale(1.08);
}

.time-slot:not(:disabled):not(.time-slot--selected):hover,
.time-slot:not(:disabled):not(.time-slot--selected):active {
  background: var(--color-hover);
}

@keyframes time-slot-wiggle {
  0% { transform: translateY(0) scale(1); }
  20% { transform: translateY(calc(var(--space-4) * -1)) scale(1.08) rotate(-6deg); }
  40% { transform: translateY(calc(var(--space-4) * -1)) scale(1.08) rotate(5deg); }
  60% { transform: translateY(calc(var(--space-4) * -1)) scale(1.08) rotate(-3deg); }
  80% { transform: translateY(calc(var(--space-4) * -1)) scale(1.08) rotate(2deg); }
  100% { transform: translateY(calc(var(--space-4) * -1)) scale(1.08) rotate(0); }
}

@media (prefers-reduced-motion: reduce) {
  .time-slot {
    transition: none;
  }

  .time-slot:not(:disabled):hover,
  .time-slot:not(:disabled):active {
    animation: none;
    transform: none;
  }
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
