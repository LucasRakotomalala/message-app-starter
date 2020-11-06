<template>
    <div id="main-content">
      <Messages v-on:unread-messages="updateCounterUnreadMessages"/>
    </div>
    <Menu :unreadMessages="this.unreadMessages"/>
</template>

<script>
  import Messages from "./components/Messages";
  import Menu from "./components/Menu";

  export default {
    name: "App",
    components: {
      Messages,
      Menu,
    },
    data() {
      return {
        unreadMessages: 0,
      }
    },
    methods: {
      updateCounterUnreadMessages(value) {
        this.unreadMessages = value;
      }
    }
};
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
  #main-content {
    margin-bottom: 50px;
  }
</style>
