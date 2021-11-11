import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
	},
	{
		name: 'Request',
		component: () => import(/* webpackChunkName: "request" */ '../views/Request.vue'),
		meta: {
			wooData: () => {
				return {
					slug: 'p2',
					return_variations: true,
					endpoint: '/products'
				}
			}
		}
	},
	{
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
