<template>
	<div class="product">
		<h1>{{ document.meta.title || document.meta.options.title }} / {{ woo.slug }} / {{ productId }}</h1>
		<ul>
			<li>{{ wooProduct.name }}: {{ wooProduct.price }} <button @click="addToCart(wooProduct.id)">Add to cart</button></li>
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