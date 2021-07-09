export default {
    mounted(el) {
        let form = el.closest('form')
        if (form) {
            if (form.dataset.validation == undefined) {
                form.dataset.validation = JSON.stringify({})
            }
        }

        el.state = {
            validateForm() {
                if (form && el.id && el.hasAttribute('required')) {
                    let validation = JSON.parse(form.dataset.validation)
                    validation[el.id] = el.checkValidity() && el.value != ''
                    // console.log('Validation:', el.id, el.value, el.checkValidity(), el.validity.valid)
                    let isValid = true
                    for (let id in validation) {
                        if (!validation[id]) {
                            isValid = false
                            break;
                        }
                    }
        
                    // console.log('Validation', isValid)
                    if (isValid) {
                        form.classList.remove("not-valid")
                        form.classList.add("valid")
                    } else {
                        form.classList.remove("valid")
                        form.classList.add("not-valid")
                    }
                    form.dataset.validation = JSON.stringify(validation)
                }
            },
            change(e) {
                if (e.target.value) {
                    e.target.classList.remove("empty")
                    e.target.classList.add("not-empty")
                } else {
                    e.target.classList.remove("not-empty")
                    e.target.classList.add("empty")
                }
                el.state.validateForm()
            },
            keyDown(e) {
                if(e.keyCode == 13) {
                    e.preventDefault()
                    return false
                }
            },
            keyUp() {
                el.state.validateForm()
            }
        }

        if (el.value) {
            el.classList.remove("empty")
            el.classList.add("not-empty")
        } else {
            el.classList.remove("not-empty")
            el.classList.add("empty")
        }

        el.addEventListener('change', el.state.change)
        el.addEventListener('keydown', el.state.keyDown)
        el.addEventListener('keyup', el.state.keyUp)

        el.state.validateForm()
    },
    unmounted(el) {
        el.addEventListener('change', el.state.change)
        el.addEventListener('keydown', el.state.keyDown)
        el.addEventListener('keyup', el.state.keyUp)
    }
}