<template>
  <Messages/>
</template>

<script>
  import Messages from "./components/Messages";

  export default {
  name: "App",
  components: {
    Messages,
  }
};
</script>

<style lang="scss">
  @import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
