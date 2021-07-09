<template>
	<div id="root" :style="style" :class="mediaList">
		<div id="menu">
			<div id="logo">
				<router-link to="/">
					<img src="./assets/img/logo.svg" alt="Logo">
					<span>{{ href('/web/translation').meta.company }}</span>
				</router-link>
			</div>
			<div class="main-menu">
				<ul>
					<li>
						<router-link :to="href('/web').link">{{ href('/web/translation').meta.home }}</router-link>
					</li>
					<li>
						<router-link :to="href('/web/request').link">{{ href('/web/translation').meta.request }}</router-link>
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
		const init = () => store.dispatch('mikser/init', ['/web/translation'])
		const live = () => store.dispatch('mikser/live', false)
		const head = computed(() => store.getters['mikser/document']?.meta.head || {})
		const style = computed(() => {
			return {
				'--vw': Math.floor(window.innerWidth / 100) + 'px',
				'--vh': Math.floor(window.innerHeight / 100) + 'px'
			}
		})

		useHead(head)

		init().then(async () => {
			await nextTick()
			live()
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
}

.fade-enter-active, .fade-leave-active {
	transition-property: opacity;
	transition-duration: .25s;
}

.fade-enter, .fade-leave-active {
	opacity: 0;
}
</style>
