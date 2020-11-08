import {createStore} from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export const store = createStore({
	state: {
		auth: null,
	},
	mutations: {
		setAuth(state) {
			state.auth = firebase.auth().currentUser;
		}
	},
	actions: {
		updateAuth(context) {
			context.commit("setAuth");
		}
	},
	getters: {
		getAuth(state) {
			return state.auth;
		}
	}
});
