<template>
    <div class="auto-play" ref="autoplay">
        <slot></slot>
    </div>
</template>
<script>
import { ref, toRefs, watch, onMounted, onBeforeUnmount } from 'vue'

export default {
    props: {
        threshold: {
            type: Number,
            default: 0,
        },
        enabled: {
            type: Boolean,
            default: true
        },
    },
    setup(props) {
        const { enabled, threshold } = toRefs(props)
        const autoplay = ref(null)
        
        let playing = false

        function play() {
            if (enabled.value) {
                for(let video of autoplay.value.querySelectorAll('video')) {
                    // console.log('Play:', video.getAttribute('src'))
                    video.play()
                    .then(() => {
                        setTimeout(() => {
                            video.style.backgroundImage = 'unset'
                        }, 1000)
                    })
                    .catch(() => {})
                }
            }
            playing = true
        }

        function pause() {
            for(let video of autoplay.value.querySelectorAll('video')) {
                // console.log('Pause:', video.getAttribute('src'))
                video.pause()
            }
            playing = false
        }

        watch(enabled, () => {
            let initial = playing
            if (!enabled.value) {
                pause()
            } else if (initial) {
                play()
            }
            playing = initial
        })

        const observer = new IntersectionObserver(entries => {
            const [entry] = entries || []
            if (!entry) return

            if (entry.isIntersecting) {
                play()
            } else {
                pause()
            }
        }, { threshold: threshold.value, })

        onMounted(() => {
            observer.observe(autoplay.value)
        })

        onBeforeUnmount(() => {
            if (autoplay.value) observer.unobserve(autoplay.value)
        })

        return {
            autoplay
        }
    }
}
</script>