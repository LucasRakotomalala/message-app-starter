<template>
  <div class="card border-bottom">
    <div class="card-body">
      <div class="media">
        <div class="avatar mr-3">
          <img class="avatar-img" :src="contact.profileImage" alt="Profile Image">
        </div>
        <div class="align-self-center media-body overflow-hidden">
          <div class="d-flex align-items-center mb-auto">
            <h3 class="text-truncate mr-auto">{{ contact.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Contact",
  props: {
    contact: Object,
  }
}
</script>

<style scoped>
.avatar, .avatar > img {
  height: 80px;
  width: 80px;
  border-radius: 50%;
}
</style>
