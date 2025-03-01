import { createRouter, createWebHistory } from 'vue-router'
import 'material-symbols';
import HomeView from '../views/HomeView.vue'
import LoginDeliveryView from '../views/LoginDeliveryView.vue'
import RegisterDeliveryView from '../views/RegisterDeliveryView.vue'
import LoginAdminView from '../views/LoginAdminView.vue'
import RegisterAdminView from '../views/RegisterAdminView.vue'

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
import restaurantIndex from '@/views/Admin/Restaurants/restaurant-index.vue';
import restaurantManage from '@/views/Admin/Restaurants/restaurant-manage.vue';
import deliverymenIndex from '@/views/Admin/Deliverymen/deliverymen-index.vue';
import deliverymenManage from '@/views/Admin/Deliverymen/deliverymen-manage.vue';

// Restaurant
import RestaurantView from '../views/RestaurantView.vue'
import RestaurantOrders from '../layouts/restaurant/OrdersRestaurantLayout.vue'
import RestaurantOrdersCreate from '../layouts/restaurant/OrdersRestaurantCreateLayout.vue'
import RestaurantProfile from '../layouts/restaurant/ProfileRestaurantLayout.vue'
import RestaurantMenu from '../layouts/restaurant/MenuRestaurantLayout.vue'
import ProductOptionsMenu from '../layouts/restaurant/ProductOptionsRestaurantLayout.vue'

//Menu
  //Layouts
import MenuLayout from '../layouts/menu/Layouts/MenuLayout.vue'
import ViewOrdersLayout from '../layouts/menu/Layouts/ViewOrdersLayout.vue';
import FinalOrdersLayout from '../layouts/menu/Layouts/FinalOrdersLayout.vue';
import AdminRoutingTracker from '@/layouts/admin/AdminRoutingTracker.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/repartidor/ingreso',
      name: 'LoginDelivery',
      component: LoginDeliveryView
    },
    
    {
      path: '/repartidor/registro',
      name: 'RegisterDelivery',
      component: RegisterDeliveryView
    },
    {
      path: '/administrador/ingreso',
      name: 'LoginAdmin',
      component: LoginAdminView
    },
    
    {
      path: '/administrador/registro',
      name: 'RegisterAdmin',
      component: RegisterAdminView
    },
    {
      path: '/repartidor',
      name: 'DeliveryView',
      component: DeliveryView,
      redirect: { name: 'OrdersDelivery' },
      children: [
        {
          path: "perfil",
          name: "ProfileDelivery",
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
      path: '/administrador',
      name: 'AdminView',
      component: AdminView,
      redirect: { name: 'RoutingLayout' },
      children: [
        {
          path: "enrutamiento",
          name: "RoutingLayout",
          component: AdminRoutingLayout,
        },
        {
          path: "seguimiento",
          name: "TrackerLayout",
          component: AdminRoutingTracker,
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
          path: "barrios/manage",
          name: "AdminStreetRegistration",
          component: AdminStreetRegistrationLayout,
        },
        {
          path: "barrios/manage/:id",
          name: "AdminStreetUpdate",
          component: AdminStreetRegistrationLayout,
        },
        {
          path: "restaurants",
          name: "restaurantIndex",
          component: restaurantIndex,
        },
        {
          path: "restaurants/manage",
          name: "restaurantManage",
          component: restaurantManage,
        },
        {
          path: "restaurants/manage/:id",
          name: "restaurantManageId",
          component: restaurantManage,
        },
        {
          path: "deliverymen",
          name: "deliverymenIndex",
          component: deliverymenIndex,
        },
        {
          path: "deliverymen/manage",
          name: "deliverymenManage",
          component: deliverymenManage,
        },
        {
          path: "deliverymen/manage/:id",
          name: "deliverymenManageId",
          component: deliverymenManage,
        },
      ]
    },
    {
      path: "/restaurante",
      name: "RestaurantView",
      component: RestaurantView,
      redirect: { name: 'OrdersRestaurant' },
      children: [
        {
          path: "pedidos",
          name: "OrdersRestaurant",
          component: RestaurantOrders,
        },
        {
          path: "pedidos/crear",
          name: "OrdersRestaurantCreate",
          component: RestaurantOrdersCreate,
        },
        {
          path: "perfil",
          name: "ProfileRestaurant",
          component: RestaurantProfile,
        },
        {
          path: "menu",
          name: "RestaurantMenu",
          component: RestaurantMenu,
        },
        {
          path: "menu/product/:productId",
          name: "ProductOptionsMenu",
          component: ProductOptionsMenu,
        }
      ]
    },
    {
      path: '/menu',
      name: 'Menu layout',
      component: HomeView,
    },
    {
      path: '/menu/:id',
      name: 'Menu layout with restaurant',
      component: MenuLayout,
    },
    {
      path: '/menu/pedidos/:id',
      name: 'ViewOrdersLayout',
      component: ViewOrdersLayout,
    },
    {
      path: '/menu/pedido/:id',
      name: 'FinalOrdersLayout',
      component: FinalOrdersLayout,
    }
  ]
})

export default router
