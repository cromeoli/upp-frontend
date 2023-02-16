<script>
import Navbar from "../Navbar.vue";
import Post from "./Post.vue";

export default {
  name: "Feed",
  components: {Navbar, Post, PostTest: Post}
}

</script>

<template>
  <Post></Post>


</template>

<style scoped>

</style>