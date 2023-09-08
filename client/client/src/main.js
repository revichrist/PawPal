// import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import VueGtag from 'vue-gtag'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vue3GoogleLogin, {
  clientId: '642052098395-cr7i5rm8kvcvllko2mqqcg65r6qcnnf8.apps.googleusercontent.com'
})

app.use(
  VueGtag,
  {
    appName: 'PawPal',
    pageTrackerScreenviewEnabled: true,
    config: { id: 'G-SNVG98SRGT' }
  },
  router
)

app.mount('#app')
