<script setup>
import {computed, ref} from "vue";
import {NDropdown, NButton, NIcon} from 'naive-ui';
const emits = defineEmits(['select']);
const props = defineProps({
  options: {type: Array }
})

const filter = ref('default')
const filterDropdownLabel = computed(() => {
  return props.options.find((item) => item['key'] === filter.value)?.label ?? "По умолчанию"
})

function onSelect(event) {
  filter.value = event
  emits('select', event)
}
</script>

<template>
  <NDropdown :options="options" @select="onSelect" class="filters-dropdown">
    <NButton icon-placement="right" class="button button_secondary filters-dropdown__button">
      <template #icon>
        <NIcon>
          <img src="public/images/icons/dropdown.svg" alt="dropdown btn">
        </NIcon>
      </template>
      {{ filterDropdownLabel }}
    </NButton>
  </NDropdown>
</template>


<style scoped lang="scss">
.filters-dropdown {
  &__button {
    width: fit-content;
    float: right;
  }
}
</style>