<template>
  <h2>Membres du site</h2>
  <div class="d-block">
    <Member role="button" v-for="currentMember in members" :key="currentMember.uId" :member="currentMember" />
  </div>

</template>

<script>
import {membersRef} from "@/api/firebase";
import Member from "@/components/Member";

export default {
name: "Members",
  components: {Member},
  data() {
    return {
      members: [],
    };
  },
  created() {
    membersRef.once("value", members => {
      members.forEach(member => {
        console.log(member.val())
        if (member.val().uId !== this.getAuth.uid)
          this.members.push(member.val());
      });
    });
  },
  computed: {
    getAuth() {
      return this.$store.getters.getAuth;
    }
  }
}
</script>

<style scoped>

</style>
