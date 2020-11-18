import axios from "axios";
import {contactsUrl} from "@/api/db";

export const contactsModule = {
	state: {
		contacts: [],
	},
	mutations: {
		setContacts(state, payload) {
			state.contacts = payload.contacts;
		}
	},
	actions: {
		async setContacts(context) {
			try {
				const response = await axios.get(contactsUrl);
				context.commit("setContacts", {contacts: response.data});
			} catch (error) {
				context.commit("pushError", {error: error.toString()});
			}
		}
	},
	getters: {
		getContacts(state) {
			return state.contacts;
		}
	}
};
