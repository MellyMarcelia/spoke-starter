<script setup lang="ts">
// Screen 01 "Choose a service" — Figma frame 7:114.
// Built from TopBar, ServiceCard (with Tag) and ActionBar.
import { ref } from 'vue'
import ActionBar from '../components/ActionBar.vue'
import ServiceCard from '../components/ServiceCard.vue'
import TopBar from '../components/TopBar.vue'

export type Service = {
  id: string
  title: string
  description: string
  price: string
  tags: string[]
}

const services: Service[] = [
  { id: 'flat-tyre', title: 'Flat tyre repair', description: 'Tube or tyre swap, any wheel size.', price: '€15', tags: ['30 min'] },
  { id: 'brakes', title: 'Brake check and adjust', description: 'Pads, cables and alignment.', price: '€25', tags: ['45 min'] },
  { id: 'gears', title: 'Gear tune-up', description: 'Smooth shifting on every gear.', price: '€30', tags: ['45 min'] },
  { id: 'full', title: 'Full service', description: 'Everything checked, cleaned and adjusted.', price: '€89', tags: ['2 hours'] },
]

const selectedId = ref(services[0].id)

const emit = defineEmits<{
  back: []
  continue: [service: Service]
}>()

function onContinue() {
  const service = services.find((s) => s.id === selectedId.value)
  if (service) emit('continue', service)
}
</script>

<template>
  <div class="choose-service">
    <TopBar title="Book a repair" step="Step 1 of 3" @back="emit('back')" />

    <main class="choose-service__content">
      <header class="choose-service__header">
        <h2 class="choose-service__title text-screen-title">Choose a service</h2>
        <p class="choose-service__subtitle text-card-body">What does your bike need?</p>
      </header>

      <ul class="choose-service__list" aria-label="Services">
        <li v-for="service in services" :key="service.id">
          <ServiceCard
            class="choose-service__card"
            :title="service.title"
            :description="service.description"
            :price="service.price"
            :tags="service.tags"
            :selected="selectedId === service.id"
            @select="selectedId = service.id"
          />
        </li>
      </ul>
    </main>

    <ActionBar label="Continue" @click="onContinue" />
  </div>
</template>

<style scoped>
.choose-service {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-surface);
}

.choose-service__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  padding: var(--space-20);
}

.choose-service__header {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.choose-service__title,
.choose-service__subtitle {
  margin: 0;
}

.choose-service__title {
  color: var(--color-text-primary);
}

.choose-service__subtitle {
  color: var(--color-text-muted);
}

.choose-service__list {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  margin: 0;
  padding: 0;
  list-style: none;
}

/* ServiceCard has a fixed default width; on this screen it fills the column. */
.choose-service__list .choose-service__card {
  width: 100%;
}
</style>
