<script>
import Navbar from "./BotNavbar.vue";
import OppenheimerPost from "./OppenheimerPost.vue";
import Drawer from "../Auth/Drawer.vue";
import TopNavbar from "./TopNavbar.vue";
import BotNavbar from "./BotNavbar.vue";
import JoinUpp from "./MainButton.vue";
import UploadButton from "./UploadButton.vue";
import axios from "axios";

export default {
  name: "Feed",
    components: {
      UploadButton,
      JoinUpp,
    Navbar,
      OppenheimerPost,
      Drawer,
      TopNavbar,
      BotNavbar
    },
  // Variables del componente
  posts: [],
  postsBuffer:[],
  post: {},
  page: 1,


  mounted() {
    this.firstPostLoad();

  },

  methods: {
    firstPostLoad() {
      axios.get(`http://localhost:3003/api/v1/posts/pages/1`)
          .then(response => {
            this.posts = response.data;
            this.post = this.posts[0];
            this.page++;
          })
          .catch(error => {
            console.log(error);
          })
    },
  }

}
</script>

<template>

  <!-- Responsive Background -->
  <div class="backgroundYellow"></div>
  <div class="backgroundWhite"></div>
  <div class="backgroundBlue"></div>
  <div class="backgroundRed"></div>

  <!-- Main content -->
  <div class="mainDiv">
    <section class="profileArea">
      <TopNavbar></TopNavbar>
    </section>

    <section class="postArea">
      <div id="post" class="flexbox">
        <UploadButton></UploadButton>
        <OppenheimerPost></OppenheimerPost>
      </div>
    </section>

    <section class="postDataArea">

    </section>

    <section class="joinUppArea">

        <JoinUpp button-text="Join Upp"></JoinUpp>

    </section>

    <section class="BottomNavbarArea">
      <BotNavbar></BotNavbar>
    </section>
  </div>

  <Drawer></Drawer>



</template>

<style scoped>

</style>