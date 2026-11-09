<script setup lang="ts">
// Component library — every reusable component from the Figma "Components" section (3:25),
// in each of its states, with its file and a usage snippet.
// Open it at /#showcase. Link straight to one component with /#showcase/<id>, e.g. /#showcase/time-slot.
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import ActionBar from '../components/ActionBar.vue'
import BookingCard from '../components/BookingCard.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue'
import ServiceCard from '../components/ServiceCard.vue'
import SummaryRow from '../components/SummaryRow.vue'
import Tag from '../components/Tag.vue'
import TimeSlot from '../components/TimeSlot.vue'
import TopBar from '../components/TopBar.vue'

type Entry = { id: string; name: string; usage: string }

const entries: Entry[] = [
  { id: 'button', name: 'Button', usage: `<Button label="Book this repair" variant="secondary" @click="…" />` },
  { id: 'tag', name: 'Tag', usage: `<Tag label="30 min" />` },
  { id: 'time-slot', name: 'TimeSlot', usage: `<TimeSlot label="16:30" :selected="…" :disabled="…" @select="…" />` },
  { id: 'input', name: 'Input', usage: `<Input v-model="name" label="Your name" placeholder="…" />` },
  {
    id: 'service-card',
    name: 'ServiceCard',
    usage: `<ServiceCard title="…" description="…" price="€15" :tags="['30 min']" :selected="…" @select="…" />`,
  },
  { id: 'summary-row', name: 'SummaryRow', usage: `<SummaryRow label="Service" value="Flat tyre repair" />` },
  {
    id: 'booking-card',
    name: 'BookingCard',
    usage: `<BookingCard title="…" description="…" :tags="[…]" price="€15" next-slot="…" @book="…" />`,
  },
  { id: 'top-bar', name: 'TopBar', usage: `<TopBar title="Book a repair" step="Step 1 of 3" @back="…" />` },
  { id: 'action-bar', name: 'ActionBar', usage: `<ActionBar label="Book this repair" @click="…" />` },
]

const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry])) as Record<string, Entry>

// Demo state
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

// Deep links: /#showcase/<id> scrolls to that component.
const activeId = ref('')

