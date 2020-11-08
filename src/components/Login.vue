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
import {membersRef} from "@/api/firebase";

export default {
  name: "Login",
  created() {
    membersRef.on("child_added", snapshot => {
      this.membersUId.push(snapshot.val().uId);
    });
    membersRef.on("child_removed", snapshot => {
      this.membersUId = this.membersUId.filter(memberUId => memberUId !== snapshot.val().uId);
    });
  },
  data() {
    return {
      membersUId: [],
    };
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then((result) => {
        if (!this.membersUId.includes(result.user.uid)) {
          const displayName = result.user.displayName.split(" ");
          membersRef.push({
            firstName: displayName[0],
            lastName: (displayName.length > 1) ? displayName[1] : "",
            profileImage: result.user.photoURL,
            uId: result.user.uid,
          });
        }
        this.$router.push({name: 'Messages'});
        location.reload();
      }).catch((err) => {
        alert('Oops. ' + err.message)
      });
    }
  }
}
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
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
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
}
.social-button img {
  width: 100%;
}
</style>
