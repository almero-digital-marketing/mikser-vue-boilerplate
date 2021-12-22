export default {
    mounted(el, binding) {
        function findScroller(dest) {
            if (dest.tagName == 'BODY') return window
            const style = getComputedStyle(dest)
            if (style.overflow.indexOf('scroll') > -1) {
                return dest
            }
            return findScroller(dest.parentElement)
        }
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
        let scroller = findScroller(el)
        el.addEventListener('scroll', scroller, { passive: true })
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('scroll', el.state.onScroll)

            clearTimeout(el.state.timer)
            delete el.state
        }
    }
}