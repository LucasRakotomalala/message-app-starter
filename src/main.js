import {createApp} from "vue";
import App from "./App.vue";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons';
import router from '@/router/router';
import {store} from "@/store/store";
import firebase from "firebase/app";
import "firebase/auth"

library.add(faUserSecret);

firebase.auth().onAuthStateChanged(() => {
	createApp(App).use(store).use(router).mount('#app');
});
