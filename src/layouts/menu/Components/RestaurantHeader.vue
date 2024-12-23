<template>
  <header>
    <div class="header-banner">
      <img :src="`${apiBaseUrl}/storage/${props.restaurant.bg_pic}`" alt="" class="header-bg-image" />
      <div class="restaurant-status">
        <i class="material-symbols-outlined red"> radio_button_checked </i>
        <span class="restaurant-status-text"> Cerrado </span>
      </div>
    </div>
    <div class="header-info">
      <div class="restaurant-info">
        <div class="brand">
          <img :src="`${apiBaseUrl}/storage/${props.restaurant.pic}`" alt="" />
        </div>
        <div class="info">
          <div class="info-row">
            <h2 class="restaurant-name">{{ props.restaurant.name }}</h2>
            <!-- <span class="material-symbols-outlined restaurant-info-btn"> info </span> -->
            <!-- <span class="material-symbols-outlined restaurant-share-btn"> share </span> -->
          </div>
          <div class="info-row">
            <div class="pills">
              <div class="pill">
                <span class="material-symbols-outlined"> two_wheeler </span>
                <span class="pill-text"> 25 - 45 min </span>
              </div>
              <div class="pill">
                <span class="material-symbols-outlined"> location_on </span>
                <span class="pill-text"> Ver mapa </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="social-media-links">
        <a v-if="props.restaurant?.restaurant_info?.facebook" :href="props.restaurant.restaurant_info.facebook" target="_blank"><i class="fa-brands fa-facebook"></i></a>
        <a v-if="props.restaurant?.restaurant_info?.instagam" :href="props.restaurant.restaurant_info.instagam" target="_blank"><i class="fa-brands fa-instagram"></i></a>
        <a v-if="props.restaurant?.restaurant_info?.tiktok" :href="props.restaurant.restaurant_info.tiktok" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
        <a v-if="props.restaurant?.restaurant_info?.whatsapp" :href="props.restaurant.restaurant_info.whatsapp" target="_blank"><i class="fa-brands fa-tiktok"></i></a>
      </div>
    </div>
  </header>
</template>
<script setup>
import { defineProps } from 'vue'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const props = defineProps(['restaurant'])
</script>
