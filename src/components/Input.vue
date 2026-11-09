<script setup lang="ts">
// Input — Figma component 6:23.
// Text field with a label above it. Focus shows the brand border.
// Pass `error` to show the error state: red border and the message under the field.
import { useId } from 'vue'

withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'tel'
    autocomplete?: string
    required?: boolean
    error?: string
  }>(),
  { type: 'text' },
)

const emit = defineEmits<{ blur: [] }>()

const model = defineModel<string>({ default: '' })
const id = useId()
const errorId = `${id}-error`
</script>

<template>
  <div class="input" :class="{ 'input--error': error }">
    <label :for="id" class="input__label text-label-field">{{ label }}</label>
    <input
      :id="id"
      v-model="model"
      class="input__field text-card-body"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-required="required || undefined"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? errorId : undefined"
      @blur="emit('blur')"
    />
    <p v-if="error" :id="errorId" class="input__error text-card-caption">{{ error }}</p>
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

/* Error state: same 2px treatment as focus, in the error colour. */
.input--error .input__field,
.input--error .input__field:focus {
  border-color: var(--color-error);
  box-shadow: inset 0 0 0 1px var(--color-error);
}

.input__error {
  margin: 0;
  color: var(--color-error);
}
</style>
