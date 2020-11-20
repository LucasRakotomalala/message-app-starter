import {messagesRef} from "@/api/firebase.api";

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
				await messagesRef.on("value", (snapshot) => {
					context.commit("setMessages", {messages: Object.values(snapshot.val())});
				}, (error) => {
					context.commit("pushError", {error: error.toString()});
				});
			} catch (error) {
				context.commit("pushError", {error: "Error fetching data !"});
			}
		}
	},
	getters: {
		numberOfUnreadMessages(state) {
			return state.messages.filter((message) => !message.read).length;
		},
		sortMessagesByDate(state) {
			return {...state}.messages.sort((m1, m2) => new Date(m2.date) - new Date(m1.date));
		},
		filterMessagesBySenderUId: state => senderUId => {
			return state.messages.filter((message) => message.senderUId === senderUId);
		},
		filterMessagesByReceiverUId: state => receiverUId => {
			return state.messages.filter((message) => message.receiverUId === receiverUId);
		},
		filterMessagesForConversation: state => receiverUId => senderUId => {
			return state.messages.filter((message) => message.senderUID === senderUId && message.receiverUId === receiverUId || message.senderUId === receiverUId && message.receiverUId === senderUId);
		},
		getConversations: state => receiverUId => {
			console.log(state);
			console.log(receiverUId);
			return [];
		}
	}
};
