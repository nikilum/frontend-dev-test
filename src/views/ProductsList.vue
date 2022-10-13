<script setup>
import CreateProductForm from "../components/CreateProductForm.vue";
import {computed, ref} from "vue";
import ProductCard from "../components/ProductCard.vue";
import testData from "../testData";
import FilterDropdown from "../components/FilterDropdown.vue";

const cardsData = window.localStorage.testProducts ? JSON.parse(window.localStorage.testProducts) : testData

const cards = ref([
  ...cardsData
])

const filter = ref("")

const dropdownParams = [
  {label: 'По умолчанию', key: 'default'},
  {label: 'Мин. цена', key: 'min'},
  {label: 'Макс. цена', key: 'max'},
]

function handleSubmit(event) {
  cards.value.push(
      {
        name: event.name,
        description: event.description,
        price: event.price,
        image_url: event.image_url,
        id: Date.now(),
      }
  )

  window.localStorage.testProducts = JSON.stringify(cards.value)
}

function deleteCard(id) {
  const index = cards.value.findIndex((card) => card.id === id)
  cards.value.splice(index, 1)

  window.localStorage.testProducts = JSON.stringify(cards.value)
}

const filteredCards = computed(() => {
  const cardsCopy = JSON.parse(JSON.stringify(cards.value))

  switch (filter.value) {
    case "min":
      return cardsCopy.reverse().sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1)
    case "max":
      return cardsCopy.reverse().sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1)
    case "default":
    default:
      return cardsCopy.reverse()
  }
})
</script>

<template>
  <div class="products-list gutter-x-4">
    <div class="gutter-y-4">
      <div class="header">Добавление товара</div>
      <CreateProductForm class="products-list__form" @send="handleSubmit"/>
    </div>
    <div class="gutter-y-4">
      <FilterDropdown :options="dropdownParams" @select="filter = $event" />
      <div class="grid grid_gap-x-4 grid_gap-y-4 w-100">
        <transition-group name="list">
          <ProductCard
              v-for="card of filteredCards"
              @delete="deleteCard"
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
  </div>
</template>

<style scoped lang="scss">
.products-list {
  display: flex;
  width: 100%;

  &__form {
    min-width: 332px;
    position: sticky;
  }
}

@media (max-width: 768px) {
  .products-list {
    display: flex;
    flex-direction: column;

    > * {
      margin-right: 0;

      &:first-child {
        margin-bottom: 16px;
      }
    }
    &__form {
      min-width: auto;
    }
  }
}
</style>