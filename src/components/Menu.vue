<template>
  <footer class="footer">
    <div class="container d-flex justify-content-around">
      <router-link to="/contacts"><i class="fas fa-user-friends fa-2x"></i></router-link>
      <i class="fas fa-phone fa-2x"></i>
      <router-link to="/messages">
        <i v-if="unreadMessages > 0" class="fas fa-inbox fa-2x" :data-count="unreadMessages"></i>
        <i v-else class="fas fa-inbox fa-2x"></i>
      </router-link>
      <i class="fas fa-credit-card fa-2x"></i>
      <i class="fas fa-ellipsis-h fa-2x" @click="signOut"></i>
    </div>
  </footer>
</template>

<script>
import {auth} from "@/api/firebase.api";

export default {
  name: "Menu",
  methods: {
    signOut() {
      auth.signOut().then(() => {
        this.$router.push({name: 'login'});
        location.reload();
      });
    },
  },
  computed: {
    unreadMessages() {
      return this.$store.getters.numberOfUnreadMessages;
    }
  }
}
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background-color: #f5f5f5;
}

.container {
  width: auto;
  max-width: 680px;
  padding: 0 15px;
}

.fas {
  line-height: inherit;
}

.fas[data-count] {
  position: relative;
}

.fas[data-count]:after {
  position: absolute;
  right: -0.5em;
  content: attr(data-count);
  padding: .2em;
  border-radius: 10em;
  line-height: .9em;
  color: white;
  background: rgba(255, 0, 0, .75);
  text-align: center;
  width: 1.5em;
  font: bold .4em sans-serif;
}
</style>
