<script setup>
import CreateProductForm from "./components/CreateProductForm.vue";
import {computed, ref} from "vue";
import ProductCard from "./components/ProductCard.vue";
import testData from "./testData";

const cardsData = window.localStorage.testProducts ? JSON.parse(window.localStorage.testProducts) : testData

const cards = ref([
    ...cardsData
])

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

const reversedCards = computed(() => {
  return [...cards.value].reverse()
})
</script>

<template>
  <div class="app gutter-x-4">
    <div class="gutter-y-4">
      <div class="header">Добавление товара</div>
      <CreateProductForm class="app__form" @send="handleSubmit"/>
    </div>
    <div class="grid grid_gap-x-4 grid_gap-y-4 w-100 app__grid">
      <transition-group name="list">
        <ProductCard
            v-for="card of reversedCards"
            @delete="deleteCard"
            :key="card.id"
            :id="card.id"
            :name="card.name"
            :description="card.description"
            :image_url="card.image_url"
            :price="card.price"
        />
      </transition-group>
    </div>
  </div>
</template>

<style src="@/assets/app.scss" lang="scss"/>
<style lang="scss" scoped>
.app {
  display: flex;
  width: 100%;

  &__grid {
    margin-top: 34px;
  }

  &__form {
    min-width: 332px;
    position: sticky;
  }
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}

.list-leave-active {
  position: absolute;
}
</style>