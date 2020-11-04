<template>
    <div class="d-block">
        <Message role="button" v-on:mark-as-read="markAsRead(currentMessage, $event)" v-for="currentMessage in messages" :key="currentMessage.id" :message="currentMessage"/>
    </div>
    <Menu :unread-messages="unreadMessages"/>
</template>

<script>
	import {messagesMock} from "../mocks/messages.mock";
	import Message from "./Message";
	import Menu from "./Menu";

	export default {
		name: "Messages",
		components: {Menu, Message},
        created() {
			this.sortMessagesByDate();
			this.countUnreadMessages();
		},
		data() {
			return {
				messages: messagesMock,
                unreadMessages: 0,
			}
        },
        methods: {
			markAsRead(message, event) {
				message.read = event;
				this.countUnreadMessages();
			},
            sortMessagesByDate() {
				this.messages.sort((m1, m2) => new Date(m2.date) - new Date(m1.date)); // Ordre chronologique
            },
            countUnreadMessages() {
				this.unreadMessages = this.messages.filter((message) => !message.read).length;
            }
		},
	}
</script>

<style scoped>

    Message {

    }

</style>
