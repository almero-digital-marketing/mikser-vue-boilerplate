export default {
    mounted(el, binding) {
        el.state = {
            timer: null,
            onMouseOver() {
                if (!el.state.timer) {
                    el.state.timer = setTimeout(() => {
                        if (binding.value) {
                            binding.value(el.dataset.value)
                        }
                    }, 200)
                }
            },
            onMouseLeave() {
                clearTimeout(el.state.timer)
                el.state.timer = null
            }
        }
        
        el.addEventListener('mouseover', el.state.onMouseOver)
        el.addEventListener('mouseleave', el.state.onMouseLeave)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('mouseover', el.state.onMouseOver)
            el.removeEventListener('mouseleave', el.state.onMouseLeave)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}