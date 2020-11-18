<template>
  <Errors/>
  <div id="main-content">
    <router-view/>
  </div>
  <Menu/>
</template>

<script>
import Menu from "@/components/Menu";
import Errors from "@/components/Errors";

export default {
  name: "App",
  components: {
    Errors,
    Menu,
  }
};
</script>

<style lang="scss">
@import "../node_modules/bootstrap/scss/bootstrap.scss";
#main-content {
  margin-bottom: 50px;
}
a {
  color: black;
}
a:hover {
  color: grey;
}
</style>
