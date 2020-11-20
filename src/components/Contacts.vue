<template>
  <h2>Contacts</h2>
  <div class="d-block">
    <Contact v-for="currentContact in contacts" :key="currentContact.id" :contact="currentContact"/>
  </div>
</template>

<script>
import Contact from "@/components/Contact";
export default {
  name: "Contacts",
  components: {Contact},
  created() {
    this.$store.dispatch("setContacts"); // In case of refreshing contact page
  },
  computed: {
    contacts() {
      return this.$store.getters.getContacts;
    }
  }
}

</script>

<style scoped>

</style>
