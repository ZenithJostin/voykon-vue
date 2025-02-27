<template>
  <div class="deliveries-container">
    <div class="title-container">
      <h1>{{ sectionTitle }}</h1>
      <RouterLink class="delivery-export-btn" to="/administrador/barrios">
        <span class="material-symbols-outlined"> arrow_back_ios </span> Regresar a listado
      </RouterLink>
    </div>
    <div class="main-manage-container pt-md-5 pt-3">
      <div class="form-container">
        <form @submit.prevent="submitForm" class="row" autocomplete="off">
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="name">Barrio <span>*</span></label>
            <input type="text" id="name" v-model="data.name" class="form-control" required />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="state">Departamento</label>
            <input type="text" id="state" v-model="data.state" class="form-control" />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="price">Valor de domicilio <span>*</span></label>
            <input type="number" id="price" v-model="data.price" class="form-control" required />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="delivery_price"
              >Valor de domicilio (domiciliarios)<span>*</span></label
            >
            <input
              type="number"
              id="delivery_price"
              v-model="data.delivery_price"
              class="form-control"
              required
            />
          </div>
          <div class="col-md-4 form-group mb-3">
            <label class="form-label" for="delivery_time"
              >Tiempo de entrega (minutos)<span>*</span></label
            >
            <input
              type="number"
              id="delivery_time"
              v-model="data.delivery_time"
              class="form-control"
              required
            />
          </div>
          <div class="col-12 form-group py-3">
            <button type="submit" class="pink-button m-auto">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    <div class="col-12">
      <h3>Precios por restaurante:</h3>
      <div class="row" v-if="restaurants">
        <div v-for="restaurant in restaurants" :key="restaurant.id" class="col-md-6 p-3">
          <PriceForm :neighborhoodId="route.params.id" :restaurantId="restaurant.id" :restaurantName="restaurant.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'
import PriceForm from '@/components/Admin/Neighborhoods/PriceForm.vue'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const route = useRoute()
const router = useRouter()

const sectionTitle = route.params.id ? 'Editar barrio' : 'Crear barrio'

const data = ref({
  name: '',
  state: '',
  price: '',
  delivery_price: '',
  delivery_time: ''
})

const fetchData = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/admin/neighborhoods/${route.params.id}`)
    data.value = response.data
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
    ? `${apiBaseUrl}/api/admin/neighborhoods/update/${route.params.id}`
    : `${apiBaseUrl}/api/admin/neighborhoods/register`
  data.value.type = '2'
  try {
    const response = await axios.post(ApiRoute, data.value)
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: response.data.message
    }).then(() => {
      router.push('/administrador/barrios')
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

const restaurants = ref()

const fetchRestaurants = async () => {
  try{
    const response = await axios.get(apiBaseUrl + '/api/admin/restaurants/')
    restaurants.value = response.data.restaurants
    console.log(restaurants.value)
  }catch(error){
    console.log(error)
  }
}

onMounted(() => {
  if (route.params.id) {
    fetchData()
    fetchRestaurants()
  }
})
</script>

<style>
@import url('/src/css/deliveries.sass');
</style>
