import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import OrdersLayout from '../layouts/OrdersLayout.vue'
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import RoutingLayout from '../layouts/RoutingLayout.vue'
import AdminProfileView from '../views/AdminProfileView.vue'

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
        {
          path: "perfil",
          name: "ProfileView",
          component: ProfileView,
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
    {
      path: "/administrador",
      name: "administrador",
      component: AdminView,
      children:[
        {
          path: "/enrutamiento",
          name: "RoutingLayout",
          component: RoutingLayout,
        },
        {
          path: "/ver-perfil",
          name: "ProfileViewAdmin",
          component: AdminProfileView,
        }
      ]
    }
  ]
})

export default router
