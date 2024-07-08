<!-- HeaderApp.vue -->
<template>
    <div class="header">
        <div class="logo-header">
            <RouterLink to="/"><img src="/src/assets/images/Logo-voykon-white.png" class="logo-dk"
                    alt="Logo Voykon Horizontal"></RouterLink>
            <RouterLink to="/"><img src="/src/assets/images/Logo-Voykon-Icon-White.png" class="logo-mb"
                    alt="Logo Voykon Icon MB"></RouterLink>
        </div>
        <div class="nav-header">
            <template v-for="user in users" :key="user.user_id">
                <div class="info-user">
                    <div class="name-user">
                        <h2>{{ user.user_name }}</h2>
                        <div class="status-user" @click="changeStatus(user)">
                            <p>{{ user.user_status === 1 ? 'Disponible' : 'Inactivo' }}</p>
                            <div :class="checkStatus(user.user_status)"></div>
                        </div>
                    </div>
                    <RouterLink to="/repartidor/perfil">
                        <div class="image-user">
                            <img :src="user.user_image" alt="user-profile">
                        </div>
                    </RouterLink>
                </div>
            </template>
            <div class="menu-mb" @click="toggleMenu">
                <span class="material-symbols-outlined">menu</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from "vue";
import * as testUser from "/src/composables/testUser.js";
import { defineEmits } from 'vue';

const users = ref(testUser.users);

const checkStatus = (status) => {
    return status === 1 ? 'color-status active' : 'color-status inactive';
};

const changeStatus = (user) => {
    if (user.user_status === 1) {
        user.user_status = 2;
    } else {
        user.user_status = 1;
    }
};

const emit = defineEmits(['toggle-menu']);

const toggleMenu = () => {
    emit('toggle-menu');
};
</script>
