<template>
    <section class="profile-section">
      <div class="profile-information-container">
        <template v-for="user in users" :key="user.user_id">
          <template v-if="user.user_logged === true">
          <form action="#">
            <div class="form-top-container">
              <div class="image-container info-field" disabled>
                <img :src="user.user_image" alt="Imagen de perfil" />
              </div>
            </div>
            <div class="form-mid-container">
              <div class="form-field profile-name">
                <label for="user-name">Nombre:</label>
                <input
                  class="info-field"
                  type="text"
                  id="user-name"
                  :value="user.user_name"
                  :disabled="fieldActive"
                />
              </div>
              <div class="form-field profile-lastname">
                <label for="user-lastname">Apellidos:</label>
                <input
                  class="info-field"
                  type="text"
                  id="user-lastname"
                  :value="user.user_lastname"
                  :disabled="fieldActive"
                />
              </div>
              <div class="form-field profile-number">
                <label for="user-number">Teléfono:</label>
                <input
                  class="info-field"
                  type="number"
                  id="user-number"
                  :value="user.user_number"
                  :disabled="fieldActive"
                />
              </div>
              <div class="form-field profile-gender">
                <label for="user-gender">Género:</label>
                <select class="info-field" name="user-gender" id="user-gender" :disabled="fieldActive">
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
              <div class="form-field profile-email">
                <label for="user-email">Correo:</label>
                <input
                  class="info-field"
                  type="email"
                  id="user-email"
                  :value="user.user_email"
                  :disabled="fieldActive"
                />
              </div>
              <div class="form-field profile-age">
                <label for="user-age">Edad:</label>
                <input
                  class="info-field"
                  type="number"
                  id="user-age"
                  :value="user.user_age"
                  :disabled="fieldActive"
                />
              </div>
              <div class="form-field profile-description">
                <label for="user-description">Descripción:</label>
                <textarea
                  class="info-field"
                  name="user-description"
                  id="user-description"
                  :value="user.user_description"
                  :disabled="fieldActive"
                ></textarea>
              </div>
            </div>
            <div class="form-bottom-container">
              <button @click="activateBtn" type="button" :class="`edit-button  ${isActive}`">
                Editar
              </button>
              <button @click="activateBtn" type="button" :class="`cancel-button  ${isInactive}`">
                Cancelar
              </button>
              <button type="submit" :class="`submit-button  ${isInactive}`">Guardar</button>
            </div>
          </form>
        </template>
      </template>
      </div>
    </section>
  </template>
  
  <style>
  @import url(/src/css/profile.sass);
  </style>
  
  <script setup>
  import * as testusers from '/src/composables/testUser.js'
  import { ref } from 'vue'
  
  const users = testusers.users
  
  const isActive = ref('active')
  const isInactive = ref('inactive')
  const activate = ref(true)
  const fieldActive = ref(true)
  
  const activateBtn = () => {
    activate.value = !activate.value
    if (activate.value) {
      isActive.value = 'active'
      isInactive.value = 'inactive'
      fieldActive.value = true
    } else {
      isActive.value = 'inactive'
      isInactive.value = 'active'
      fieldActive.value = false
    }
  }
  </script>
  