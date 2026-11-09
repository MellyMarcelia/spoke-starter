<script setup lang="ts">
// Input — Figma component 6:23.
// Text field with a label above it. Focus shows the brand border.
import { useId } from 'vue'

withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'tel'
    autocomplete?: string
  }>(),
  { type: 'text' },
)

const model = defineModel<string>({ default: '' })
const id = useId()
</script>

<template>
  <div class="input">
    <label :for="id" class="input__label text-label-field">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      class="input__field text-card-body"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
    />
  </div>
</template>

<style scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  width: 320px;
  max-width: 100%;
}

.input__label {
  color: var(--color-text-primary);
}

.input__field {
  width: 100%;
  padding: var(--space-12) var(--space-16);
  background: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.input__field::placeholder {
  color: var(--color-text-muted);
}

/* Figma's focus state is a 2px brand border. The extra 1px is an inset
   shadow so the field doesn't change size when it gets focus. */
.input__field:focus {
  outline: none;
  border-color: var(--color-brand);
  box-shadow: inset 0 0 0 1px var(--color-brand);
}
</style>
