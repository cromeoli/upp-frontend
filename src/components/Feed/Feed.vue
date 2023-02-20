<script>
import Navbar from "./BotNavbar.vue";
import OppenheimerPost from "./OppenheimerPost.vue";
import Drawer from "../Auth/Drawer.vue";
import TopNavbar from "./TopNavbar.vue";
import BotNavbar from "./BotNavbar.vue";
import JoinUpp from "./JoinButton.vue";
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

  methods: {

    handleJoinClicked(){
      const drawer = this.$refs.drawer;
      drawer.drawerOpened = !drawer.drawerOpened;
    },
  }

}
</script>

<template>


  <Drawer ref="drawer">

  </Drawer>

  <!-- Responsive Background -->
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

        <JoinUpp
            button-text="Join Upp"
            v-on:join-clicked="handleJoinClicked"
        >

        </JoinUpp>

    </section>

    <section class="BottomNavbarArea">
      <BotNavbar></BotNavbar>
    </section>
  </div>

</template>

<style scoped>

</style>