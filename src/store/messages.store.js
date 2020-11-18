import axios from "axios";
import {messagesUrl} from "@/api/db";

export const messagesModule = {
	state: {
		messages: [],
	},
	mutations: {
		setMessages(state, payload) {
			state.messages = payload.messages;
		}
	},
	actions: {
		async setMessages(context) {
			try {
				const response = await axios.get(messagesUrl);
				context.commit("setMessages", {messages: response.data});
			} catch (error) {
				context.commit("pushError", {error: error.toString()});
			}
		}
	},
	getters: {
		numberOfUnreadMessages(state) {
			return state.messages.filter((message) => !message.read).length;
		},
		sortMessagesByDate(state) {
			const messages = {...state}.messages;
			return messages.sort((m1, m2) => new Date(m2.date) - new Date(m1.date));
		}
	}
};
