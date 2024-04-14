import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// import VeeValidate from 'vee-validate'
const options = {
  // You can set your default options here
}
const app = createApp(App)
app.use(createPinia())
// app.use(VeeValidate)
app.use(Toast, options)
app.use(router)
app.use(Antd)
app.mount('#app')
