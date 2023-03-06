<script>
import Navbar from "./BotNavbar.vue";
import OppenheimerPost from "./OppenheimerPost.vue";
import Drawer from "../Auth/Drawer.vue";
import TopNavbar from "./TopNavbar.vue";
import BotNavbar from "./BotNavbar.vue";
import JoinUpp from "./JoinButton.vue";
import UploadButton from "./UploadButton.vue";
import PostDataArea from "./PostDataArea.vue";
import axios from "axios";
import MockupPost from "./mockupPost.vue";
import UploadContentMenu from "./uploadContentMenu.vue";
import ProfileButton from "./profileButton.vue";

export default {
  name: "Feed",
    components: {
      ProfileButton,
      UploadContentMenu,
      MockupPost,
      PostDataArea,
      UploadButton,
      JoinUpp,
      Navbar,
      OppenheimerPost,
      Drawer,
      TopNavbar,
      BotNavbar
    },
  // Variables del componente
    data(){
    return {
      page:1,
      posts:[],
      bufferPosts:[],
      post:{},
      currentPost: 0,
      reloadWhen: 0,
      timeRemaining: 0,
      timeForPostChange: 10000, // Tiempo para cambiar de upp
      enableCountdown: false,
      postloading: false,
      loading: true,
      dissolveAnimation:"",
      isLoged: false
     }
    },
  mounted() {
    this.loadPosts()
    this.countdown()

  },
  watch:{
    post(newValue){
      this.post = newValue
    }
  },
  methods: {

    handleUploadClicked(){
      const upload = this.$refs.upload;
      upload.uploadOpened = !upload.uploadOpened
    }
    ,
    handleJoinClicked(){
      const drawer = this.$refs.drawer;
      drawer.drawerOpened = !drawer.drawerOpened;
    },
    loadPosts() {
      axios.get(`http://localhost:3003/api/v1/posts/pages/${this.page}`)
          .then(response => {
            if (response && response.data && response.data.length > 0) {

              this.posts = [];
              this.posts.push(...response.data);
              this.reloadWhen = this.posts.length - 2 <= 0 ? 1 : this.posts.length - 2;
              this.post = this.posts[0];
              this.loading = false;
              console.log("New posts loaded");
            }
          })
          .catch(error => {
            console.log(error);
          })
    },
    nextPage(){
      this.page++;
    },

    reload(){
      this.nextPage();
      console.log("reload() -> Aumento página y cargo bufferposts")
      axios.get(`http://localhost:3003/api/v1/posts/pages/${this.page}`)
          .then(response => {
            if(response){
              if(response.data.length === 0){
                console.log("Sin mas datos que cargar")
                this.page = 1;
                this.postsEndReached();

              }
              this.bufferPosts = response.data;

              this.post = this.posts[0];
              this.loading = false;

            }

          })
          .catch(error => {
            console.log(error);
          })
    },

    postsEndReached(){
      axios.get(`http://localhost:3003/api/v1/posts/pages/1`)
          .then(response => {
            if(response){
              this.bufferPosts = response.data;
            }

          })
          .catch(error => {
            console.log(error);
          })
    },

    nextPost(){
      console.log("Llamo Nextpost")
      this.timeRemaining = 0
      this.toggleCountdown()
      this.dissolveAnimation = "dissolveAnimation"

      this.$emit('currentpost',this.currentPost)

      this.reloadWhen--
      this.reloadWhen === 0 ? this.reload() : "";


      // Esperamos a que se complete la animacion de transición para cargar el post nuevo
      setTimeout(() => {
        if(this.currentPost === this.posts.length -1){
          this.reloadWhen = this.posts.length - 2 <= 0 ? 1 : this.posts.length - 2;
          this.posts = [...this.bufferPosts]
          this.bufferPosts = []
          this.post = this.posts[0];
          this.currentPost = 0;

        }else{
          console.log("ELSE")
          this.currentPost++;
          this.post = this.posts[this.currentPost];
        }
      }, 350)

      setTimeout(() => {
        this.toggleCountdown()
        this.dissolveAnimation = ""
      }, 1003)
    },

    countdown(){
      console.log("Llamo Countdown")
      setInterval(() => {
        if(this.enableCountdown){
          if (this.timeRemaining < this.timeForPostChange) { //Mientras que el contador sea menor que el tiempo para cambiar
            this.timeRemaining += 50; // Incrementar el contador cada 100 milisegundos
          } else {
            this.nextPost();
            this.timeRemaining = 0; // Reiniciar el contador después de 5 segundos
          }
        }
      }, 50); // Temporizador de 100 milisegundos
    },

    toggleCountdown(){
      this.enableCountdown = !this.enableCountdown
    },
  },

}
</script>

<template>


  <Drawer ref="drawer"
          @isLoged="isLoged = true"
  >

  </Drawer>

  <!-- upload Content-->
  <uploadContentMenu ref="upload" v-on:closeUpload="handleUploadClicked">

  </uploadContentMenu>

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
        <UploadButton v-if="isLoged" v-on:upload-clicked="handleUploadClicked"></UploadButton>
        <OppenheimerPost v-if="post && !loading"
                         :timeRemaining="timeRemaining"
                         @nextPost="nextPost"
                         @click="toggleCountdown"
                         @uppGived="nextPost"
                         :post="post"
                         :dissolveAnimation="dissolveAnimation"
                         :enableCountdown="enableCountdown"
        >
        </OppenheimerPost>
        <MockupPost v-else></MockupPost>
      </div>
    </section>

    <section class="postDataArea">
      <PostDataArea
          v-if="post && !loading"
          :post="post"
          >

      </PostDataArea>
    </section>

    <section  class="profileArea">
      <ProfileButton @logout="isLoged = false" v-if="isLoged"/>
    </section>

    <section class="joinUppArea">

        <JoinUpp
            v-if="!isLoged"
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