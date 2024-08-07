<template>
  <div class="container">
    <div class="menu-main-container">
      <RestaurantHeader />
      <div class="categories-row">
        <div class="search-bx">
          <input type="text">
          <span class="material-symbols-outlined">
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
        </div>
      </div>
      <div class="products-section">
        <div class="row">
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
        <div class="row">
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
        <div class="row">
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
        <div class="row">
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
  </div>
</template>
<script setup>
import RestaurantHeader from '../Components/RestaurantHeader.vue';
import CategoryComponent from '../Components/CategoryComponent.vue';
import CollapsedProductComponent from '../Components/CollapsedProductComponent.vue';
</script>

<style lang="sass">
  @import url("/src/css/menu.sass")
</style>