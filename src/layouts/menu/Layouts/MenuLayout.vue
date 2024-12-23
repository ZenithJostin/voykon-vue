<template>
  <div class="container">
    <v-skeleton-loader
      v-if="isRestaurantLoading"
      class="mx-auto mt-4"
      elevation="0"
      type="card-avatar, article, actions"
    ></v-skeleton-loader>
    <div class="menu-main-container" v-else>
      <RestaurantHeader :restaurant="restaurant" />
      <div class="categories-row">
        <div class="search-bx">
          <input type="text" :class="isSearchVisible ? 'active' : ''" />
          <span class="material-symbols-outlined" @click="toggleSearch"> search </span>
        </div>
        <div class="categories-bx">
          <CategoryComponent v-for="(category, index) in restaurant.categories" :key="index" :category="category" :emoji="category.emoji" />
        </div>
      </div>
      <div class="products-section">
        <template v-for="(category, index) in restaurant.categories" :key="index">
          <div v-if="category?.products.length > 0" class="row product-row" :id="category.id">
            <div class="col-12">
              <div class="product-title">
                <span class="material-symbols-outlined"> {{ category.emoji }} </span>
                <span class="category-name"> {{ category.name }} </span>
              </div>
            </div>
            <div class="col-12">
              <div class="row">
                <div class="col-xxl-6 col-md-6 col-12"  v-for="(product, index) in category.products" :key="index">
                  <CollapsedProductComponent :product="product" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <RouterView v-if="!isRestaurantLoading"/>
    <ShoppingCart v-if="!isRestaurantLoading"/>
  </div>
</template>
<script setup>
import useRestaurantById from '@/composables/useRestaurantById'

import RestaurantHeader from '../Components/RestaurantHeader.vue'
import CategoryComponent from '../Components/CategoryComponent.vue'
import CollapsedProductComponent from '../Components/CollapsedProductComponent.vue'
import ShoppingCart from '../Components/ShoppingCart.vue'
import { ref, onMounted } from 'vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
const isRestaurantLoading = ref(true)
const restaurantId = ref(route.params.id)
const restaurant = ref()

const isSearchVisible = ref(false)

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value
}

onMounted(async () => {
  restaurant.value = await useRestaurantById(restaurantId.value)
  setTimeout(() => {
  isRestaurantLoading.value = false
  }, 1000)
})
</script>

<style lang="sass">
@import url("/src/css/menu.sass")
</style>
