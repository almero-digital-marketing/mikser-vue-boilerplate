<template>
    <div class="request" :class="status">
		<h1>{{ document.meta.title }}</h1>
        <form ref="form">
            <input type="hidden" name="context" :value="document.meta.href.split('/').slice(1).join('-')">
            <template v-if="document.meta.request">
                <input type="hidden" name="to" :value="document.meta.request.to">
                <input type="hidden" name="subject" :value="document.meta.request.subject">
                <input type="hidden" name="template-html" :value="storage(document.meta.request.template + '.html')">
            </template>
            <template v-if="document.meta.confirmation">
                <input type="hidden" name="confirmation-subject" :value="document.meta.confirmation.subject">
                <input type="hidden" name="confirmation-html" :value="storage(document.meta.confirmation.template)">
                <input type="hidden" name="confirmation-name" :value="document.meta.confirmation.name">
                <input type="hidden" name="confirmation-title" :value="metatext(document.meta.confirmation.title)">
                <input type="hidden" name="confirmation-message" :value="metatext(document.meta.confirmation.message)">
            </template>
            <div class="input text">
                <input id="text-9-name-0" type="text" name="name" required v-enhance-input>
                <label for="text-9-name-0">Вашето име:</label>
            </div>
            <div class="input text">
                <input id="text-9-email-2" type="email" name="email" required v-enhance-input>
                <label for="text-9-email-2">Е-mail:</label>
            </div>
            <div class="input text">
                <input id="text-9-phone-3" type="tel" name="phone" required v-enhance-input>
                <label for="text-9-phone-3">Телефон:</label>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { metatext } from 'mikser-whitebox-vue/lib/metatext'

export default {
    components: {
    },
    setup() {
        const form = ref(null)
        const status = ref('ready')
        onMounted(() => {
            window.whitebox.init('mail', mail => {
				if (mail) {
                    mail.on('mail.progress', () => {
                        status.value = 'progress'
                    })
					mail.on('mail.send', () => {
                        status.value = 'send'
					})
                    mail.on('mail.error', () => {
                        status.value = 'error'
					})
					mail.service.ajaxForm(form.value)
				}
			})
        })
        return {
            form,
            status,
            metatext
        }
    },
}
</script>