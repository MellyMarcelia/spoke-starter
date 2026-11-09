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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-12) var(--space-20);
  border: 0;
  border-radius: var(--radius-md);
  white-space: nowrap;
  cursor: pointer;
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

.button:hover {
  filter: brightness(0.95);
}

.button:active {
  filter: brightness(0.9);
}

.button:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}
</style>
