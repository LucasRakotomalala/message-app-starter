import {createWebHistory, createRouter} from 'vue-router';
import Messages from "@/components/Messages";
import Contacts from "@/components/Contacts";
import Conversation from "@/components/Conversation";
import {auth} from "@/api/firebase.api";
import Login from "@/components/Login";
import {store} from "@/store/store";

const routes = [
	{ path: "/", component: Messages, meta: { requiresAuth: true } },
	{ path: "/login", name: 'login', component: Login },
	{ path: "/messages", name: 'messages', component: Messages, meta: { requiresAuth: true } },
	{ path: "/contacts", component: Contacts, meta: { requiresAuth: true } },
	{ path: "/conversation/:id", name: 'conversation', component: Conversation, meta: { requiresAuth: true } },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const user = await new Promise((resolve) => {
		auth.onAuthStateChanged(user => {
			store.dispatch("setAuth");
			resolve(user);
		})
	});
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !user)
		next('login');
	else if (requiresAuth && user)
		next();
	else
		next();

});

export default router;
