<script setup lang="ts">
// Screen 02 "Pick a slot" — Figma frame 7:121.
// Built from TopBar, TimeSlot and ActionBar.
import { ref } from 'vue'
import ActionBar from '../components/ActionBar.vue'
import TimeSlot from '../components/TimeSlot.vue'
import TopBar from '../components/TopBar.vue'

type Slot = { label: string; disabled?: boolean }

withDefaults(defineProps<{ subtitle?: string }>(), {
  subtitle: 'Flat tyre repair, about 30 minutes',
})

const days: Slot[] = [{ label: 'Today' }, { label: 'Tomorrow' }, { label: 'Mon 16' }]

const times: Slot[] = [
  { label: '09:00', disabled: true },
  { label: '10:30', disabled: true },
  { label: '12:00' },
  { label: '14:00' },
  { label: '16:30' },
  { label: '17:30' },
]

const selectedDay = ref('Today')
const selectedTime = ref('16:30')

const emit = defineEmits<{
  back: []
  continue: [slot: { day: string; time: string }]
}>()
</script>

<template>
  <div class="pick-slot">
    <TopBar title="Book a repair" step="Step 2 of 3" @back="emit('back')" />

    <main class="pick-slot__content">
      <header class="pick-slot__header">
        <h2 class="pick-slot__title text-screen-title">Pick a drop-off time</h2>
        <p class="pick-slot__subtitle text-card-body">{{ subtitle }}</p>
      </header>

      <section class="pick-slot__group" aria-labelledby="pick-slot-day">
        <h3 id="pick-slot-day" class="pick-slot__label text-label-field">Day</h3>
        <div class="pick-slot__options">
          <TimeSlot
            v-for="day in days"
            :key="day.label"
            :label="day.label"
            :disabled="day.disabled"
            :selected="selectedDay === day.label"
            @select="selectedDay = day.label"
          />
        </div>
      </section>

      <section class="pick-slot__group" aria-labelledby="pick-slot-time">
        <h3 id="pick-slot-time" class="pick-slot__label text-label-field">Drop-off time</h3>
        <div class="pick-slot__options">
          <TimeSlot
            v-for="time in times"
            :key="time.label"
            :label="time.label"
            :disabled="time.disabled"
            :selected="selectedTime === time.label"
            @select="selectedTime = time.label"
          />
        </div>
      </section>

      <p class="pick-slot__note text-card-caption">
        Ready the same day. We text you when your bike is done.
      </p>
    </main>

    <ActionBar
      label="Continue"
      @click="emit('continue', { day: selectedDay, time: selectedTime })"
    />
  </div>
</template>

<style scoped>
.pick-slot {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-surface);
}

.pick-slot__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  padding: var(--space-20);
}

.pick-slot__header,
.pick-slot__group {
  display: flex;
  flex-direction: column;
}

.pick-slot__header {
  gap: var(--space-4);
}

.pick-slot__group {
  gap: var(--space-8);
}

.pick-slot__title,
.pick-slot__subtitle,
.pick-slot__label,
.pick-slot__note {
  margin: 0;
}

.pick-slot__title,
.pick-slot__label {
  color: var(--color-text-primary);
}

.pick-slot__subtitle,
.pick-slot__note {
  color: var(--color-text-muted);
}

.pick-slot__options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
}
</style>
