<template>
  <div class="header">
    <div class="logo-header">
      <RouterLink to="/"><img src="/src/assets/images/Logo-voykon-white.png" alt=""></RouterLink>
      
    </div>
    <template v-for="user in users" :key="user.user_id">
      <div class="info-user">
        <div class="name-user">
          <h2>{{ user.user_name }}</h2>
          <div class="status-user">
            <p>{{ statusUser }}</p>
            <div :class="checkStatus(user.user_status)"></div>
          </div>
        </div>
        <div class="image-user">
          <img :src="user.user_image" alt="user-profile">
        </div>
      </div>
    </template>

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { ref } from "vue";
import * as testUser from "/src/composables/testUser.js";

const users = testUser.users;

const statusUser = ref('Estado')

const checkStatus = (status) => {
  if (status === 1 ){
    statusUser.value = 'Disponible'
    return 'color-status active'
  }else{
    statusUser.value = 'Inactivo'
    return 'color-status inactive';
  }
};
</script>