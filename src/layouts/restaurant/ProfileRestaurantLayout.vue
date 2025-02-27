<template>
  <section class="profile-section">
    <div class="profile-information-container" v-if="user">
      <form @submit.prevent="updateProfile">
        <div class="form-mid-container">
          <div class="col-12">
            <h4><strong>Información de usuario</strong></h4>
          </div>
          <div class="form-field restaurant-name">
            <label for="user-name">Nombre:</label>
            <input
              class="info-field"
              type="text"
              id="user-name"
              v-model="user.name"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-field restaurant-email">
            <label for="user-email">NIT:</label>
            <input class="info-field" type="number" id="user-email" v-model="user.nit" disabled />
          </div>
          <div class="form-field restaurant-number">
            <label for="user-number">Teléfono:</label>
            <input
              class="info-field"
              type="number"
              id="user-number"
              v-model="user.phone"
              :disabled="!isEditing"
            />
          </div>
          <div class="form-field restaurant-address">
            <label for="user-email">Correo:</label>
            <input class="info-field" type="email" id="user-email" v-model="user.email" disabled />
          </div>
          <div class="form-field">
            <h4>Tipos de Servicio</h4>
            <div class="service-type">
              <div class="name-service">
                <span class="material-symbols-outlined"> storefront </span>
                <p>En sitio</p>
              </div>
              <div class="option-site">
                <input type="checkbox" v-model="restaurantInfo.on_site" :disabled="!isEditing" />
              </div>
            </div>
            <div class="service-type">
              <div class="name-service">
                <span class="material-symbols-outlined"> local_mall </span>
                <p>Para llevar</p>
              </div>
              <div class="option-site">
                <input type="checkbox" v-model="restaurantInfo.to_go" :disabled="!isEditing" />
              </div>
            </div>
            <div class="service-type">
              <div class="name-service">
                <span class="material-symbols-outlined"> electric_moped </span>
                <p>A domicilio</p>
              </div>
              <div class="option-site">
                <input
                  type="checkbox"
                  v-model="restaurantInfo.home_delivery"
                  :disabled="!isEditing"
                />
              </div>
            </div>
            <div class="col-12">
              <hr />
            </div>
            <h4>Horarios</h4>
            <div
              v-for="(hours, day) in operatingHours"
              :key="day"
              class="hours d-flex align-items-center"
            >
              <div class="day-txt">
                <p>{{ day }}</p>
              </div>
              <div class="inpt-hours d-flex align-items-center">
                <span class="material-symbols-outlined"> schedule </span>
                <input type="time" v-model="hours.opening_time" :disabled="!isEditing" /> -
                <input type="time" v-model="hours.closing_time" :disabled="!isEditing" />
              </div>
            </div>
            <button type="button" @click="addOperatingHour" v-if="isEditing" class="pink-button">
              Añadir Horario
            </button> 
          </div>
          <div class="form-field">
            <div class="col-12 form-field w-100 pt-0">
              <h4>Tipos de pago aceptados</h4>
              <div class="service-type">
                <div class="name-service">
                  <span class="material-symbols-outlined"> payments </span>
                  <p>Efectivo</p>
                </div>
                <div class="option-site">
                  <input type="checkbox" v-model="restaurantInfo.accepts_cash" :disabled="!isEditing" />
                </div>
              </div>
              <div class="service-type">
                <div class="name-service">
                  <span class="material-symbols-outlined"> phone_iphone </span>
                  <p>Transferencia</p>
                </div>
                <div class="option-site">
                  <input type="checkbox" v-model="restaurantInfo.accepts_transfer" :disabled="!isEditing" />
                </div>
              </div>
              <div class="service-type">
                <div class="name-service">
                  <span class="material-symbols-outlined"> link </span>
                  <p>Pago Online</p>
                </div>
                <div class="option-site">
                  <input
                    type="checkbox"
                    v-model="restaurantInfo.accepts_online"
                    :disabled="!isEditing"
                  />
                </div>
              </div>
              <div class="service-type">
                <div class="name-service">
                  <span class="material-symbols-outlined"> credit_card </span>
                  <p>Tarjeta</p>
                </div>
                <div class="option-site">
                  <input
                    type="checkbox"
                    v-model="restaurantInfo.accepts_card"
                    :disabled="!isEditing"
                  />
                </div>
              </div>
            </div>           
          </div>
        </div>
        <div class="form-bottom-container">
          <button
            @click="toggleEditing"
            type="button"
            :class="`edit-button ${isEditing ? 'inactive' : 'active'}`"
          >
            {{ isEditing ? 'Cancelar' : 'Editar' }}
          </button>
          <button type="submit" v-if="isEditing" class="submit-button">Guardar</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const apiBaseUrl = import.meta.env.VITE_VUE_APP_API_URL
const user = ref(null)
const restaurantInfo = ref({ on_site: false, to_go: false, home_delivery: false })
const operatingHours = ref({})
const isEditing = ref(false)
const router = useRouter()

onMounted(async () => {
  try {
    const response = await axios.get(apiBaseUrl + '/api/profile', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') }
    })

    user.value = response.data.user

    // Verifica si restaurant_info existe, sino usa un objeto vacío con valores por defecto
    restaurantInfo.value = response.data.restaurant_info || {}

    // Asegurar que los valores booleanos existan
    restaurantInfo.value.on_site = response.data.restaurant_info?.on_site == '1' ? true : false
    restaurantInfo.value.to_go = response.data.restaurant_info?.to_go == '1' ? true : false
    restaurantInfo.value.home_delivery =
      response.data.restaurant_info?.home_delivery == '1' ? true : false
    restaurantInfo.value.accepts_cash = response.data.restaurant_info?.accepts_cash == '1' ? true : false
    restaurantInfo.value.accepts_transfer = response.data.restaurant_info?.accepts_transfer == '1' ? true : false
    restaurantInfo.value.accepts_card = response.data.restaurant_info?.accepts_card == '1' ? true : false
    restaurantInfo.value.accepts_online = response.data.restaurant_info?.accepts_online == '1' ? true : false
    

    // Procesar horarios de operación
    operatingHours.value = response.data.operating_hours.reduce((acc, oh) => {
      acc[oh.day_of_week] = {
        opening_time: oh.opening_time || '',
        closing_time: oh.closing_time || ''
      }
      return acc
    }, {})
  } catch (error) {
    console.error('Error obteniendo el perfil:', error)
  }
})

const updateProfile = async () => {
  try {
    await axios.post(
      apiBaseUrl + '/api/profile',
      {
        name: user.value.name,
        phone: user.value.phone,
        address: restaurantInfo.value.address,
        on_site: restaurantInfo.value.on_site,
        to_go: restaurantInfo.value.to_go,
        home_delivery: restaurantInfo.value.home_delivery,
        operating_hours: operatingHours.value,
        accepts_cash: restaurantInfo.value.accepts_cash,
        accepts_transfer: restaurantInfo.value.accepts_transfer,
        accepts_card: restaurantInfo.value.accepts_card,
        accepts_online: restaurantInfo.value.accepts_online,
      },
      {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('authToken') }
      }
    )
    isEditing.value = false
  } catch (error) {
    console.error('Error actualizando el perfil:', error)
  }
}

const toggleEditing = () => {
  isEditing.value = !isEditing.value
}

const addOperatingHour = () => {
  if (!isEditing.value) return
  const day = prompt('Ingrese el día de la semana (ej: Lunes)')
  if (day && !operatingHours.value[day]) {
    operatingHours.value[day] = { opening_time: '', closing_time: '' }
  }
}
</script>

<style scoped lang="sass">
@import '@/css/RestaurantProfile.sass'
</style>
