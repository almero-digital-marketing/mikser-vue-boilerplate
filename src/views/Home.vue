<template>
	<div class="home">
		<h1>{{ document.meta.title }}</h1>
		<router-link :to="href('/web/product').link + '/p1'">{{ woo.name }}</router-link>
		{{ wooProduct }}
	</div>
</template>

<script>
export default {
	name: 'Home',
	components: {
	},
	setup() {
    },
}
</script>