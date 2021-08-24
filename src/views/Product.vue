<template>
	<div class="product" v-if="wooProduct">
		<h1>{{ document.meta.title || document.meta.options.title }} / {{ wooProduct.slug }} / {{ productId }}</h1>
		<ul>
			<li>
				<span>{{ wooProduct.name }}: {{ wooProduct.price }}</span>
				<button @click="addToCart({ id: wooProduct.id.toString(), variation: { attribute_pa_size: '48' } })">Add to cart</button>  
				<button @click="addToWishlist(wooProduct.id)">Add to wishlist</button>
			</li>
		</ul>
	</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
	name: 'Product',
	components: {
	},
	setup() {
		const store = useStore()
		const productId = computed(() => store.getters['woo/product'].id)
		return {
			productId
		}
    },
}
</script>