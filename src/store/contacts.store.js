import {contactsRef} from "@/api/firebase.api";

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
			await contactsRef.on("value", (snapshot) => {
				context.commit("setContacts", {contacts: Object.values(snapshot.val())});
			}, (error) => {
				context.commit("pushError", {error: error.toString()});
			});
		}
	},
	getters: {
		getContacts(state) {
			return state.contacts;
		},
		getContactByUId: state => contactUId => {
			return state.contacts.filter((contact) => contact.uId === contactUId);
		},
		getContactsUId(state) {
			return {...state}.contacts.map(contact => contact.uId);
		}
	}
};
