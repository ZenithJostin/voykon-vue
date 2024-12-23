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
    <section v-if="restaurants" class="restaurants-section">
      <template v-for="restaurant in restaurants" :key="restaurant.id">
        <div class="card-container">
          <div class="card">
            <router-link class="restaurant-card-img" :to="'/menu/' + restaurant.id">
              <img :src="`${apiBaseUrl}/storage/${restaurant.pic}`" alt="" />
            </router-link>
            <div class="restautant-card-info">
              <h2>{{ restaurant.name }}</h2>
              <span>{{ restaurant.products.length }} Productos disponibles</span>
            </div>
            <router-link class="restaurant-card-details" :to="'/menu/' + restaurant.id">
              <span class="material-symbols-outlined"> arrow_forward_ios </span>
            </router-link>
          </div>
        </div>
      </template>
    </section>
    <section v-else>
      <div class="loading-container">
        <span>Cargando...</span>
      </div>
    </section>
  </main>
  <footer>
    <span
      >Voykon | Todos los derechos reservados 2024 | desarrollado por
      <a href="https://zeniths.dev/">Zenith</a></span
    >
  </footer>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL

const restaurants = ref([])

const fetchRestaurants = async () => {
  const response = await axios.get(`${apiBaseUrl}/api/getRestaurantList`)
  restaurants.value = response.data
}
onMounted(() => {
  fetchRestaurants()
})
</script>

<style scoped>
@import url(/src/css/home.sass);
</style>
