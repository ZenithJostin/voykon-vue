<template>
  <div :class="['menu', { visible: isVisible }]">
    <nav>
      <div class="menu-items">
        <router-link class="link-icon" to="enrutamiento">
          <div class="menu-item" :class="{ active: isActiveIcon('enrutamiento') }">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined"> signpost </span>
              <p>Enrutamiento</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
        <router-link class="link-icon" to="domicilios">
          <div class="menu-item" :class="{ active: isActiveIcon('domicilios') }">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined"> shopping_bag </span>
              <p>Domicilios</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
        <router-link class="link-icon" to="perfil">
          <div class="menu-item" :class="{ active: isActiveIcon('perfil') }">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined">person</span>
              <p>Ver perfil</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
        <router-link class="link-icon" to="/">
          <div class="menu-item">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined">map</span>
              <p>Barrios</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
        <router-link class="link-icon" to="/">
          <div class="menu-item">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined">settings</span>
              <p>Configuración</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
        <router-link class="link-icon" to="/">
          <div class="menu-item">
            <div class="menu-item-nav">
              <span class="material-symbols-outlined">logout</span>
              <p>Salir</p>
            </div>
            <span class="material-symbols-outlined">chevron_right</span>
          </div>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: true
  }
})

const route = useRoute()

const isActiveIcon = (iconType) => {
  return route.fullPath.includes(iconType)
}
</script>
