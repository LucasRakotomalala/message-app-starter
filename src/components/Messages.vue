<template>
  <h2>Chats</h2>
  <div class="list-group list-group-horizontal">
    <a href="" class="list-group-item active-item">Tous les messages</a>
    <a href="" class="list-group-item">Favoris</a>
    <!-- <a href="#" class="list-group-item">Canaux</a> -->
  </div>
  <div class="d-block">
      <Message role="button" v-on:mark-as-read="markAsRead(currentMessage, currentMessage.messageId, $event)" v-for="currentMessage in messages" :key="currentMessage.info.id" :message="currentMessage.info" :senderId="currentMessage.info.senderId"/>
  </div>
</template>

<script>
	import Message from "./Message";
  import {messagesRef} from "@/api/firebase";

	export default {
		name: "Messages",
		components: {Message},
    emits: ["unread-messages"],
    beforeCreate() {
      messagesRef.once("value", messages => {
        messages.forEach(message => {
          this.messages.push({
            messageId: message.key,
            info: message.val(),
          });
        });
        this.sortMessagesByDate();
        this.countUnreadMessages();
      });
    },
		data() {
			return {
				messages: [],
			}
    },
    methods: {
      markAsRead(message, messageId, event) {
        messagesRef.child(messageId).update({
          read: event,
        });
        message.info.read = event;
        this.countUnreadMessages();
      },
      sortMessagesByDate() {
        this.messages.sort((m1, m2) => new Date(m2.info.date) - new Date(m1.info.date)); // Ordre chronologique
      },
      countUnreadMessages() {
        this.$emit("unread-messages", this.messages.filter((message) => !message.info.read).length);
      },
    },
  }
</script>

<style scoped>
  a:hover {
    position: relative;
    text-decoration: none;
  }
  .list-group-item {
    color: black;
    border: 0;
    border-radius: 0;
    padding: 12px 0 4px 0;
    margin: 0 20px 8px 20px;
  }
  .list-group-item::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: blue;
    visibility: hidden;
    transform: scaleX(0);
    transition: all 0.3s ease-in-out 0s;
  }
  .list-group-item:hover::before {
    visibility: visible;
    transform: scaleX(1);
  }
  .active-item {
    font-weight: bold;
    color: blue;
  }
  .active-item::before {
    visibility: visible;
    transform: scaleX(1);
  }
</style>
