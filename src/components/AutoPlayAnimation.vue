<template>
    <div class="auto-play animation" ref="autoplay">
    </div>
</template>
<script>
import { ref, toRefs, watch, onBeforeUnmount, onMounted } from 'vue'
import lottie from 'lottie-web'

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
        loop: {
            type: Boolean,
            default: true
        },
        path: {
            type: String,
        },
    },
    setup(props) {
        const { enabled, threshold, loop, path } = toRefs(props)
        const autoplay = ref(null)
        
        let playing = false
        let animation

        function play() {
            if (enabled.value) {
                if (!animation && path.value) {
                    animation = lottie.loadAnimation({
                        container: autoplay.value,
                        render: 'svg',
                        autoplay: enabled.value,
                        loop: loop.value,
                        path: path.value
                    })
                }
                if (animation) {
                    animation.play()
                }
            }
            playing = true
        }

        function pause() {
            if (animation) {
                animation.pause()
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

        watch(path, () => {
            if (path.value && playing) {
                play()
            } else {
                pause()
            }
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
            autoplay,
        }
    }
}
</script>
<style lang="less" scoped>
.animation {
    width: 100%;
}
</style>