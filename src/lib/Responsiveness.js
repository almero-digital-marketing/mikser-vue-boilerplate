import { ask, registerOnChange, unRegisterOnChange } from 'what-input'
import { provide, readonly, onMounted, onUnmounted, reactive, computed} from 'vue'

export function useResponsiveness() {
    const mediaQuery  = reactive({})

    const mediaList = computed(() => {
        let list = []
        for(let item in mediaQuery) {
            if(mediaQuery[item]) list.push(item)
            else list.push('not-' + item)
        }
        return list
    })

    provide('mediaList', mediaList) 
    provide('mediaQuery', readonly(mediaQuery)) 
    
    const aspectRatio = () => Math.max(window.innerWidth, window.innerHeight) / Math.min(window.innerWidth, window.innerHeight)
    const initialAspectRation = aspectRatio()
    function respond() {
        mediaQuery.desktop = window.innerWidth > 1380
        mediaQuery.laptop = window.innerWidth <= 1380 && window.innerWidth > 1024
        mediaQuery.tablet = window.innerWidth <= 1024 && window.innerWidth > 640
        mediaQuery.phone = window.innerWidth <= 640
        mediaQuery.pc = mediaQuery.desktop || mediaQuery.laptop
        mediaQuery.mobile = mediaQuery.tablet || mediaQuery.phone
        mediaQuery.mini = window.innerWidth < 360
        
        mediaQuery.cinema = initialAspectRation >= 19 / 10
        mediaQuery.wide = initialAspectRation >= 16 / 10 && initialAspectRation < 19 / 10
        mediaQuery.monitor = initialAspectRation < 16 / 10

        if (aspectRatio() >= 4 / 3) {
            mediaQuery.portrait = window.innerHeight > window.innerWidth
            mediaQuery.landscape = window.innerHeight < window.innerWidth
        }
    }
    respond()

    function whatIntent() {
        const intent = ask('intent')
        mediaQuery.mouse = intent == 'mouse'
        mediaQuery.touch = intent == 'touch'
    }
    whatIntent()

    onMounted(() => {
        registerOnChange(whatIntent, 'intent')
        window.addEventListener('resize', respond)
    })
    onUnmounted(() => {
        unRegisterOnChange(whatIntent)
        window.removeEventListener('resize', respond)
    })

    return {
        mediaQuery,
        mediaList,
    }
}