<template>
  <router-link :to="{ name: 'Conversation', params: { id: this.senderUId, sender: this.sender }}" @click="markAsRead">
    <div class="card border-bottom">
        <div class="card-body">
            <div class="media">
                <div class="avatar mr-3">
                    <img class="avatar-img" :src="sender.profileImage" alt="Profile Image">
                </div>
                <div class="media-body overflow-hidden">
                    <div class="d-flex align-items-center mb-auto">
                        <h5 class="text-truncate mr-auto">{{sender.firstName + " " + sender.lastName}}</h5>
                        <p class="small text-muted text-nowrap ml-4">
                            {{formatDate(message.date)}}
                        </p>
                    </div>
                    <div class="text-truncate">
                        <div v-if="!message.read" class="font-weight-bold">
                            {{message.content}}
                        </div>
                        <div v-else>
                            {{message.content}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </router-link>
</template>

<script>
import {membersRef} from "@/api/firebase";
import {format} from "@/utils/utils";

  export default {
		name: "Message",
    props: {
			message: Object,
      senderUId: String,
    },
    emits: ["mark-as-read"],
    data() {
      return {
        sender: Object,
      }
    },
    beforeCreate() {
      membersRef.once("value", members => {
        members.forEach(member => {
          if (member.val().uId === this.senderUId)
            this.sender = member.val();
        });
      });
    },
    methods: {
			markAsRead() {
        this.$emit("mark-as-read", true);
      },
      formatDate(date) {
        return format(Date, date);
      },
    }
	}
</script>

<style scoped>
    .avatar, .avatar>img {
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }
</style>
