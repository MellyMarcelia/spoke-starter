<script setup lang="ts">
// ActionBar — Figma component 11:37.
// Bottom area of a screen with the main action. Change the label on the Button.
import Button from './Button.vue'

withDefaults(
  defineProps<{
    label: string
    type?: 'button' | 'submit'
  }>(),
  { type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <footer class="action-bar">
    <Button class="action-bar__button" :label="label" :type="type" @click="$emit('click', $event)" />
  </footer>
</template>

<style scoped>
.action-bar {
  display: flex;
  flex-direction: column;
  padding: var(--space-16) var(--space-20);
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
}

.action-bar__button {
  width: 100%;
}
</style>
