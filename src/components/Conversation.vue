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
export default {
  name: "Conversation",
  data() {
    return {
      id: this.$route.params.id,
      messageToSend: "",
    }
  },
  computed: {
    getAuth() {
      return this.$store.getters.getAuth;
    },
    sender() {
      return this.$store.getters.getContactByUId(this.id);
    },
    messages() {
      return this.$store.getters.filterMessagesForConversation(this.getAuth, this.id);
    }
  }
}
</script>

<style scoped>

</style>
