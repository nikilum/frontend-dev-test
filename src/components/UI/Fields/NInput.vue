<script setup>
import defaultProps from "./defaultProps";

defineEmits(['update:modelValue'])
defineProps({
  ...defaultProps,
  type: {type: String, default: "text"},
})
</script>

<template>
  <label class="label" :class="{ 'label_required': required, 'label_error': errors.length }">
    <span class="label__text" v-if="title">{{ title }}</span>
    <input
        :type="type"
        class="label__input"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
    <span class="label__error" v-for="error of errors">{{ error }}</span>
  </label>
</template>