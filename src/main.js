import domainConfig from '../domain.config.json'

import { createApp } from 'vue'
import { mikserApp, mikserMixin } from 'mikser-whitebox-vue'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import store from './store'

import { Markdown, ExternalLink, PhoneLink, Metatext } from 'mikser-whitebox-vue/components'
import HoverIntent from './lib/HoverIntent'
import EnhanceInput from './lib/EnhanceInput'
import ScrollLink from './lib/ScrollLink'

import ScrollTrigger from 'vue-gsap-scrolltrigger'
import 'vue-autoplay/dist/style.css'
import { AutoplayAnimation, AutoplayVideo } from 'vue-autoplay'
import { Carousel, Slide } from 'vue-overflow-carousel'
import 'vue-overflow-carousel/dist/style.css'
import { Masonry } from 'vue-minimasonry'
import 'vue-minimasonry/dist/style.css'

import { vfmPlugin } from 'vue-final-modal'

import { wooApp, wooMixin } from 'woocommerce-whitebox-vue'

const app = createApp(App)
const head = createHead()

;(async () => {
    let mikser = mikserApp(app, { store, router, domainConfig })
    app.component('Markdown', Markdown)
    app.component('ExternalLink', ExternalLink)
    app.component('PhoneLink', PhoneLink)
    app.component('Metatext', Metatext)
    
    app.component('ScrollTrigger', ScrollTrigger)
    app.component('AutoplayAnimation', AutoplayAnimation)
    app.component('AutoplayVideo', AutoplayVideo)
    app.component('Carousel', Carousel)
    app.component('Slide', Slide)
    app.component('Masonry', Masonry)

    let woo = wooApp(app, { store, router, domainConfig })
    app.mixin(wooMixin)
    
    await mikser()
    await woo()
    
    app.use(head)
    app.use(vfmPlugin)
    app.mixin(mikserMixin)
    
    app.directive('hover-intent', HoverIntent)
    app.directive('enhance-input', EnhanceInput)
    app.directive('scroll-link', ScrollLink)
    
    app
    .use(store)
    .use(router)
    .mount('#app')
})()