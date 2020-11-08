<template>
  <div v-for="currentMessage in messages" :key="currentMessage.info.id">
    <div v-if="currentMessage.info.senderUId === id" class="message">
      <img :src="sender.profileImage" alt="Avatar">
      <p>{{currentMessage.info.content}}</p>
      <span class="time-right">{{formatDate(currentMessage.info.date)}}</span>
    </div>
    <div v-else class="message darker">
      <img :src="getAuth.photoURL" alt="Avatar" class="right">
      <p>{{currentMessage.info.content}}</p>
      <span class="time-left">{{formatDate(currentMessage.info.date)}}</span>
    </div>
  </div>
  <div class="send-message">
    <input v-model="messageToSend" type="text"/>
  </div>
  <button class="btn btn-primary" @click="sendMessage">Envoyer</button>
</template>

<script>
import {membersRef, messagesRef} from "@/api/firebase";
import {format, sortBy,} from "@/utils/utils";
import "es6-promise/auto";

export default {
  name: "Conversation",
  data() {
    return {
      id: this.$route.params.id,
      sender: Object,
      messages: [],
      messageToSend: "",
    }
  },
  beforeCreate() {
    membersRef.once("value", members => {
      members.forEach(member => {
        if (member.val().uId === this.id)
          this.sender = member.val();
      });
    });
  },
  created() {
    messagesRef.on("child_added", snapshot => {
      if ((snapshot.val().senderUId === this.id && snapshot.val().receiverUId === this.getAuth.uid) || (snapshot.val().senderUId === this.getAuth.uid && snapshot.val().receiverUId === this.id))
        this.messages.push({
          messageId: snapshot.key,
          info: snapshot.val(),
        });
      this.sortMessagesByDate();
    });
  },
  methods: {
    formatDate(date) {
      return format(Date, date);
    },
    sendMessage() {
      const message = {
        content: this.messageToSend,
        date: Date().toString(),
        id: (Date.now() + Math.floor(Math.random() * 100)).toString(),
        read: false,
        receiverUId: this.id,
        senderUId : this.getAuth.uid,
      };
      messagesRef.push(message);
    },
    sortMessagesByDate() {
      return sortBy(Date, "descending", this.messages);
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

/* Chat containers */
.message {
  border: 2px solid #dedede;
  background-color: #f1f1f1;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}

/* Darker chat container */
.darker {
  border-color: #ccc;
  background-color: #ddd;
}

/* Clear floats */
.message::after {
  content: "";
  clear: both;
  display: table;
}

/* Style images */
.message img {
  float: left;
  height: 60px;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}

/* Style the right image */
.message img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}

/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}

/* Style time text */
.time-left {
  float: left;
  color: #999;
}

</style>
