import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
// Delivery
import DeliveryView from '../views/DeliveryView.vue'
import OrdersDelivery from '../layouts/delivery/OrdersDeliveryLayout.vue'
import ProfileView from '../layouts/delivery/ProfileDeliveryLayout.vue'
// Admin
import AdminView from '../views/AdminView.vue'
import RoutingLayout from '../layouts/admin/RoutingLayout.vue'
import AdminProfileLayout from '../layouts/admin/AdminProfileLayout.vue'

// Restaurant
import RestaurantView from '../views/RestaurantView.vue'
import RestaurantOrders from '../layouts/restaurant/OrdersRestaurantLayout.vue'
import RestaurantProfile from '../layouts/restaurant/ProfileRestaurantLayout.vue'

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
          name: "FirstViewDelivery",
          redirect: "/repartidor/pedidos",
        },
        {
          path: "perfil",
          name: "ProfileView",
          component: ProfileView,
        },
        {
          path: 'pedidos',
          name: 'OrdersDelivery',
          component: OrdersDelivery,
        },
      ],
    },
    {
      path: '/repartidor/:ParamMenu',
      name: 'DeliveryParam',
      component: DeliveryView,
    },
    {
      path: "/administrador",
      name: "administrador",
      component: AdminView,
      children: [
        {
          path: "",
          name: "FirstViewAdmin",
          redirect: "/administrador/enrutamiento",
        },
        {
          path: "enrutamiento",
          name: "RoutingLayout",
          component: RoutingLayout,
        },
        {
          path: "perfil",
          name: "ProfileViewAdmin",
          component: AdminProfileLayout,
        }
      ]
    },
    {
      path: "/restaurante",
      name: "restaurante",
      component: RestaurantView,
      children: [
        {
          path: "",
          name: "FirstViewRestaurant",
          redirect: "/restaurante/pedidos",
        },{
          path: "pedidos",
          name: "OrdersRestaurant",
          component: RestaurantOrders,
        },
        {
          path: "perfil",
          name: "ProfileRestaurant",
          component: RestaurantProfile,
        }
      ]
    }
  ]
})

export default router
