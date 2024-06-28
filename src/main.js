import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



const app = createApp(App)

app.use(router)

// app.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyAw-ekBaMquh5_hGvzVvbqyJ_voBQjI518',
//         language: 'fa',
//         autobindAllEvents: true,
//     },
// })

app.mount('#app')
