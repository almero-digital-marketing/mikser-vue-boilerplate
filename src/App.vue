<template>
	<div id="root" :style="style" :class="mediaList" v-scroll-intent>
		<div id="menu">
			<div id="logo">
				<router-link to="/">
					<img src="./assets/img/logo.svg" alt="Logo" width="12">
					<span>{{ href('/system/translation').meta.company }}</span>
				</router-link>
			</div>
			<div id="cart" v-if="wooCart">
				<h2>{{ href('/system/translation').meta.cart }}</h2>
				<ul>
					<li v-for="item in wooCart.items" :key="item.item_key">
						{{ item.quantity.value }}x {{ item.name }} 
						<button @click="removeFromCart({ item: item.item_key })">Remove from cart</button> <button @click="updateInCart({ item: item.item_key, quantity: 1 })">Update in cart</button>
					</li>
				</ul>
			</div>
			<!-- <div id="wishlist" v-if="wooWishlist">
				<h2>{{ href('/system/translation').meta.wishlist }}</h2>
				<ul>
					<li v-for="item in wooWishlist.items" :key="item.item_id">
						{{ item.quantity }}x {{ item.name }} 
						<button @click="removeFromWishlist({ item: item.item_id })">Remove from wishlist</button>
					</li>
				</ul>
			</div> -->
			<div class="main-menu">
				<h2>{{ href('/system/translation').meta.menu }}</h2>
				<ul>
					<li>
						<router-link :to="href('/web').link">{{ href('/system/translation').meta.home }}</router-link>
					</li>
					<li>
						<router-link :to="href('/web/request').link">{{ href('/system/translation').meta.request }}</router-link>
					</li>
				</ul>
			</div>
		</div>
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
		<div id="modals"></div>
	</div>
</template>
<script>

import { computed, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useHead } from '@vueuse/head'
import { useResponsiveness } from './lib/Responsiveness'

export default {
	components: {
	},
	setup() {	
		const { mediaList, mediaQuery } = useResponsiveness()
		
		const store = useStore()
		const head = computed(() => {
			let head = store.getters['mikser/document']?.meta.head || {}
			if (Array.isArray(head)) {
				head = { 
					meta: head.filter(meta => {
						if (meta.name == 'title') {
							head.title = meta.content
							return false
						}
						return true
					})
				}
			}
			return head
		})
		const style = computed(() => {
			return {
				'--vw': Math.floor(window.innerWidth / 100) + 'px',
				'--vh': Math.floor(window.innerHeight / 100) + 'px'
			}
		})

		useHead(head)

		Promise.all([
			store.dispatch('mikser/init', ['/system/translation']),
			store.dispatch('woo/loadSettings'),
			store.dispatch('woo/loadCart'),
			// store.dispatch('woo/loadWishlist'),
		])
		.then(async () => {
			await nextTick()
			await store.dispatch('mikser/live', false)
		})
		return {
			style,
			mediaList,
			mediaQuery
		}
	},
}
</script>
<style lang="less">
@import url('@/assets/style.less');

#app {
	position: relative;
	min-height: 300vw;
}

#root {
	transition: .2s ease-in-out;
	&.touch-intent {
		background-color: antiquewhite;
	}
}

.fade-enter-active, .fade-leave-active {
	transition-property: opacity;
	transition-duration: .25s;
}

.fade-enter-from, .fade-leave-to {
	opacity: 0;
}
</style>

