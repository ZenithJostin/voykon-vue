<template>
	<div :class="['menu', { visible: isVisible }]">
		<nav>
			<div class="menu-items">
				<router-link class="link-icon" to="pedidos">
					<div class="menu-item" :class="{ 'active': isActiveIcon('pedidos') }">
						<div class="menu-item-nav">
							<span class="material-symbols-outlined">quick_reorder</span>
							<p>Pedidos</p>
						</div>
						<span class="material-symbols-outlined">chevron_right</span>
					</div>
				</router-link>
				<router-link class="link-icon" to="menu">
					<div class="menu-item" :class="{ 'active': isActiveIcon('menu') }">
						<div class="menu-item-nav">
							<span class="material-symbols-outlined">restaurant_menu</span>
							<p>Menú</p>
						</div>
						<span class="material-symbols-outlined">chevron_right</span>
					</div>
				</router-link>
				<router-link class="link-icon" to="perfil">
					<div class="menu-item" :class="{ 'active': isActiveIcon('perfil') }">
						<div class="menu-item-nav">
							<span class="material-symbols-outlined">person</span>
							<p>Ver Perfil</p>
						</div>
						<span class="material-symbols-outlined">chevron_right</span>
					</div>
				</router-link>
				<router-link class="link-icon" to="/" @click="logout">
					<div class="menu-item">
						<div class="menu-item-nav">
							<span class="material-symbols-outlined">logout</span>
							<p>Salir</p>
						</div>
						<span class="material-symbols-outlined">chevron_right</span>
					</div>
				</router-link>
			</div>
		</nav>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { defineProps } from 'vue'

const props = defineProps({
	isVisible: {
		type: Boolean,
		default: true
	}
})

const route = useRoute()
const router = useRouter()

const isActiveIcon = (iconType) => {
	return route.fullPath.includes(iconType)
}

const logout = () => {
	localStorage.removeItem('authToken')
	router.push({ name: 'LoginAdmin' })
}
</script>