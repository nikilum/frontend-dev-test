<script setup>
defineProps({
  name: {type: String, required: true},
  description: {type: String, required: true},
  image_url: {type: String, required: true},
  price: {type: Number, required: true},
  id: {type: Number, required: true},
})

</script>

<template>
<div class="card card_no-padding product-card gutter-y-8">
  <div class="gutter-y-4">
    <img :src="image_url" alt="image" class="product-card__photo">
    <div class="product-card__name">{{ name }}</div>
    <div class="product-card__description">{{ description }}</div>
  </div>
  <div class="product-card__price">
    {{ price.toLocaleString() }} руб.
  </div>
  <button class="product-card__delete" @click="$emit('delete', id)">
    <img src="public/images/icons/delete.svg">
  </button>
</div>
</template>

<style scoped lang="scss">
@import "src/assets/variables";

.product-card {
  position: relative;
  overflow: visible;
  transition: 0.1s ease-in-out;

  &:hover {
    .product-card__delete {
      transform: scale(1) !important;
      cursor: pointer;
    }
  }

  &__photo {
    width: 100%;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
    height: 200px;
    object-fit: cover;
  }
  &__name, &__description, &__price {
    padding: 0 24px;
  }
  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
  }
  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    word-break: break-word;
  }
  &__price {
    padding-bottom: 24px;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 0;
  }
  &__delete {
    height: 32px;
    width: 32px;
    border-radius: 10px;
    background: $primary;
    position: absolute;
    z-index: 1;
    top: -8px;
    right: -8px;
    border: 0;
    transition: 0.1s ease-in-out;
    transform: scale(0);
  }
}
</style>