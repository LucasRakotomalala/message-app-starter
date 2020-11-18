<template>
  <div v-for="error in errors" :key="error.id">
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
      {{ error }}
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/js/bootstrap.min"
export default {
  name: "Errors",
  computed: {
    errors() {
      return this.$store.getters.getErrors;
    }
  }
}
</script>

<style scoped>

</style>
