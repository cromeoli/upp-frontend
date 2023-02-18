<script>
import Navbar from "../Navbar.vue";
import Post from "./Post.vue";
import PostTestVue2 from "./PostTestVue2.vue";
import OppenheimerPost from "./OppenheimerPost.vue";
import CircleProgress from "vue3-circle-progress";

export default {
  name: "Feed",
    components: {Navbar, Post, OppenheimerPost, PostTestVue2, dragPostTest}
}

</script>

<template>
  <OppenheimerPost></OppenheimerPost>


</template>

<style scoped>

</style>