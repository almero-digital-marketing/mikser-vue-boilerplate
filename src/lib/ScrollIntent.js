export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onScroll() {
                clearTimeout(el.state.timer)
                el.classList.add('scroll-intent')
                if (binding.value) {
                    binding.value(el, true)
                }
                el.state.timer = setTimeout(() => {
                    el.classList.remove('scroll-intent')
                    if (binding.value) {
                        binding.value(el, false)
                    }
                }, 1000)
            },
        }
        
        el.addEventListener('scroll', el.state.onScroll, { passive: true })
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('scroll', el.state.onScroll)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}