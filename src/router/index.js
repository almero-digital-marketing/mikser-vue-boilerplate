import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		path: '/request',
		name: 'Request',
		component: () => import(/* webpackChunkName: "request" */ '../views/Request.vue'),
	},
	{
		path: '/product',
		name: 'Product',
		component: () => import(/* webpackChunkName: "product" */ '../views/Product.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.afterEach(() => {
	window.scrollTo(0,0)
})	

export default router