async function scrollToHash() {
  const id = window.location.hash.replace(/^#showcase\/?/, '')
  activeId.value = id
  if (!id) return
  await nextTick()
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  scrollToHash()
  window.addEventListener('hashchange', scrollToHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', scrollToHash))
</script>

<template>
  <div class="library">
    <header class="library__header">
      <h1 class="library__title text-screen-title">Components</h1>
      <p class="library__intro text-card-caption">
        {{ entries.length }} reusable components in <code>src/components</code>. Pick one to jump to it.
      </p>
      <nav class="library__nav" aria-label="Components">
        <a
          v-for="entry in entries"
          :key="entry.id"
          :href="`#showcase/${entry.id}`"
          class="library__nav-link text-label-tag"
          :aria-current="activeId === entry.id ? 'true' : undefined"
        >
          {{ entry.name }}
        </a>
      </nav>
    </header>

    <main class="library__body">
      <section :id="byId['button'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['button'].name }}</h2>
        <code class="library__file text-card-caption">src/components/Button.vue</code>
        <div class="library__demo library__row">
          <Button label="Book this repair" @click="log('Primary')" />
          <Button label="Book this repair" variant="secondary" @click="log('Secondary')" />
        </div>
        <pre class="library__usage"><code>{{ byId['button'].usage }}</code></pre>
      </section>

      <section :id="byId['tag'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['tag'].name }}</h2>
        <code class="library__file text-card-caption">src/components/Tag.vue</code>
        <div class="library__demo library__row">
          <Tag label="30 min" />
          <Tag label="All bikes" />
        </div>
        <pre class="library__usage"><code>{{ byId['tag'].usage }}</code></pre>
      </section>

      <section :id="byId['time-slot'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['time-slot'].name }}</h2>
        <code class="library__file text-card-caption">src/components/TimeSlot.vue</code>
        <div class="library__demo library__row">
          <TimeSlot
            v-for="slot in slots"
            :key="slot.label"
            :label="slot.label"
            :disabled="slot.disabled"
            :selected="selectedSlot === slot.label"
            @select="selectedSlot = slot.label"
          />
        </div>
        <pre class="library__usage"><code>{{ byId['time-slot'].usage }}</code></pre>
      </section>

      <section :id="byId['input'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['input'].name }}</h2>
        <code class="library__file text-card-caption">src/components/Input.vue</code>
        <div class="library__demo">
          <Input v-model="name" label="Your name" placeholder="First and last name" autocomplete="name" />
        </div>
        <pre class="library__usage"><code>{{ byId['input'].usage }}</code></pre>
      </section>

      <section :id="byId['service-card'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['service-card'].name }}</h2>
        <code class="library__file text-card-caption">src/components/ServiceCard.vue</code>
        <div class="library__demo library__row">
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
        <pre class="library__usage"><code>{{ byId['service-card'].usage }}</code></pre>
      </section>

      <section :id="byId['summary-row'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['summary-row'].name }}</h2>
        <code class="library__file text-card-caption">src/components/SummaryRow.vue</code>
        <div class="library__demo library__stack">
          <SummaryRow label="Service" value="Flat tyre repair" />
          <SummaryRow label="Time" :value="`Today at ${selectedSlot}`" />
          <SummaryRow label="Name" :value="name || '—'" />
        </div>
        <pre class="library__usage"><code>{{ byId['summary-row'].usage }}</code></pre>
      </section>

      <section :id="byId['booking-card'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['booking-card'].name }}</h2>
        <code class="library__file text-card-caption">src/components/BookingCard.vue</code>
        <div class="library__demo">
          <BookingCard
            title="Flat tyre repair"
            description="Tube or tyre swap, any wheel size."
            :tags="['30 min', 'All bikes']"
            price="€15"
            next-slot="Next free slot: today at 16:30"
            @book="log('Book')"
          />
        </div>
        <pre class="library__usage"><code>{{ byId['booking-card'].usage }}</code></pre>
      </section>

      <section :id="byId['top-bar'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['top-bar'].name }}</h2>
        <code class="library__file text-card-caption">src/components/TopBar.vue</code>
        <div class="library__demo library__frame">
          <TopBar title="Book a repair" step="Step 1 of 3" @back="log('Back')" />
        </div>
        <pre class="library__usage"><code>{{ byId['top-bar'].usage }}</code></pre>
      </section>

      <section :id="byId['action-bar'].id" class="library__section">
        <h2 class="library__heading text-card-title">{{ byId['action-bar'].name }}</h2>
        <code class="library__file text-card-caption">src/components/ActionBar.vue</code>
        <div class="library__demo library__frame">
          <ActionBar label="Book this repair" @click="log('Action bar')" />
        </div>
        <pre class="library__usage"><code>{{ byId['action-bar'].usage }}</code></pre>
      </section>
    </main>
  </div>
</template>

<style scoped>
.library {
  min-height: 100vh;
}

.library__header {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: var(--space-24) var(--space-16) var(--space-16);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.library__title,
.library__intro {
  margin: 0;
}

.library__intro {
  color: var(--color-text-muted);
}

.library__nav {
  display: flex;
  gap: var(--space-8);
  overflow-x: auto;
  padding-top: var(--space-8);
  scrollbar-width: none;
}

.library__nav-link {
  flex-shrink: 0;
  padding: var(--space-4) var(--space-12);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  color: var(--color-text-primary);
  text-decoration: none;
}

.library__nav-link:hover,
.library__nav-link[aria-current='true'] {
  background: var(--color-tag-background);
  border-color: var(--color-tag-background);
  color: var(--color-tag-text);
}

.library__nav-link:focus-visible {
  outline: 2px solid var(--color-brand);
  outline-offset: 2px;
}

.library__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-24);
  padding: var(--space-24) var(--space-16);
}

.library__section {
  display: flex;
  flex-direction: column;
  gap: var(--space-12);
  padding-bottom: var(--space-24);
  border-bottom: 1px solid var(--color-border);
  /* Keep the section heading clear of the sticky header when jumped to. */
  scroll-margin-top: 160px;
}

.library__section:last-child {
  border-bottom: 0;
}

.library__heading {
  margin: 0;
}

.library__file {
  color: var(--color-text-muted);
}

.library__demo {
  padding: var(--space-16);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.library__frame {
  padding: 0;
  overflow: hidden;
}

.library__row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--space-16);
}

.library__stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  max-width: 318px;
}

.library__usage {
  margin: 0;
  padding: var(--space-12) var(--space-16);
  overflow-x: auto;
  border-radius: var(--radius-md);
  background: var(--color-tag-background);
  color: var(--color-tag-text);
  font: var(--font-card-caption);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}
</style>
