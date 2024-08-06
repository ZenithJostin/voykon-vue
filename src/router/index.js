import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'


// Delivery
import DeliveryView from '../views/DeliveryView.vue'
import OrdersDelivery from '../layouts/delivery/OrdersDeliveryLayout.vue'
import ProfileView from '../layouts/delivery/ProfileDeliveryLayout.vue'

// Admin
import AdminView from '../views/AdminView.vue'
import AdminRoutingLayout from '../layouts/admin/AdminRoutingLayout.vue'
import AdminProfileLayout from '../layouts/admin/AdminProfileLayout.vue'
import AdminDeliveriesLayout from '../layouts/admin/AdminDeliveriesLayout.vue'
import AdminStreetLayout from '../layouts/admin/AdminStreetLayout.vue'
import AdminStreetRegistrationLayout from '../layouts/admin/AdminStreetRegistrationLayout.vue'

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
      path: '/ingreso',
      name: 'Login',
      component: LoginView
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
          component: AdminRoutingLayout,
        },
        {
          path: "perfil",
          name: "ProfileViewAdmin",
          component: AdminProfileLayout,
        },
        {
          path: "domicilios",
          name: "AdminDeliveriesLayout",
          component: AdminDeliveriesLayout,
        },
        {
          path: "barrios",
          name: "AdminStreetLayout",
          component: AdminStreetLayout,
        },
        {
          path: "barrios/registro",
          name: "AdminStreetRegistration",
          component: AdminStreetRegistrationLayout,
        },
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
        },
        // {
        //   path: "menu",
        //   name: "MenuRestaurant",
        //   component: MenuRestaurant,
        // }
      ]
    }
  ]
})

export default router
