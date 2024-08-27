<template>
  <header class="navbar-container">
    <nav>
        <img src="/src/assets/images/Logo-Voykon-Icon-White.png" alt="Imagen de marca Voykon" />
        <h1>Voykon</h1>
    </nav>
  </header>
  <main class="main-content">
    <div class="restaurant-hero">
      <video autoplay muted loop class="video-bg">
        <source src="@/assets/homeVideo.mp4" type="video/mp4" />
      </video>
      <div class="overlay"></div>
      <div class="hero-content">
        <span>Conoce a nuestros restaurantes aliados</span>
      </div>
    </div>
    <section class="restaurants-section">
      <template v-for="restaurant in restaurants" :key="restaurant.restaurant_id">
        <div class="card-container">
          <div class="card">
            <div class="restaurant-card-img">
              <img :src="restaurant.restaurant_img" alt="" />
            </div>
            <div class="restautant-card-info">
              <h2>{{ restaurant.restaurant_name }}</h2>
              <span>{{ restaurant.restaurant_available_items }} Items disponibles</span>
            </div>
            <div class="restaurant-card-details">
              <span class="material-symbols-outlined"> arrow_forward_ios </span>
            </div>
          </div>
        </div>
      </template>
    </section>
  </main>
  <footer>
    <span>Voykon | Todos los derechos reservados 2024 | desarrollado por <a href="https://zeniths.dev/">Zenith</a></span>
  </footer>
</template>

<script setup>
import * as testRestaurant from '/src/composables/testRestaurants.js'

const restaurants = testRestaurant.restaurants
</script>

<style scoped>
@import url(/src/css/home.sass);
</style>
