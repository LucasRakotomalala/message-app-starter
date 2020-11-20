import {auth} from "@/api/firebase.api";

export const authModule = {
	state: {
		auth: null,
	},
	mutations: {
		setAuth(state, payload) {
			state.auth = payload.auth;
		}
	},
	actions: {
		async setAuth(context) {
			try {
				const response = await auth;
				context.commit("setAuth", {auth: response.currentUser});
			} catch (error) {
				context.commit("pushError", {error: error.toString()});
			}
		}
	},
	getters: {
		getAuth(state) {
			return state.auth;
		}
	}
};
