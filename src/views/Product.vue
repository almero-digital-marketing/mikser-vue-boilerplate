<template>
	<div class="product">
		<h1>{{ document.meta.title }} / {{ woo.slug }}</h1>
		<ul>
			<li v-for="item in wooProducts" :key="item.permalink">{{ item.name }}: {{ item.price }} <button @click="addToCart(item.id)">Add to cart</button></li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'Product',
	components: {
	},
	setup() {

    },
}
</script>