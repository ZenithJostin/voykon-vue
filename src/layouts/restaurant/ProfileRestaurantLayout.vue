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
              <div class="form-field restaurant-name">
                <label for="user-name">Nombre:</label>
                <input class="info-field" type="text" id="user-name" :value="user.user_name" :disabled="fieldActive" />
              </div>
              <div class="form-field restaurant-email">
                <label for="user-email">Correo:</label>
                <input class="info-field" type="email" id="user-email" :value="user.user_email"
                  :disabled="fieldActive" />
              </div>
              <div class="form-field restaurant-number">
                <label for="user-number">Teléfono:</label>
                <input class="info-field" type="number" id="user-number" :value="user.user_number"
                  :disabled="fieldActive" />
              </div>
              <div class="form-field restaurant-address">
                <label for="user-name">Dirección:</label>
                <input class="info-field" type="text" id="user-name" :value="user.user_address"
                  :disabled="fieldActive" />
              </div>
              <div class="form-field">
                <h4>Tipos de Servicio</h4>
                <div class="service-type">
                  <div class="name-service">
                    <span class="material-symbols-outlined"> storefront </span>
                    <p>En sitio</p>
                  </div>
                  <div class="option-site">
                    <label class="check-cont">
                      <div class="checkbox-icon">
                        <input type="checkbox" value="None" id="insite" name="check" :checked="user.user_check"
                          :disabled="fieldActive" />
                        <label for="insite"></label>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="service-type">
                  <div class="name-service">
                    <span class="material-symbols-outlined"> local_mall </span>
                    <p>Para llevar</p>
                  </div>
                  <div class="option-site">
                    <label class="check-cont">
                      <div class="checkbox-icon">
                        <input type="checkbox" value="None" id="togo" name="check" :checked="user.user_check"
                          :disabled="fieldActive" />
                        <label for="togo"></label>
                      </div>
                    </label>
                  </div>
                </div>
                <div class="service-type service-delivery">
                  <div class="service">
                    <div class="name-service">
                      <span class="material-symbols-outlined"> electric_moped </span>
                      <p>A domicilio</p>
                    </div>
                    <div class="option-site">
                      <label class="check-cont">
                        <div class="checkbox-icon">
                          <input type="checkbox" value="None" id="delivery" name="check" :checked="user.user_check"
                            :disabled="fieldActive" />
                          <label for="delivery"></label>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div class="time-delivery">
                    <div class="time-text">
                      <span class="material-symbols-outlined"> schedule </span>
                      <p>Tiempo de entrega a domicilio</p>
                    </div>
                    <input type="text" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
              </div>
              <div class="form-field">
                <h4>Horarios</h4>
                <div class="hours">
                  <div class="day-txt">
                    <p>Lunes</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                
                <div class="hours">
                  <div class="day-txt">
                    <p>Martes</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                <div class="hours">
                  <div class="day-txt">
                    <p>Miercoles</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                <div class="hours">
                  <div class="day-txt">
                    <p>Jueves</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                <div class="hours">
                  <div class="day-txt">
                    <p>Viernes</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                <div class="hours">
                  <div class="day-txt">
                    <p>Sabado</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
                <div class="hours">
                  <div class="day-txt">
                    <p>Domingo</p>
                  </div>
                  <div class="inpt-hours">
                    <span class="material-symbols-outlined"> schedule </span>
                    <input type="text" id="hours" value="25 - 45 minutos" :disabled="fieldActive" />
                  </div>
                </div>
              </div>
            </div>
            <div class="form-bottom-container">
              <button @click="activateBtn" type="button" :class="`edit-button  ${isActive}`">
                Editar
              </button>
              <button @click="cancel" type="button" :class="`cancel-button  ${isInactive}`">
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
<script setup>
  import * as testusers from '/src/composables/testUser.js'
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'

  const users = testusers.users

  const isActive = ref('active')
  const isInactive = ref('inactive')
  const activate = ref(true)
  const fieldActive = ref(true)
  const router = useRouter()

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
  const cancel = () => {
    router.go(0)
  }
</script>
<style scoped lang="sass">
  @import '@/css/RestaurantProfile.sass'
</style>