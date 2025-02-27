import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cartItems")) || [], // Carga desde localStorage
  }),
  getters: {
    totalAmount: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalItems: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    addItem(product) {
      // Calcular el precio con descuento
      const discountedPrice =  product.price;
      console.log(product.discount)

      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
        existingItem.price = discountedPrice; // Actualizar el precio con descuento
      } else {
        this.items.push({
          ...product,
          price: discountedPrice, // Guardar el precio con descuento
          quantity: product.quantity || 1,
        });
      }
      this.saveToLocalStorage();
    },
    removeItem(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.saveToLocalStorage();
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) this.removeItem(productId);
      }
      this.saveToLocalStorage();
    },
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("cartItems", JSON.stringify(this.items)); // Guarda en localStorage
    },
  },
});
