<script setup lang="ts">
// Component showcase — every component from the Figma "Components" section (3:25),
// in each of its states. Open it at /#showcase.
import { ref } from 'vue'
import ActionBar from '../components/ActionBar.vue'
import BookingCard from '../components/BookingCard.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import ServiceCard from '../components/ServiceCard.vue'
import SummaryRow from '../components/SummaryRow.vue'
import Tag from '../components/Tag.vue'
import TimeSlot from '../components/TimeSlot.vue'
import TopBar from '../components/TopBar.vue'

const slots = [
  { label: '09:00', disabled: false },
  { label: '12:30', disabled: true },
  { label: '16:30', disabled: false },
]
const selectedSlot = ref('16:30')

const services = [
  { id: 'flat', title: 'Flat tyre repair', description: 'Tube or tyre swap, any wheel size.', price: '€15', tags: ['30 min'] },
  { id: 'brakes', title: 'Brake service', description: 'Pads, cables and adjustment.', price: '€35', tags: ['1 hour', 'All bikes'] },
]
const selectedService = ref('flat')

const name = ref('')

function log(message: string) {
  console.log(message)
}
</script>

<template>
  <div class="showcase">
    <TopBar title="Book a repair" step="Step 1 of 3" @back="log('Back')" />

    <main class="showcase__body">
      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Button</h2>
        <div class="showcase__row">
          <Button label="Book this repair" @click="log('Primary')" />
          <Button label="Book this repair" variant="secondary" @click="log('Secondary')" />
        </div>
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Tag</h2>
        <div class="showcase__row">
          <Tag label="30 min" />
          <Tag label="All bikes" />
        </div>
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Time slot</h2>
        <div class="showcase__row">
          <TimeSlot
            v-for="slot in slots"
            :key="slot.label"
            :label="slot.label"
            :disabled="slot.disabled"
            :selected="selectedSlot === slot.label"
            @select="selectedSlot = slot.label"
          />
        </div>
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Input</h2>
        <Input v-model="name" label="Your name" placeholder="First and last name" autocomplete="name" />
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Service card</h2>
        <div class="showcase__row">
          <ServiceCard
            v-for="service in services"
            :key="service.id"
            :title="service.title"
            :description="service.description"
            :price="service.price"
            :tags="service.tags"
            :selected="selectedService === service.id"
            @select="selectedService = service.id"
          />
        </div>
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Summary row</h2>
        <div class="showcase__summary">
          <SummaryRow label="Service" value="Flat tyre repair" />
          <SummaryRow label="Time" :value="`Today at ${selectedSlot}`" />
          <SummaryRow label="Name" :value="name || '—'" />
        </div>
      </section>

      <section class="showcase__section">
        <h2 class="text-card-caption showcase__heading">Booking card</h2>
        <BookingCard
          title="Flat tyre repair"
          description="Tube or tyre swap, any wheel size."
          :tags="['30 min', 'All bikes']"
          price="€15"
          next-slot="Next free slot: today at 16:30"
          @book="log('Book')"
        />
      </section>
    </main>

    <ActionBar label="Book this repair" @click="log('Action bar')" />
  </div>
</template>

<style scoped>
.showcase {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.showcase__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-24);
  padding: var(--space-24) var(--space-16);
}

.showcase__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
}

.showcase__heading {
  margin: 0;
  color: var(--color-text-muted);
}

.showcase__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-16);
}

.showcase__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 318px;
}
</style>
