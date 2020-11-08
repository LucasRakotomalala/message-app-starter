<template>
    <div id="main-content">
      <router-view/>
    </div>
    <Menu :unreadMessages="unreadMessages"/>
</template>

<script>
  import Menu from "./components/Menu";
  import {messagesRef} from "@/api/firebase";

  export default {
    name: "App",
    components: {
      Menu,
    },
    beforeCreate() {
      messagesRef.once("value", messages => {
        messages.forEach(message => {
          this.messages.push({
            messageId: message.key,
            info: message.val(),
          });
          if (!message.val().read)
            this.unreadMessages++;
        });
      });
    },
    created() {
      this.$store.dispatch("updateAuth");
      messagesRef.on("child_changed", (snapshot) => {
        const messages = this.messages.filter(msg => msg.info.receiverUId === snapshot.val().receiverUId);
        if (messages.filter(msg => msg.info.read === snapshot.val().read).length === messages.length)
          ++this.unreadMessages;
        else {
          messages.forEach((msg) => {
            if (this.unreadMessages > 0 && !msg.info.read)
              --this.unreadMessages
          });
        }
      });
    },
    data() {
      return {
        unreadMessages: 0,
        messages: [],
      }
    },
};
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
  #main-content {
    margin-bottom: 50px;
  }
  a {
    color: black;
  }
  a:hover {
    color: grey;
  }
</style>
