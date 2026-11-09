<script setup lang="ts">
// Booking flow: screen 01 is the default, screen 02 is at /#slot, screen 03 at /#confirm.
// The component library is at /#showcase (or /#showcase/<id>).
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import CheckAndConfirm from './screens/CheckAndConfirm.vue'
import ChooseAService, { type Service } from './screens/ChooseAService.vue'
import ComponentShowcase from './screens/ComponentShowcase.vue'
import PickASlot from './screens/PickASlot.vue'

const hash = ref(window.location.hash)
const syncHash = () => (hash.value = window.location.hash)
const go = (target: string) => (window.location.hash = target)

onMounted(() => window.addEventListener('hashchange', syncHash))
onBeforeUnmount(() => window.removeEventListener('hashchange', syncHash))

// Choices carried through the flow. Undefined means the screen uses its own defaults.
const service = ref<Service>()
const slot = ref<{ day: string; time: string }>()

const slotSubtitle = computed(() =>
  service.value ? `${service.value.title}, about ${service.value.tags[0]}` : undefined,
)
const dropOff = computed(() => (slot.value ? `${slot.value.day} at ${slot.value.time}` : undefined))
const price = computed(() => (service.value ? `${service.value.price}, pay at pick-up` : undefined))

function onService(chosen: Service) {
  service.value = chosen
  go('slot')
}

function onSlot(chosen: { day: string; time: string }) {
  slot.value = chosen
  go('confirm')
}
</script>

<template>
  <ComponentShowcase v-if="hash.startsWith('#showcase')" />
  <PickASlot
    v-else-if="hash === '#slot'"
    :subtitle="slotSubtitle"
    @back="go('')"
    @continue="onSlot"
  />
  <CheckAndConfirm
    v-else-if="hash === '#confirm'"
    :service="service?.title"
    :drop-off="dropOff"
    :price="price"
    @back="go('slot')"
    @confirm="(contact) => console.log('Confirm booking for', contact.name, contact.phone)"
  />
  <ChooseAService v-else @back="console.log('Back')" @continue="onService" />
</template>
