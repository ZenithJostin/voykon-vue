<template>
  <div class="login-view">
    <div class="first-view-login">
      <div class="content-first">
        <div class="logo-main">
          <img class="logo-d" src="/src/assets/images/Logo voykon.png" alt="" />
          <img class="logo-m" src="/src/assets/images/Logo Voykon Icon.png" alt="" />
        </div>
        <div class="title">
          <h3>Hola,<br /><span> Bienvenido!</span></h3>
        </div>
      </div>
    </div>
    <div class="second-view-login">
      <div class="content-second">
        <div class="title-form">
          <h3>Ingreso</h3>
        </div>
        <div class="form-login">
          <form @submit.prevent="login" class="form login">
            <div class="form-field">
              <label for="login-email"><span class="material-symbols-outlined"> person </span></label>
              <input v-model="email" autocomplete="username" id="login-email" type="email" name="email" class="form-input"
                placeholder="Correo Electrónico" required />
            </div>

            <div class="form-field">
              <label for="login-pass"><span class="material-symbols-outlined"> lock </span></label>
              <input v-model="password" id="login-pass" type="password" name="password" class="form-input" placeholder="Contraseña"
                required />
            </div>
            <div class="check-remember">
              <div class="btn-checker"><input id="inp-check" type="checkbox"><label for="inp-check">Recordarme</label></div>
              <a href="">¿Olvidó su contraseña?</a>
            </div>
            <div class="btn-submit">
              <input type="submit" value="Ingresar" />
            </div>
            
            <!-- Mostrar mensaje de éxito o error -->
            <div class="messagge-form" :class="{'active' : errorMessage}">
              <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL;

const login = async () => {

  try {
    // Enviar solicitud de inicio de sesión
    const response = await axios.post(`${apiBaseUrl}/api/user/login`, {
      email: email.value,
      password: password.value
    });


    if (response.data.token) {
      // Almacenar el token
      localStorage.setItem('authToken', response.data.token);

      // Obtener la información del usuario usando el token
      const userResponse = await axios.get(`${apiBaseUrl}/api/user`, {
        headers: { Authorization: `Bearer ${response.data.token}` }
      });


      if (userResponse.data) {
        const userId = userResponse.data.id;

        // Redirigir al usuario a la ruta con su ID
        router.push(`/${userId}/administrador/`);
      } else {
        throw new Error('No se pudo obtener la información del usuario.');
      }
    } else {
      throw new Error('Token no recibido');
    }
  } catch (error) {
    console.error('Error in login function:', error); // Verifica los errores
    if (error.response && error.response.data.errors) {
      errorMessage.value = Object.values(error.response.data.errors).flat().join(', ');
    } else {
      errorMessage.value = 'Usuario no registrado o no autorizado.';
    }

    setTimeout(() => {
      errorMessage.value = '';
    }, 4000);
  }
};

</script>




<style lang="sass" scoped>
@import url("/src/css/login.sass")

.error-message
  color: red
  font-size: 0.9em
  margin-top: 10px
</style>
