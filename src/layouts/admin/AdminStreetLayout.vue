<template>
  <div class="addresses-section">
    <div class="addresses-container">
      <div class="title-container">
        <h1>Lista de barrios</h1>
        <router-link :to="{name:'AdminStreetRegistration'}">
          <button>Registrar barrio</button>
        </router-link>
      </div>
      <div class="table-container">
        <table class="addresses-table">
          <thead>
            <tr>
              <th>Barrio</th>
              <th>Dirección</th>
              <th>Departamento</th>
              <th>Ciudad</th>
              <th>Código Postal</th>
              <th>Longitud</th>
              <th>Latitud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="address in addresses" :key="address.address_id">
              <tr>
                <td>
                  <p>{{ address.address_name }}</p>
                </td>
                <td>
                  <p>{{ address.address_street }}</p>
                </td>
                <td>
                  <div>
                    <p>{{ address.address_department }}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{{ address.address_city }}</p>
                  </div>
                </td>
                <td>
                  <p>{{ address.address_postal_code }}</p>
                </td>
                <td>
                  <p>{{ address.address_lat }}</p>
                </td>
                <td>
                  <p>{{ address.address_long }}</p>
                </td>
                <td>
                  <div class="table-actions">
                    <button><span class="material-symbols-outlined"> edit </span></button>
                    <button><span class="material-symbols-outlined"> visibility </span></button>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import * as testAddress from '/src/composables/testAddresses.js'

const addresses = testAddress.addresses

</script>

<style>
@import url(/src/css/forms.sass);
</style>
