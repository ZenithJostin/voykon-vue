<template>
  <div class="container">
    <div class="menu-main-container">
      <RestaurantHeader />
      <div class="categories-row">
        <div class="search-bx">
          <input type="text" :class=" isSearchVisible ? 'active' : '' ">
          <span class="material-symbols-outlined" @click="toggleSearch">
            search
          </span>
        </div>
        <div class="categories-bx">
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
          <CategoryComponent />
        </div>
      </div>
      <div class="products-section">
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
        <div class="row product-row">
          <div class="col-12">
            <div class="product-title">
              <span class="material-symbols-outlined"> lunch_dining </span>
              <span class="category-name"> Categoria </span>
            </div>
          </div>
          <div class="col-12">
            <div class="row">
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
              <div class="col-xxl-6 col-md-6 col-12">
                <CollapsedProductComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <RouterView/>
    <ShoppingCart/>
  </div>
</template>
<script setup>
import RestaurantHeader from '../Components/RestaurantHeader.vue';
import CategoryComponent from '../Components/CategoryComponent.vue';
import CollapsedProductComponent from '../Components/CollapsedProductComponent.vue';
import ShoppingCart from '../Components/ShoppingCart.vue';
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const isSearchVisible = ref(false);

const toggleSearch = () => {
  isSearchVisible.value = !isSearchVisible.value;
}
</script>

<style lang="sass">
  @import url("/src/css/menu.sass")
</style>