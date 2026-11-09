<script setup lang="ts">
// BookingCard — Figma node 3:34 ("Booking card"), composed from Tag and Button.
import Button from './Button.vue'
import Tag from './Tag.vue'

withDefaults(
  defineProps<{
    title: string
    description: string
    tags: string[]
    price: string
    nextSlot: string
    ctaLabel?: string
  }>(),
  { ctaLabel: 'Book this repair' },
)

defineEmits<{ book: [] }>()
</script>

<template>
  <article class="booking-card">
    <header class="booking-card__header">
      <h3 class="booking-card__title text-card-title">{{ title }}</h3>
      <p class="booking-card__description text-card-body">{{ description }}</p>
    </header>

    <div class="booking-card__meta">
      <ul class="booking-card__tags">
        <li v-for="tag in tags" :key="tag">
          <Tag :label="tag" />
        </li>
      </ul>
      <p class="booking-card__price text-card-title">{{ price }}</p>
    </div>

    <p class="booking-card__slot text-card-caption">{{ nextSlot }}</p>

    <Button class="booking-card__cta" :label="ctaLabel" @click="$emit('book')" />
  </article>
</template>

<style scoped>
.booking-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  width: 360px;
  max-width: 100%;
  padding: var(--space-24);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: clip;
}

.booking-card__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.booking-card__title,
.booking-card__description,
.booking-card__price,
.booking-card__slot {
  margin: 0;
}

.booking-card__title,
.booking-card__price {
  color: var(--color-text-primary);
}

.booking-card__description,
.booking-card__slot {
  color: var(--color-text-muted);
}

.booking-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
}

.booking-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin: 0;
  padding: 0;
  list-style: none;
}

.booking-card__price {
  white-space: nowrap;
}

.booking-card__cta {
  width: 100%;
}
</style>
