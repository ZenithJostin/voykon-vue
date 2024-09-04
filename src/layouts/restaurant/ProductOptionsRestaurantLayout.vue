<template>
  <div class="menu-product-option">
    <div class="menu-option-container">
      <div class="title-options">
        <h2>Producto</h2><br>
        <p>Edita o crea las opciones para tu producto a continuación</p>
      </div>
      <div class="options-buttons">
        <div class="btn-add-option btn-options" @click="addOption">
          <p>+ Agregar Opción</p>
        </div>
        <div class="btn-view-menu btn-options">
          <span class="material-symbols-outlined">visibility</span>
          <router-link to="/restaurante/menu">Volver al Menú</router-link>
        </div>
      </div>
      <div class="menu-options">
        <template v-for="(option, index) in options" :key="index">
          <div class="menu-option">
            <div class="header-option" :class="{ active: option.isExpanded }" @click="toggleOption(index)">
              <div class="info-head-option">
                <span class="material-symbols-outlined" @click.stop="moveOptionProduct(index, 'up')">
                  keyboard_arrow_up
                </span>
                <span class="material-symbols-outlined" @click.stop="moveOptionProduct(index, 'down')">
                  keyboard_arrow_down
                </span>
                <h3>{{ option.title }}</h3>
              </div>
            </div>
            <transition name="expand" @before-enter="beforeEnter" @enter="enter" @leave="leave">
              <div v-show="option.isExpanded" :class="['option-container', { expanded: option.isExpanded }]"
                ref="container">
                <div class="option-content">
                  <div class="main-info-option">
                    <div class="img-option">
                      <img :src="option.image || '/src/assets/images/placeholder-image.jpg'" alt="Opcion" />
                      <input type="file" :id="`fileInput-${index}`" @change="event => onImageChange(index, event)"
                        style="display: none;">
                      <div class="btn-img-option">
                        <label :for="`fileInput-${index}`" class="btn-edit-img">
                          <span class="material-symbols-outlined">edit_square</span>
                        </label>
                        <div class="btn-delete-img" @click="resetImage(index)">
                          <span class="material-symbols-outlined">close</span>
                        </div>
                      </div>
                    </div>
                    <div class="inpt-info-option">
                      <div class="inp-first-col">
                        <label for="name-option">Nombre</label>
                        <input id="name-option" type="text" v-model="option.title">
                      </div>
                      <div class="inp-first-col">
                        <label for="price-option">Precio</label>
                        <div class="price-input">
                          <span class="currency-sign">$</span>
                          <input id="price-option" type="text" v-model="option.price"
                            @input="validateNumber('price-option')" pattern="\d*" placeholder="0.00">
                        </div>
                      </div>
                      <div class="inp-first-col">
                        <label for="desc-option">Descripción</label>
                        <textarea id="desc-option" type="text" v-model="option.description"></textarea>
                      </div>
                      <div class="inp-first-col">
                        <div :class="`check-off ${option.hasDiscount || 'active'}`">
                          <div v-if="option.hasDiscount" class="text-off-inpt">
                            <label for="off-option">Descuento</label>
                            <div class="discount-input">
                              <span class="currency-sign">$</span>
                              <input id="off-option" type="text" v-model="option.discount"
                                @input="validateNumber('off-option')" pattern="\d*" placeholder="0.00">
                            </div>
                            <p>Precio con el descuento</p>
                          </div>
                          <div class="check-off-inp">
                            <input id="inp-off" type="checkbox" v-model="option.hasDiscount">
                            <label for="inp-off">Agregar Descuento</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="option-end-options">
                    <div class="status-option">
                      <label for="status-option">Estado</label>
                      <div class="inp-dropdown">
                        <div :class="['status-color', option.status === 'Disponible' ? 'active' : 'inactive']"></div>
                        <select id="status-option" name="status-option" v-model="option.status">
                          <option value="Disponible">Disponible</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                    </div>
                    <div class="edit-option-buttons">
                      <span class="material-symbols-outlined">save</span>
                      <span class="material-symbols-outlined" @click.stop="copyOption(index)">content_copy</span>
                      <span class="material-symbols-outlined deleted"
                        @click.stop="openDeleteModal('option', index)">delete_forever</span>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <!-- Modal de confirmación -->
          <div v-if="showDeleteModal" class="modal-overlay">
            <div class="modal-content">
              <h3>Confirmar Eliminación</h3>
              <p>¿Está seguro de que desea eliminar este elemento?</p>
              <div class="modal-buttons">
                <button class="btn-yes" @click="confirmDelete">Sí, eliminar</button>
                <button class="btn-not" @click="closeModal">Cancelar</button>
              </div>
            </div>
          </div>
        </template>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const deleteType = ref('');

