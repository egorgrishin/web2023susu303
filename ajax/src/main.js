import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import CreatePopup from "@/components/CreatePopup.vue";
import UpdatePopup from "@/components/UpdatePopup.vue";
import DeletePopup from "@/components/DeletePopup.vue";

const app = createApp(App)

app.component('create-popup', CreatePopup)
app.component('update-popup', UpdatePopup)
app.component('delete-popup', DeletePopup)
app.mount('#app')
