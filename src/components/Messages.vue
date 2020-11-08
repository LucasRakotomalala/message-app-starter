<template>
  <h2>Chats</h2>
  <div class="list-group list-group-horizontal">
    <a href="#" class="list-group-item active-item">Tous les messages</a>
    <a href="#" class="list-group-item">Favoris</a>
    <!-- <a href="#" class="list-group-item">Canaux</a> -->
  </div>
  <div class="d-block">
      <Message role="button" v-on:mark-as-read="markAsRead(currentMessage, $event)" v-for="currentMessage in messages" :key="currentMessage.info.id" :message="currentMessage.info" :senderUId="currentMessage.info.senderUId"/>
  </div>
</template>

<script>
	import Message from "./Message";
  import {messagesRef} from "@/api/firebase";
  import "es6-promise/auto";
  import {sortBy} from "@/utils/utils";

	export default {
		name: "Messages",
		components: {Message},
    created() {
      let sendersUId = [];
      messagesRef.on("child_added", message => {
          if (message.val().receiverUId === this.getAuth.uid) {
            const senderUId = message.val().senderUId;
            const date = new Date(message.val().date);
            if (!sendersUId.includes(senderUId)) {
              sendersUId.push(senderUId);
              this.messages.push({
                messageId: message.key,
                info: message.val(),
              });
            } else {
              const msg = this.messages.find((message) => message.info.senderUId);
              if (new Date(msg.info.date) < date) {
                this.messages = this.messages.filter((message) => message.info.senderUId !== senderUId);
                this.messages.push({
                  messageId: message.key,
                  info: message.val(),
                });
              }
            }
          }
          this.allMessages.push({
            messageId: message.key,
            info: message.val(),
          });
        this.sortMessagesByDate();
      });
    },
    data() {
			return {
				messages: [],
        allMessages:[],
			}
    },
    methods: {
      markAsRead(message, event) {
        const messagesToUpdate = this.allMessages.filter((msg) => msg.info.senderUId === message.info.senderUId);
        messagesToUpdate.forEach((msg) => {
          messagesRef.child(msg.messageId).update({
            read: event,
          });
        });
        message.info.read = event;
      },
      sortMessagesByDate() {
        return sortBy(Date, "ascending", this.messages);
      }
    },
    computed: {
      getAuth() {
        return this.$store.getters.getAuth;
      }
    }
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
