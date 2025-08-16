<!-- Basic Button Component with accessibility and design system compliance -->
<template>
  <component
    :is="tag"
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    :aria-label="ariaLabel"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  tag?: string
  type?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  tag: 'button',
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50',
    ghost: 'bg-transparent text-primary border border-primary hover:bg-primary hover:text-white focus:ring-primary/50',
    danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/50'
  }
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm h-9',
    md: 'px-4 py-3 text-base h-btn',
    lg: 'px-6 py-4 text-lg h-12'
  }
  
  const disabledClasses = props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : ''
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    disabledClasses
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
