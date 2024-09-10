<template>
  <main class="view-order-container">
    <nav class="view-order-header">
      <div class="nav-container">
        <div class="go-back-menu">
          <router-link :to="{ name: 'Menu layout' }">
            <span class="material-symbols-outlined"> undo </span>
          </router-link>
          <p>Atrás</p>
        </div>
        <div class="order-info-menu">
          <p>Su carrito</p>
          <span>Total: $11.000</span>
        </div>
      </div>
    </nav>
    <section class="view-order-section">
      <div class="order-container">
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
        <div class="order-item">
          <div class="order-item-information">
            <div class="order-image">
              <img src="/src/assets/images/Logo-BK.png" alt="Imagen de producto" />
            </div>
            <div class="order-tittle">
              <p>Producto</p>
              <span>$11.000</span>
            </div>
          </div>
          <AddProductComponent />
        </div>
      </div>
    </section>
    <div class="order-service-container">
      <span>Selecciona el tipo de servicio:</span>
      <div class="services-container">
        <button @click="activateOrderModal" type="button" class="service-btn on-site">
          En sitio
        </button>
        <button @click="activateOrderModal" type="button" class="service-btn delivery">
          A domicilio
        </button>
        <button @click="activateOrderModal" type="button" class="service-btn pickup">
          Recogida en local
        </button>
      </div>
    </div>

    <dialog ref="orderModal" class="order-modal">
      <div class="order-modal-header">
        <h2>Sus Datos</h2>
        <span @click="activateOrderModal" class="material-symbols-outlined"> cancel </span>
      </div>
      <div class="order-modal-body">
        <form action="#">
          <div class="customer-order-information">
            <div class="input-field">
              <label for="customer_name">Su nombre</label>
              <input name="customer_name" type="text" />
            </div>
            <div class="input-field-number">
              <label for="customer_phone">Su teléfono</label>
              <div class="phone-country-id">
                <img src="/src/assets/images/colombia.png" alt="Imagen bandera de Colombia">
                <span>+57</span>
              </div>
              <input name="customer_phone" type="number" />
            </div>
          </div>
          <div class="address-order-information">
            <h3>Su Dirección</h3>
            <div class="input-field">
              <label for="customer_neighborhood">Barrio</label>
              <input name="customer_neighborhood" type="text" />
            </div>
            <div class="input-field">
              <label for="customer_street">Calle</label>
              <input name="customer_street" type="text" />
            </div>
            <div class="input-field">
              <label for="customer_street_number">Número</label>
              <input name="customer_street_number" type="number" />
            </div>
            <div class="input-field">
              <label for="customer_street_complement">Complemento</label>
              <input name="customer_street_complement" type="text" />
            </div>
            <div class="input-field">
              <label for="address_reference">Referencia (Opcional)</label>
              <textarea name="address_reference"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="order-modal-footer">
        <span>Total: $11.000</span>
        <button type="button">Confirmar Pedido</button>
      </div>
    </dialog>
  </main>
</template>

<style>
@import url(/src/css/viewOrderMenu.sass);
</style>

<script setup>
import AddProductComponent from '../Components/AddProductComponent.vue'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeOrderModal = ref(false)
const orderModal = ref(null)

const activateOrderModal = () => {
  activeOrderModal.value = !activeOrderModal.value
  if (activeOrderModal.value) {
    orderModal.value.showModal()
  } else {
    orderModal.value.close()
  }
}
</script>
