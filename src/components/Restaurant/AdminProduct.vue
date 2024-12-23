<template>
  <form @submit.prevent="updateProduct(category, product)">
    <div class="product-content">
      <div class="main-info-product">
        <div class="img-product">
          <img
            :src="
              product.image
                ? `${apiBaseUrl}/storage/${product.image}`
                : '/src/assets/images/placeholder-image.jpg'
            "
            alt="Producto"
          />
          <input
            type="file"
            :id="`fileInput - ${categoryIndex} -${productIndex}`"
            @change="(event) => onImageChange(categoryIndex, productIndex, event)"
            style="display: none"
          />
          <div class="btn-img-product">
            <label
              :for="` fileInput - ${categoryIndex} -${productIndex} `"
              class="btn-edit-img"
            >
              <span class="material-symbols-outlined">edit_square</span>
            </label>
            <div
              class="btn-delete-img"
              @click="resetImage(categoryIndex, productIndex)"
            >
              <span class="material-symbols-outlined">close</span>
            </div>
          </div>
        </div>
        <div class="inpt-info-product">
          <div class="inp-first-col">
            <label for="name-product">Nombre</label>
            <input id="name-product" type="text" v-model="product.name" />
          </div>
          <div class="inp-first-col">
            <label for="price-product">Precio</label>
            <div class="price-input">
              <span class="currency-sign">$</span>
              <input
                id="price-product"
                type="text"
                v-model="product.price"
                @input="validateNumber('price-product')"
                placeholder="0.00"
              />
            </div>
          </div>
          <div class="inp-first-col">
            <label for="desc-product">Descripción</label>
            <textarea
              id="desc-product"
              type="text"
              v-model="product.description"
            ></textarea>
          </div>
          <div class="inp-first-col">
            <div class="check-off" :class="{ active: product.discount > 0 }">
              <div v-if="{ active: product.discount > 0 }" class="text-off-inpt">
                <label for="off-product">Descuento</label>
                <div class="discount-input">
                  <span class="currency-sign">$</span>
                  <input
                    id="off-product"
                    type="text"
                    v-model="product.discount"
                    @input="validateNumber('off-product')"
                    placeholder="0.00"
                  />
                </div>
                <p>Precio con el descuento</p>
              </div>
              <div class="check-off-inp">
                <input id="inp-off" type="checkbox" v-model="product.hasDiscount" />
                <label for="inp-off">Agregar Descuento</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="options-product">
        <div class="option-product option-product-one">
          <router-link :to="`/menu/product/${productIndex}`">
            <h4>+ Opciones de Producto <span>0</span></h4>
          </router-link>
          <p>Precios múltiples, extras, acompañamientos</p>
        </div>
        <div class="option-product option-product-two">
          <h4>+ Etiquetas <span>0</span></h4>
          <p>Agrega etiquetas para identificar tu producto</p>
        </div>
      </div>
      <div class="product-end-options">
        <div class="status-product">
          <label for="status-product">Estado</label>
          <div class="inp-dropdown">
            <div
              class="status-color"
              :class="product.state === 1 ? 'active' : 'inactive'"
            ></div>
            <select id="status-product" v-model="product.state">
              <option :value="1">Disponible</option>
              <option :value="2">Inactivo</option>
            </select>
          </div>
        </div>
        <div class="edit-product-buttons">
          <button type="submit" class="material-symbols-outlined save">save</button>
          <span
            class="material-symbols-outlined"
            @click.stop="copyProduct(categoryIndex, productIndex)"
            >content_copy</span
          >
          <span
            class="material-symbols-outlined deleted"
            @click.stop="openDeleteModal('product', categoryIndex, productIndex)"
            >delete_forever</span
          >
        </div>
      </div>
    </div>
  </form>
</template>
<script setup>
import { ref, defineProps } from 'vue';



const updateProduct = () => {
  
}
</script>