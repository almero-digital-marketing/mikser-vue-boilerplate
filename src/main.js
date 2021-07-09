import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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

import 'vue-universal-modal/dist/index.css'
import VueUniversalModal from 'vue-universal-modal'

const app = createApp(App)
const head = createHead()

mikserApp(app, { store, router }).then(() => {
    app.use(head)
    app.use(VueUniversalModal, {
        teleportTarget: '#modals'
    })
    app.mixin(mikserMixin)

    app.component('Markdown', Markdown)
    app.component('ExternalLink', ExternalLink)
    app.component('PhoneLink', PhoneLink)
    app.component('Metatext', Metatext)

    app.directive('hover-intent', HoverIntent)
    app.directive('enhance-input', EnhanceInput)
    app.directive('scroll-link', ScrollLink)

    app
        .use(store)
        .use(router)
        .mount('#app')
})
