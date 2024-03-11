import './assets/main.css'

import { createApp } from 'vue'
// @ts-ignore
import App from "@/App.vue"
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import VueConfirmPlugin from 'v3confirm'

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);
app.use(VueConfirmPlugin, {
    root: '#confirm',
    yesText: 'Oui',
    noText: 'Non'
})

app.mount('#app')
