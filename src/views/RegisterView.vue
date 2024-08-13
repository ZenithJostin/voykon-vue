<template>
  <div class="login-view">
    <div class="first-view-login">
      <div class="content-first">
        <div class="logo-main">
          <img class="logo-d" src="/src/assets/images/Logo voykon.png" alt="" />
          <img class="logo-m" src="/src/assets/images/Logo Voykon Icon.png" alt="" />
        </div>
        <div class="title">
          <h3>Hola,<br /><span> ¡Bienvenido!</span></h3>
        </div>
      </div>
    </div>
    <div class="second-view-login">
      <div class="content-second">
        <div class="title-form">
          <h3>Registro</h3>
        </div>
        <div class="form-login">
          <form @submit.prevent="submitForm" class="form login">
            <div class="image-field">
              <label for="image-upload" class="image-upload">
                <img :src="imagePreview" alt="Imagen seleccionada" class="image-preview" />
              </label>
              <input ref="imageInput" id="image-upload" type="file" accept="image/*" @change="previewImage"
                style="display:none;" />
            </div>
            <div class="form-two-columns">
              <div class="form-field">
                <label for="nombre"><span class="material-symbols-outlined"> person </span></label>
                <input id="nombre" type="text" name="nombre" class="form-input" placeholder="Nombre" required
                  v-model="nombre" />
              </div>
              <div class="form-field">
                <label for="email"><span class="material-symbols-outlined"> email </span></label>
                <input id="email" type="email" name="email" class="form-input" placeholder="Correo Electrónico" required
                  v-model="email" />
              </div>
            </div>
            <div class="form-two-columns">
              <div class="form-field">
                <label for="celular"><span class="material-symbols-outlined"> phone </span></label>
                <input id="celular" type="tel" name="celular" class="form-input" placeholder="Celular" required
                  v-model="celular" @input="validateNumericInput($event)" />
              </div>
              <div class="form-field">
                <label for="cedula"><span class="material-symbols-outlined"> badge </span></label>
                <input id="cedula" type="text" name="cedula" class="form-input" placeholder="Cédula/NIT" required
                  v-model="cedula" @input="validateNumericInput($event)" />
              </div>
            </div>
            <div class="form-field-one">
              <label for="tipo"><span class="material-symbols-outlined"> account_circle </span></label>
              <select id="tipo" name="tipo" class="form-input" required v-model="tipo">
                <option value="" disabled selected>Seleccione Tipo</option>
                <option value="1">Administrador</option>
                <option value="2">Restaurante</option>
                <option value="3">Repartidor</option>
              </select>
            </div>
            <div class="form-two-columns">
              <div class="form-field">
                <label for="password"><span class="material-symbols-outlined"> lock </span></label>
                <input id="password" type="password" name="password" class="form-input" placeholder="Contraseña"
                  required v-model="password" />
              </div>
              <div class="form-field">
                <label for="confirm-password"><span class="material-symbols-outlined"> lock </span></label>
                <input id="confirm-password" type="password" name="confirm-password" class="form-input"
                  placeholder="Confirmación de Contraseña" required v-model="confirmPassword" />
              </div>
            </div>
            <span v-if="passwordMismatch" class="error-message">Las contraseñas no coinciden</span>
            <!-- Mostrar mensaje de éxito o error -->
            <div class="messagge-form" :class="{'active' : responseMessage}">
              <div v-if="responseMessage" :class="{ 'success-message': isSuccess, 'error-message': !isSuccess }">
                {{ responseMessage }}
              </div>
              
            </div>

            <div class="btn-submit">
              <input type="submit" value="Registrar Usuario" :disabled="passwordMismatch" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';

const validateNumericInput = (event) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
};

// Propiedades para manejar mensajes
const responseMessage = ref('');
const isSuccess = ref(false);
const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const nombre = ref('');
const email = ref('');
const celular = ref('');
const cedula = ref('');
const tipo = ref('');
const password = ref('');
const confirmPassword = ref('');

const imagePreview = ref('/src/assets/images/image-profile-placeholder.jpg');
const imageFile = ref('');

const passwordMismatch = computed(() => password.value !== confirmPassword.value && confirmPassword.value !== '');

const previewImage = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const submitForm = async () => {
  if (!passwordMismatch.value) {
    try {
      const formData = new FormData();
      formData.append('name', nombre.value);
      formData.append('type', parseInt(tipo.value));
      formData.append('nit', cedula.value);
      formData.append('phone', celular.value);
      formData.append('status', 1);
      formData.append('pic', imageFile.value);
      formData.append('email', email.value);
      formData.append('password', password.value);
      formData.append('password_confirmation', confirmPassword.value);

      const response = await axios.post(`${apiBaseUrl}/api/user/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      isSuccess.value = true;
      responseMessage.value = response.data.message;

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        responseMessage.value = '';
      }, 4000);

    } catch (error) {
      isSuccess.value = false;
      responseMessage.value = error.response?.data?.errors?.email?.[0] || 'Error al registrar el usuario';

      // Ocultar el mensaje después de 2 segundos
      setTimeout(() => {
        responseMessage.value = '';
      }, 4000);
    }
  }
};
</script>

<style lang="sass" scoped>
@import url("/src/css/register.sass")

</style>
