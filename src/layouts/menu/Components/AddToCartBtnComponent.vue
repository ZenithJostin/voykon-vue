<template>
  <button @click="activateProductModal" class="add-to-cart-btn">
    <span class="material-symbols-outlined"> add_circle </span>
  </button>

  <dialog ref="productModal" class="product-modal">
    <div class="product-modal-body">
      <div class="product-picture">
        <img src="/src/assets/images/menu-bg.jpg" alt="" />
      </div>
      <div class="modal-product-info">
            <div class="product-modal-header">
                <h2>Producto</h2>
                <span @click="activateProductModal" class="material-symbols-outlined"> cancel </span>
            </div>
            <div class="product-modal-content">
                <div class="product-description">
                    <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quae culpa odio
                    modi, ratione, in officiis impedit quisquam corporis quasi dolores doloribus
                    </p>
                    <span>$11.000</span>
                </div>
                <div class="product-form">
                    <div class="product-tittle">
                        <div class="product-text">
                            <h3>Elije tu opción preferida!</h3>
                            <span>Seleccione mínimo 1 opción</span>
                        </div>
                        <div class="product-sign">
                          <span>Obligatorio</span>
                        </div>
                    </div>
                    <form action="#">
                      <div class="product-option">
                        <div class="input-text">
                          <p>Opción 1</p>
                          <span>$11.000</span>
                        </div>
                        <input type="checkbox" name="product-option">
                      </div>
                      <div class="product-option">
                        <div class="input-text">
                          <p>Opción 2</p>
                          <span>$13.000</span>
                        </div>
                        <input type="checkbox" name="product-option">
                      </div>
                      <div class="product-option">
                        <div class="input-text">
                          <p>Opción 1</p>
                          <span>$15.000</span>
                        </div>
                        <input type="checkbox" name="product-option">
                      </div>
                      <div class="product-comments">
                        <label for="product-comments">Comentarios Adicionales</label>
                        <textarea name="product-comments" id="product-comments" placeholder="(Opcional)"></textarea>
                      </div>
                    </form>
                </div>
            </div>
            <div class="product-modal-footer">
              <AddProductComponent/>
              <button type="button">Agregar T/$11.000</button>
            </div>
        </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
import AddProductComponent from './AddProductComponent.vue'

const activeProduct = ref(false)
const productModal = ref(null)

const activateProductModal = () => {
  activeProduct.value = !activeProduct.value
  if (activeProduct.value) {
    productModal.value.showModal()
  } else {
    productModal.value.close()
  }
}
</script>
