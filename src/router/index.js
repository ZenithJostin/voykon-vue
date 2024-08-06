import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
import DeliveryView from '../views/DeliveryView.vue'
import OrdersLayout from '../layouts/OrdersLayout.vue'
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
import ProfileView from '../views/ProfileView.vue'
import AdminView from '../views/AdminView.vue'
import RoutingLayout from '../layouts/RoutingLayout.vue'
import AdminProfileView from '../layouts/AdminProfileLayout.vue'
import AdminDeliveriesLayout from '../layouts/DeliveriesLayout.vue'
<<<<<<< Updated upstream
=======
import AdminStreetLayout from '../layouts/AdminStreetLayout.vue'
import AdminStreetRegistrationLayout from '../layouts/AdminStreetRegistrationLayout.vue'
>>>>>>> Stashed changes
>>>>>>> Stashed changes

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
        {
          path: "pedidos",
          name: 'OrdersLayout',
          component: OrdersLayout,
        },
      ],
    },
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    
=======
>>>>>>> Stashed changes
    {
      path: "/administrador",
      name: "administrador",
      component: AdminView,
      children:[
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
          component: AdminProfileView,
        },
        {
          path: "domicilios",
          name: "AdminDeliveriesLayout",
          component: AdminDeliveriesLayout,
        },
<<<<<<< Updated upstream
      ]
    }
=======
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
    }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
  ]
})

export default router
