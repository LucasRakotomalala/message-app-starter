<template>
    <footer class="footer">
        <div class="container d-flex justify-content-around">
            <i role="button" class="fas fa-user-friends fa-2x" @click="seeMembers"></i>
            <i class="fas fa-phone fa-2x"></i>
            <i role="button" class="fas fa-comment-dots fa-2x" :data-count="unreadMessages" @click="seeMessages"></i>
            <i class="fas fa-credit-card fa-2x"></i>
            <i role="button" class="fas fa-ellipsis-h fa-2x" @click="signOut"></i>
        </div>
    </footer>
</template>

<script>
  import firebase from "firebase/app";
  import "firebase/auth";

	export default {
		name: "Menu",
    props: {
			unreadMessages: Number,
    },
    methods: {
      signOut() {
        firebase.auth().signOut().then(() => {
          this.$router.push({name: 'Login'});
          location.reload();
        });
      },
      seeMembers() {
        this.$router.push({name: 'Members'});
      },
      seeMessages() {
        this.$router.push({name: 'Messages'});
      },
    },
  }
</script>

<style scoped lang="scss">
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
    i[data-count] {
        position: relative;
    }
    i[data-count]:after {
        position: absolute;
        right: -0.5em;
        content: attr(data-count);
        padding: .2em;
        border-radius: 10em;
        line-height: .9em;
        color: white;
        background: rgba(255,0,0,.75);
        text-align: center;
        width: 1.5em;
        font: bold .4em sans-serif;
    }
    i[data-count='0']:after {
      visibility: hidden;
    }
</style>
