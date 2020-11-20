<template>
  <div class="login">
    <h3>Connexion</h3>
    <button @click="socialLogin" class="social-button">
      <img alt="Google Logo" src="../assets/google-logo.png">
    </button>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import {auth, contactsRef} from "@/api/firebase.api";

export default {
  name: "Login",
  created() {
    this.$store.dispatch('setContacts');
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider).then((result) => {
        if (!this.contactsUId.includes(result.user.uid)) {
          const displayName = result.user.displayName.split(" ");
          contactsRef.push({
            firstName: displayName[0],
            lastName: (displayName.length > 1) ? displayName[1] : "",
            profileImage: result.user.photoURL,
            uId: result.user.uid,
          });
        }
        this.$router.push({name: 'messages'});
      }).catch((error) => {
        this.$store.commit("pushError", {error: error.message});
      });
    }
  },
  computed: {
    contactsUId() {
      return this.$store.getters.getContactsUId;
    }
  }
}
</script>

<style scoped>
.login {
  text-align: center;
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

p {
  margin-top: 40px;
  font-size: 13px;
}

p a {
  text-decoration: underline;
  cursor: pointer;
}

.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}

.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}

.social-button img {
  width: 100%;
}
</style>
