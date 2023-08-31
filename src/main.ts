import './polyfills'
import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.scss'

const app = createApp(App)

app.use(store).use(router).use(Vant).mount('#app')
