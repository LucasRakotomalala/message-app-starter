import {createApp} from 'vue'
import App from './App.vue'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faUserSecret} from '@fortawesome/free-solid-svg-icons'
import {store} from "@/store/store";
import router from "@/router/router";

library.add(faUserSecret)

createApp(App).use(store).use(router).mount('#app')
