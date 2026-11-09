<script setup lang="ts">
// ServiceCard — Figma component 11:33.
// One service in the list on screen 01. Selected marks the user's choice.
import { useTapReplay } from '../composables/useTapReplay'
import Tag from './Tag.vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    price: string
    tags?: string[]
    selected?: boolean
  }>(),
  { tags: () => [], selected: false },
)

defineEmits<{ select: [] }>()

const { replay } = useTapReplay()
</script>

<template>
  <button
    type="button"
    class="service-card"
    :class="{ 'service-card--selected': selected }"
    :aria-pressed="selected"
    @pointerdown="replay"
    @click="$emit('select')"
  >
    <span class="service-card__header text-card-title">
      <span class="service-card__title">{{ title }}</span>
      <span class="service-card__price">{{ price }}</span>
    </span>
    <span class="service-card__description text-card-body">{{ description }}</span>
    <span v-if="tags.length" class="service-card__tags">
      <Tag v-for="tag in tags" :key="tag" :label="tag" />
    </span>
  </button>
</template>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-8);
  width: 350px;
  max-width: 100%;
  padding: var(--space-16);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--easing-spring),
    background var(--duration-fast) var(--easing-standard),
    box-shadow var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);
}

/* Hover: the card turns light grey, gets a thick brand border and a glow,
   and bounces up with a little wobble. Tapping shows the same thing on touch screens. */
.service-card:hover,
.service-card:active {
  background: var(--color-hover);
  border-color: var(--color-brand);
  box-shadow:
    inset 0 0 0 1px var(--color-brand),
    0 var(--space-16) var(--space-24) calc(var(--space-8) * -1)
      color-mix(in srgb, var(--color-brand) 55%, transparent);
  transform: translateY(calc(var(--space-8) * -1)) rotate(-1deg);
  animation: service-card-wobble var(--duration-slow) var(--easing-standard);
}

@keyframes service-card-wobble {
  0% { transform: translateY(0) rotate(0); }
  30% { transform: translateY(calc(var(--space-8) * -1.5)) rotate(-2deg); }
  55% { transform: translateY(calc(var(--space-8) * -0.75)) rotate(1.5deg); }
  80% { transform: translateY(calc(var(--space-8) * -1.1)) rotate(-1.5deg); }
  100% { transform: translateY(calc(var(--space-8) * -1)) rotate(-1deg); }
}


/* Figma's selected state is a 2px brand border. The extra 1px is an inset
   shadow so the card doesn't change size when it's selected. */
.service-card--selected {
  border-color: var(--color-brand);
  box-shadow: inset 0 0 0 1px var(--color-brand);
}

@media (prefers-reduced-motion: reduce) {
  .service-card {
    transition: none;
  }

  .service-card:hover,
  .service-card:active {
    animation: none;
    transform: none;
  }
}

.service-card:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

.service-card__header {
  display: flex;
  align-items: center;
  gap: var(--space-12);
  width: 100%;
  color: var(--color-text-primary);
}

.service-card__title {
  flex: 1;
  min-width: 0;
}

.service-card__price {
  white-space: nowrap;
}

.service-card__description {
  color: var(--color-text-muted);
}

.service-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
}
</style>
