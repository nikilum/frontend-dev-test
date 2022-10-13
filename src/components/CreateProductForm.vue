<script setup>
import NInput from "./UI/Fields/NInput.vue";
import NTextArea from "./UI/Fields/NTextArea.vue";
import {computed, reactive} from "vue";

const emit = defineEmits(['send'])

const data = reactive({
  name: "",
  description: "",
  image_url: "",
  price: "",
})

const errors = reactive({
  name: [],
  description: [],
  image_url: [],
  price: [],
})

const isAllRequiredFieldsNotEmpty = computed(function () {
  return !!(data.name && data.image_url && data.price)
})

const areErrorsEmpty = computed(function () {
  return ['name', 'description', 'image_url', 'price']
      .map((item) => !errors[item].length)
      .every(Boolean)
})

function validate() {
  Object.keys(errors).forEach((key) => (errors[key] = []))

  if (data.image_url.indexOf('https://') === -1) {
    errors.image_url.push('Введена некорректная ссылка')
  }
}

function onSubmit() {
  validate()

  console.log(!areErrorsEmpty.value)

  if (!areErrorsEmpty.value) {
    return
  }

  emit('send', data)

  data.name = ''
  data.description = ''
  data.image_url = ''
  data.price = ''
}
</script>

<template>
  <form class="card gutter-y-6" @submit.prevent="onSubmit">
    <div class="gutter-y-4">
      <NInput v-model="data.name" placeholder="Введите наименование товара" title="Наименование товара" required
              :errors="errors.name" @change="validate"/>
      <NTextArea v-model="data.description" placeholder="Введите описание товара" title="Описание товара"
                 :errors="errors.description" :resizable="false" @change="validate"/>
      <NInput v-model="data.image_url" placeholder="Введите ссылку" title="Ссылка на изображение товара" required
              :errors="errors.image_url" @change="validate"/>
      <NInput v-model="data.price" placeholder="Введите цену" type="number" title="Цена товара" required
              :errors="errors.price" :format-numbers="true" @change="validate"/>
    </div>
    <button class="button button_success" :disabled="!isAllRequiredFieldsNotEmpty || !areErrorsEmpty" type="submit">
      Добавить товар
    </button>
  </form>
</template>