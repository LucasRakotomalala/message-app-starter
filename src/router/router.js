import {createWebHistory, createRouter} from 'vue-router';
import Messages from "@/components/Messages";
import Contacts from "@/components/Contacts";

const routes = [
	{ path: "/", component: Messages },
	{ path: "/messages", component: Messages },
	{ path: "/contacts", component: Contacts },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
