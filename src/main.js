import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App,
	{cart: []}
).use(router).mount('#app')