import { createRouter, createWebHistory } from 'vue-router'
import App from "../App.vue";
import ProductsList from '../views/Catalogue/ProductsList.vue'
import ProductsLongCatalogue from "../views/Catalogue/ProductsLongCatalogue.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
      redirect: 'products',

      children: [
        {
          path: '/products',
          name: 'products',
          component: ProductsList
        },
        {
          path: '/catalogue',
          name: 'catalogue',
          component: ProductsLongCatalogue
        }
      ]
    },
  ]
})

export default router
