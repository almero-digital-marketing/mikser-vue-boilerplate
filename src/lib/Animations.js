import { useStore } from 'vuex'
import { onBeforeUnmount, onMounted, computed, watch, nextTick } from 'vue'
import debounce from 'debounce'

export function triggerAnimation(name, animation, currentInstance) {
    let animationRef
    function refreshAnimation() {
        if (animationRef) {
            // console.log('REFRESH', name, scrollPosition)
            animationRef.animation.scrollTrigger.refresh(true)
        }
    }
    const resize = new ResizeObserver(debounce(refreshAnimation, 300))

    function removeMarkers() {
        if (animationRef && animationRef.markers) {
            document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(el => {
                if (new RegExp(animationRef.id + '$').test(el.innerHTML)) {
                    el.remove()
                }
            })
        }
    }
    
    function registerAnimation() {
        if (animation) {
            window.$animationCounter = window.$animationCounter ? window.$animationCounter + 1 : 1
            let id = name + '-' + window.$animationCounter
            // console.log('REGISTER', id)
            let animationInstance = animation(id)
            if (animationInstance) {
                animationRef = {
                    id,
                    animation: animationInstance,
                    markers: animationInstance.vars.markers
                }

                if (animationRef.animation.scrollTrigger.scroller != window) {
                    animationRef.scrollingElement = animationRef.animation.scrollTrigger.scroller
                } else {
                    animationRef.scrollingElement = window.document.scrollingElement
                }
                
                // console.log('INFO', animationRef.animation.scrollTrigger, animationRef.animation.vars.scroller)
                resize.observe(animationRef.scrollingElement)
            }
        }
    }

    function destroyAnimation() {
        if (animationRef) {
            // console.log('DESTROY', animationRef)
            if (animationRef.animation.scrollTrigger.scroller != window) {
                resize.unobserve(animationRef.animation.scrollTrigger.scroller)
            } else {
                resize.unobserve(window.document.scrollingElement)
            }

            animationRef.animation.scrollTrigger.kill(false)
            animationRef.animation.kill()
            removeMarkers()
        }
        animationRef = null
    }

    async function initAnimation() {
        await nextTick()
        destroyAnimation()
        registerAnimation()
    }

    onBeforeUnmount(() => {
        // console.log('UNMOUNTED', animationRef)
        destroyAnimation()
        resize.disconnect()
        animation = null
    }, currentInstance)

    if (!currentInstance) {
        const store = useStore()
        const document = computed(() => store.getters['mikser/document'])

        onMounted(() => {
            // console.log('MOUNTED', animationRef, document.value)
            initAnimation()
        })
        watch(document, (newDocument, oldDocument) => {           
            if (newDocument.link == oldDocument.link) {
                // console.log('CHANGE', animationRef,)
                initAnimation()
            }
        })
    } else {
        initAnimation()
    }
    
    return {
        init: initAnimation,
        destroy: destroyAnimation
    }
}