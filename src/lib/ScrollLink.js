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
            onClick() {
                if (el.dataset.href[0] == '#') {
                    const dest = document.querySelector(el.dataset.href)
                    if (dest) {
                        const options = {
                            top: dest.getBoundingClientRect().top,
                            left: dest.getBoundingClientRect().left
                        }
                        if (el.hasAttribute('smooth')) {
                            options.behavior = 'smooth'
                        }
                        let scroller = findScroller(dest)
                        scroller.scrollBy(options)
                    }
                } else {
                    binding.instance.$router.push(el.dataset.href);
                }
            }
        }
        el.addEventListener('click', el.state.onClick)
    },
    unmounted(el) {
        if (el.state) {
            el.removeEventListener('click', el.state.onClick)
            delete el.state
        }
    }
}