<template>
	<div class="home">
		<h1>{{ document.meta.title }}</h1>
		<router-link :to="href('/web/product').link + '/' + woo.slug">{{ woo.name }}</router-link>
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