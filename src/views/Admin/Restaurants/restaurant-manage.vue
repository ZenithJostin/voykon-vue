<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>{{ sectionTitle }}</h1>
      <RouterLink class="delivery-export-btn" to="/administrador/restaurants">
        <span class="material-symbols-outlined"> arrow_back_ios </span> Regresar a listado
      </RouterLink>
    </div>
    <div class="main-manage-container pt-md-5 pt-3">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="row" autocomplete="off">
          <div class="col-md-8 form-group mb-3">
            <label class="form-label" for="name">Nombre del restaurante <span>*</span></label>
            <input type="text" id="name" v-model="data.name" class="form-control" required/>
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="status">Estado</label>
            <select name="" id="" class="form-control" v-model="data.status">
              <option v-for="(item, index) in userStatus" :key="index" :value="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="nit">NIT <span>*</span></label>
            <input type="number" id="nit" v-model="data.nit" class="form-control" required/>
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="email">Correo electrónico <span>*</span></label>
            <input type="email" id="email" v-model="data.email" class="form-control" />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="phone">Teléfono</label>
            <input type="number" id="phone" v-model="data.phone" class="form-control" />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="password">Contraseña <span>*</span></label>
            <input type="password" id="password" v-model="data.password" class="form-control" />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="password_confirmation"
              >Repite la contraseña <span>*</span></label
            >
            <input
              type="password"
              id="password_confirmation"
              v-model="data.password_confirmation"
              class="form-control"
            />
          </div>
          <div class="col-12 form-group py-3">
            <button type="submit" class="pink-button m-auto">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const route = useRoute()
const router = useRouter()

const userStatus = [
  { value: '', text: 'Inactivo' },
  { value: '1', text: 'Activo' }
]

const sectionTitle = route.params.id ? 'Editar restaurante' : 'Crear restaurante'

const data = ref({
  name: '',
  nit: '',
  phone: '',
  status: '',
  email: '',
  password: '',
  password_confirmation: '',
  type: '2'
})

const fetchData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/admin/restaurant/${route.params.id}`)
    data.value = response.data.user
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: error.response.data.message
    })
  }
}

const submitForm = async () => {
  const ApiRoute = route.params.id
    ? `${apiBaseUrl}/api/admin/restaurant/update/${route.params.id}`
    : `${apiBaseUrl}/api/admin/restaurant/register`
  data.value.type = '2'
  try {
    const response = await axios.post(ApiRoute, data.value)
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: response.data.message
    }).then(() => {
      router.push('/administrador/restaurants')
    })
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      // Aquí procesamos los errores para convertirlos en un string legible
      const errors = error.response.data.errors
      let errorMessage = 'Por favor corrija los siguientes errores: <br>'

      Object.keys(errors).forEach((key) => {
        errors[key].forEach((message) => {
          errorMessage += `- ${message}  <br>`
        })
      })

      Swal.fire({
        icon: 'error',
        title: '¡Error de Validación!',
        html: errorMessage,
        customClass: {
          popup: 'swal-wide' // opcional para darle más ancho al popup si hay muchos errores
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: error.response?.data?.message || 'Ha ocurrido un error inesperado.'
      })
    }
  }
}

onMounted(() => {
  if (route.params.id) {
    fetchData()
  }
})
</script>

<style>
@import url('/src/css/deliveries.sass');
</style>
