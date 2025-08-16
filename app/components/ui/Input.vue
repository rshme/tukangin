<!-- Input Component with validation and accessibility -->
<template>
  <div class="form-group">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-text-900 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-danger">*</span>
    </label>
    
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-500">
        <slot name="prefix" />
      </div>
      
      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        :aria-describedby="hasError ? `${inputId}-error` : undefined"
        :aria-invalid="hasError"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="$slots.suffix" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-500">
        <slot name="suffix" />
      </div>
    </div>
    
    <p
      v-if="hasError"
      :id="`${inputId}-error`"
      class="mt-1 text-sm text-danger"
    >
      {{ error }}
    </p>
    
    <p
      v-else-if="hint"
      class="mt-1 text-sm text-text-500"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md'
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

// Generate unique ID for accessibility
const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)
const hasError = computed(() => !!props.error)

const inputClasses = computed(() => {
  const baseClasses = 'block w-full rounded border shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary'
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-3 py-3 text-base',
    lg: 'px-4 py-4 text-lg'
  }
  
  const stateClasses = hasError.value
    ? 'border-danger focus:ring-danger focus:border-danger'
    : 'border-border'
    
  const disabledClasses = props.disabled
    ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
    : 'bg-bg-surface text-text-900'
    
  const prefixClasses = !!useSlots().prefix ? 'pl-10' : ''
  const suffixClasses = !!useSlots().suffix ? 'pr-10' : ''
  
  return [
    baseClasses,
    sizeClasses[props.size],
    stateClasses,
    disabledClasses,
    prefixClasses,
    suffixClasses
  ].join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}
</script>
