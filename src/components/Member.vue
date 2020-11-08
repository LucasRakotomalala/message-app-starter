<template>
  <router-link :to="{ name: 'Conversation', params: { id: this.sender.uId, sender: this.sender }}" @click="markAsRead">
    <div class="card border-bottom">
      <div class="card-body">
        <div class="media">
          <div class="avatar mr-3">
            <img class="avatar-img" :src="member.profileImage" alt="Profile Image">
          </div>
          <div class="media-body overflow-hidden">
            <div class="d-flex align-items-center mb-auto">
              <h5 class="text-truncate mr-auto">{{member.firstName + " " + member.lastName}}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import {membersRef} from "@/api/firebase";

export default {
name: "Member",
  props: {
    member: Object,
  },
  data() {
    return {
      sender: Object,
    };
  },
  beforeCreate() {
    membersRef.once("value", members => {
      members.forEach(member => {
        if (member.val().uId === this.member.uId)
          this.sender = member.val();
      });
    });
  },
}
</script>

<style scoped>

</style>
