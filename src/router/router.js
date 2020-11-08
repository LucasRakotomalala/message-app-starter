import {createWebHistory, createRouter} from 'vue-router';
import Messages from "@/components/Messages";
import NotFound from "@/components/NotFound";
import Conversation from "@/components/Conversation";
import Login from "@/components/Login";
import firebase from "firebase/app";
import "firebase/auth";
import Members from "@/components/Members";

const routes = [
	{ path: "/conversation/:id", name: "Conversation", component: Conversation, meta: { requiresAuth: true } },
	{ path: "/", name: "Login", component: Login },
	{ path: "/messages", name: "Messages", component: Messages, meta: { requiresAuth: true } },
	{ path: "/members", name: "Members", component: Members, meta: { requiresAuth: true } },
	{ path: "/:catchAll(.*)", component: NotFound }
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

	if (requiresAuth && !currentUser)
		next();
	else if (!requiresAuth && currentUser)
		next("messages");
	else
		next();
});

export default router;
