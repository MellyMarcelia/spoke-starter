<script setup lang="ts">
// Shows screen 01 by default. Screen 03 is at /#confirm, the component showcase at /#showcase.
import { onBeforeUnmount, onMounted, ref } from 'vue'
import CheckAndConfirm from './screens/CheckAndConfirm.vue'
import ChooseAService from './screens/ChooseAService.vue'
import ComponentShowcase from './screens/ComponentShowcase.vue'

const hash = ref(window.location.hash)
const syncHash = () => (hash.value = window.location.hash)

onMounted(() => window.addEventListener('hashchange', syncHash))
onBeforeUnmount(() => window.removeEventListener('hashchange', syncHash))
</script>

<template>
  <ComponentShowcase v-if="hash === '#showcase'" />
  <CheckAndConfirm
    v-else-if="hash === '#confirm'"
    @back="console.log('Back')"
    @confirm="(contact) => console.log('Confirm booking for', contact.name, contact.phone)"
  />
  <ChooseAService
    v-else
    @back="console.log('Back')"
    @continue="(service) => console.log('Continue with', service.title)"
  />
</template>
