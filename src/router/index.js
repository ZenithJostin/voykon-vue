import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import OrdersLayout from '../layouts/OrdersLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/repartidor',
      name: 'DeliveryView',
      component: DeliveryView,
      children: [
        {
          path: "",
          name: "FirstView",
          redirect: "/repartidor/pedidos",
        },
      ],
    },
    {
      path: '/repartidor/:ParamMenu',
      name: 'DeliveryParam',
      component: DeliveryView,
      children: [
        {
          path: '/repartidor/pedidos',
      name: 'OrdersLayout',
      component: OrdersLayout,
        },
      ],
    },
    
  ]
})

export default router
