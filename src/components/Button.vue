<script setup lang="ts">
// Button — Figma component 3:33.
// Primary for the main action on a card, Secondary for anything else.
withDefaults(
  defineProps<{
    label: string
    variant?: 'primary' | 'secondary'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    :type="type"
    class="button text-label-button"
    :class="`button--${variant}`"
    @click="$emit('click', $event)"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.button {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-20);
  border: 0;
  border-radius: var(--radius-md);
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--easing-spring),
    box-shadow var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);
}

/* Sheen that sweeps across the button on hover, like light off a fresh frame. */
.button::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 30%,
    color-mix(in srgb, var(--color-on-brand) 45%, transparent) 50%,
    transparent 70%
  );
  transform: translateX(-100%);
  pointer-events: none;
}

.button--primary {
  background: var(--color-brand);
  color: var(--color-on-brand);
}

.button--secondary {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}

/* Hover: springs up, casts a brand-tinted shadow, and the sheen rides across. */
.button:hover {
  transform: translateY(calc(var(--space-4) * -0.5)) scale(1.03);
  box-shadow: 0 var(--space-8) var(--space-16) calc(var(--space-4) * -1)
    color-mix(in srgb, var(--color-brand) 45%, transparent);
}

.button:hover::after {
  transform: translateX(100%);
  transition: transform var(--duration-slow) var(--easing-standard);
}

.button--secondary:hover {
  border-color: var(--color-brand);
}

/* Press: squashes back down. */
.button:active {
  transform: translateY(0) scale(0.97);
  box-shadow: none;
}

@media (prefers-reduced-motion: reduce) {
  .button,
  .button:hover::after {
    transition: none;
  }

  .button:hover,
  .button:active {
    transform: none;
  }

  .button::after {
    display: none;
  }
}

.button:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
</style>
