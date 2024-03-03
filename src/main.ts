import './assets/main.css'

import { createApp } from 'vue'
// @ts-ignore
import App from "@/App.vue"
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'

const app = createApp(App)

app.use(router)
app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);

app.mount('#app')
