<script setup lang="ts">
// Screen 03 "Check and confirm" — Figma frame 7:128.
// Built from TopBar, SummaryRow, Input and ActionBar.
import { ref } from 'vue'
import ActionBar from '../components/ActionBar.vue'
import Input from '../components/Input.vue'
import SummaryRow from '../components/SummaryRow.vue'
import TopBar from '../components/TopBar.vue'

withDefaults(
  defineProps<{
    service?: string
    dropOff?: string
    price?: string
  }>(),
  {
    service: 'Flat tyre repair',
    dropOff: 'Today at 16:30',
    price: '€15, pay at pick-up',
  },
)

const emit = defineEmits<{
  back: []
  confirm: [contact: { name: string; phone: string }]
}>()

const name = ref('')
const phone = ref('')

function onSubmit() {
  emit('confirm', { name: name.value, phone: phone.value })
}
</script>

<template>
  <form class="check-confirm" @submit.prevent="onSubmit">
    <TopBar title="Book a repair" step="Step 3 of 3" @back="emit('back')" />

    <main class="check-confirm__content">
      <h2 class="check-confirm__title text-screen-title">Check and confirm</h2>

      <section class="check-confirm__summary" aria-label="Booking summary">
        <SummaryRow label="Service" :value="service" />
        <SummaryRow label="Drop-off" :value="dropOff" />
        <SummaryRow label="Price" :value="price" />
      </section>

      <Input
        v-model="name"
        class="check-confirm__field"
        label="Your name"
        placeholder="First and last name"
        autocomplete="name"
      />
      <Input
        v-model="phone"
        class="check-confirm__field"
        label="Phone number"
        placeholder="+32 470 12 34 56"
        type="tel"
        autocomplete="tel"
      />

      <p class="check-confirm__note text-card-caption">
        We text you when your bike is ready. You pay when you pick it up.
      </p>
    </main>

    <ActionBar label="Confirm booking" type="submit" />
  </form>
</template>

<style scoped>
.check-confirm {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--color-surface);
}

.check-confirm__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-16);
  padding: var(--space-20);
}

.check-confirm__title,
.check-confirm__note {
  margin: 0;
}

.check-confirm__title {
  color: var(--color-text-primary);
}

.check-confirm__summary {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding: var(--space-16);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

/* Input has a fixed default width; on this screen it fills the column. */
.check-confirm__content .check-confirm__field {
  width: 100%;
}

.check-confirm__note {
  color: var(--color-text-muted);
}
</style>
