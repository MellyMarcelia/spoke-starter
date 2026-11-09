<script setup lang="ts">
// Tag — Figma component 3:27.
// Small label for service facts such as duration or bike type.
defineProps<{ label: string }>()
</script>

<template>
  <span class="tag text-label-tag">{{ label }}</span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  padding: var(--space-4) var(--space-12);
  background: var(--color-tag-background);
  color: var(--color-tag-text);
  border-radius: var(--radius-pill);
  white-space: nowrap;
}
</style>
