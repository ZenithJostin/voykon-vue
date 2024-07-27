import { ref } from 'vue'

// User Information
export const users = ref([
    {
        user_logged: true,
        user_id:1,
        user_image:"/src/assets/images/image-profile-user.jpg",
        user_name:"Juan Camilo",
        user_lastname:"Martinez Martinez",
        user_number:3131313131,
        user_email:"juanmartinez@voykon.com",
        user_age:28,
        user_description:"Hola soy Juan y me encanta trabajar para Voykon",
        user_status:1,
    },
    {   
        user_logged: false,
        user_id:2,
        user_image:"/src/assets/images/image-profile-user.jpg",
        user_name:"Diego",
        user_lastname:"Valencia",
        user_number:3131313131,
        user_email:"juanmartinez@voykon.com",
        user_age:28,
        user_description:"Hola soy Juan y me encanta trabajar para Voykon",
        user_status:1,
    }
])
