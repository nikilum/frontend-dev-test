<script setup>
import FilterDropdown from '../components/FilterDropdown.vue'
import {computed, ref} from "vue";
import ProductCard from "../components/ProductCard.vue";

const filter = ref("")

const dropdownParams = [
  {label: 'По умолчанию', key: 'default'},
  {label: 'Мин. цена', key: 'min'},
  {label: 'Макс. цена', key: 'max'},
]

const cards = ref([])

const filteredCards = computed(() => {
  const cardsCopy = JSON.parse(JSON.stringify(cards.value))

  switch (filter.value) {
    case "min":
      return cardsCopy.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1)
    case "max":
      return cardsCopy.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1)
    case "default":
    default:
      return cardsCopy
  }
})

let productsLoadingTimeout = null

async function loadProducts() {
  if (productsLoadingTimeout) {
    return
  }

  productsLoadingTimeout = true
  setTimeout(() => productsLoadingTimeout = false, 1000)

  try {
    const response = await (await fetch('https://run.mocky.io/v3/0076a1d7-27cc-4981-9899-44944d77c148')).json()

    const mappedResponse = response.map((item, index) => {
      item.id = Date.now() + index
      
      return item
    })

    cards.value = [...cards.value, ...mappedResponse]
  } catch (e) {
    alert("Неизвестная ошибка получения данных!")
    console.log(e)
  }
}

loadProducts()
</script>

<template>
  <div class="catalogue gutter-y-4">
    <div class="catalogue__header">
      <div class="header">Каталог</div>
      <FilterDropdown :options="dropdownParams" @select="filter = $event" />
    </div>
    <div class="grid grid_4 grid_gap-x-4 grid_gap-y-4" v-scroll="loadProducts">
      <transition-group name="list">
        <ProductCard
            v-for="card of filteredCards"
            :no-remove="true"
            :key="card.id"
            :id="card.id"
            :name="card.name"
            :description="card.description"
            :image_url="card.image_url"
            :price="Number(card.price)"
        />
      </transition-group>
    </div>
  </div>
</template>

<style scoped lang="scss">
.catalogue {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>