const openDeleteModal = (type, index) => {
  itemToDelete.value = { index };
  deleteType.value = type;
  showDeleteModal.value = true;
};

const closeModal = () => {
  showDeleteModal.value = false;
  itemToDelete.value = null;
  deleteType.value = '';
};

const confirmDelete = () => {
  if (itemToDelete.value !== null) {
    const { index } = itemToDelete.value;
    if (deleteType.value === 'option') {
      options.value.splice(index, 1);
      updateHeight();
    }
    closeModal();
  }
};

const beforeEnter = (el) => {
  el.style.height = '0';
};

const enter = (el, done) => {
  el.style.height = `${el.scrollHeight}px`;
  el.style.transition = 'height 0.4s ease';
  setTimeout(() => {
    el.style.height = 'fit-content';
    done();
  }, 400);
};

const leave = (el, done) => {
  el.style.height = `${el.scrollHeight}px`;
  el.style.transition = 'height 0.4s ease';
  requestAnimationFrame(() => {
    el.style.height = '0';
  });
  setTimeout(done, 400);
};

const updateHeight = () => {
  const container = document.querySelector('.product-container');
  if (container) {
    container.style.height = `fit-content`;
  }
};

const options = ref([
  {
    title: 'Opción 1',
    price: '',
    description: '',
    discount: '',
    hasDiscount: false,
    image: '/src/assets/images/placeholder-image.jpg',
    status: 'Disponible',
    isExpanded: true,
  },
]);

const addOption = () => {
  options.value.unshift({
    title: 'Nueva Opción',
    price: '',
    description: '',
    discount: '',
    hasDiscount: false,
    image: '/src/assets/images/placeholder-image.jpg',
    status: 'Inactivo',
    isExpanded: false,
  });
  updateHeight();
};

const toggleOption = (index) => {
  const option = options.value[index];
  option.isExpanded = !option.isExpanded;
};

const copyOption = (index) => {
  const optionToCopy = { ...options.value[index] };
  options.value.push(optionToCopy);
};

const onImageChange = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    options.value[index].image = imageUrl;
  }
};

const resetImage = (index) => {
  options.value[index].image = '/src/assets/images/placeholder-image.jpg';
  const fileInput = document.querySelector(`#fileInput-${index}`);
  if (fileInput) {
    fileInput.value = '';
  }
};

const validateNumber = (id) => {
  const input = document.querySelector(`#${id}`);
  if (input) {
    input.value = input.value.replace(/[^0-9]/g, '');
  }
};

const moveOptionProduct = (index, direction) => {
  if (direction === 'up' && index > 0) {
    const temp = options.value[index];
    options.value.splice(index, 1);
    options.value.splice(index - 1, 0, temp);
  } else if (direction === 'down' && index < options.value.length - 1) {
    const temp = options.value[index];
    options.value.splice(index, 1);
    options.value.splice(index + 1, 0, temp);
  }
};
</script>


<style lang="sass" scoped>
@import url(/src/css/OptionsProductRestaurant.sass)
</style>
