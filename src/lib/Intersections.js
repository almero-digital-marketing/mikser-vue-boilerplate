import { onUnmounted, ref, computed, onMounted, nextTick, watch, isRef } from 'vue'

function useIntersections(targets, options = { root: null, rootMargin: '0px' }) {
    const intersections = ref(targets.map(target => {
        return {
            target,
            intersectionRatio: 0,
            isIntersecting: false,
        }
    }))

    let observer = new IntersectionObserver(entries => {
        intersections.value = targets.map(target => {
            const element = isRef(target) ? target.value : target
            const entry = entries.find(entry => entry.target == element)
            if (entry) {
                return {
                    target,
                    intersectionRatio: entry.intersectionRatio,
                    isIntersecting: entry.isIntersecting
                }
            } else {
                return {
                    target,
                    intersectionRatio: 0,
                    isIntersecting: false,
                }
            }
        })
    }, options)

    onMounted(async () => {
        await nextTick()
        targets.map(target =>{
            const element = isRef(target) ? target.value : target
            if (element) {
                observer.observe(element)
            }
        })
    })

    onUnmounted(() => {
        if (observer) {
            observer.disconnect()
        }
    })
    
    for(const target of targets) {
        if (isRef(target)) {
            watch(target, (newTargget, oldTarget) => {
                if (oldTarget) {
                    observer.unobserve(oldTarget)
                }
                if (newTargget) {
                    observer.observe(newTargget)
                }
            })
        }
    }

    return intersections
}

function useIntersection(target, options) {
    const intersections = useIntersections([target], options)
    const intersection = computed(() => intersections.value[0])
    return intersection
}

export {
    useIntersections, 
    useIntersection,
}