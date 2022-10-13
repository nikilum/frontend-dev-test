<script setup>
import defaultProps from "./defaultProps";

defineEmits(['update:modelValue'])
defineProps({
  ...defaultProps,
  resizable: {type: Boolean, default: true}
})
</script>

<template>
  <label class="label" :class="{ 'label_required': required, 'label_error': errors.length }">
    <span class="label__text" v-if="title">{{ title }}</span>
    <textarea class="label__textarea" :placeholder="placeholder"
              @input="$emit('update:modelValue', $event.target.value)"
              :style="{resize: resizable ? 'auto' : 'none'}"
              :value="modelValue"></textarea>
    <span class="label__error" v-for="error of errors">{{ error }}</span>
  </label>
</template>