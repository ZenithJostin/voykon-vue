import { ref } from 'vue'

// Order Information
export const orders = ref([
    {
        order_id:1,
        restaurant_image:"/src/assets/images/wok-logo.png",
        order_address:"San Juanito",
        order_restaurant_name:"Al Wok",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "Entregado",
    },
    {
        order_id:2,
        restaurant_image:"/src/assets/images/KFC_Logo.jpg",
        order_address:"Algarra",
        order_restaurant_name:"KFC",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "Sin entregar",
    },
    {
        order_id:3,
        restaurant_image:"/src/assets/images/image-profile-user.jpg",
        order_address:"Algarra",
        order_restaurant_name:"Donde Amparito",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "En reparto",
    },
    {
        order_id:4,
        restaurant_image:"/src/assets/images/Logo-BK.png",
        order_address:"Algarra",
        order_restaurant_name:"Burger King",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "Recogida",
    },
    {
        order_id:5,
        restaurant_image:"/src/assets/images/KFC_Logo.jpg",
        order_address:"Algarra",
        order_restaurant_name:"KFC",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "Entregado",
    },
    {
        order_id:6,
        restaurant_image:"/src/assets/images/KFC_Logo.jpg",
        order_address:"Algarra",
        order_restaurant_name:"KFC",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "En reparto",
    },
    {
        order_id:7,
        restaurant_image:"/src/assets/images/KFC_Logo.jpg",
        order_address:"Algarra",
        order_restaurant_name:"KFC",
        order_date: "1/08/2024",
        order_time: "20:00",
        order_status: "En reparto",
    }

])
