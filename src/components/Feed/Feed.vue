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

export default {
  name: "Feed",
    components: {
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
      post:{},
      currentPost: 0,
      reloadWhen: 0,
      timeRemaining: 0,
      timeForPostChange: 10000, // Tiempo para cambiar de upp
      enableCountdown: false,
      postloading: false,
      loading: true,
      dissolveAnimation:""
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

    handleJoinClicked(){
      const drawer = this.$refs.drawer;
      drawer.drawerOpened = !drawer.drawerOpened;
    },
    loadPosts(){
      axios.get(`http://localhost:3003/api/v1/posts/pages/${this.page}`)
          .then(response => {
            if(response){
              if(response.data.length === 0){
                console.log(response.data)
                console.log("Sin mas datos que cargar")
                this.page = 1
                this.loadPosts()
              }
              this.posts = response.data;
              this.post = this.posts[0];
              this.nextPage();
              this.loading = false;
              console.log("Feed - Posts cargados >:)")
            }

          })
          .catch(error => {
            console.log(error);
          })
    },
    nextPage(){
      this.page++;
    },

    loadMagazine() {
      this.reloadWhen = this.ammo.length - 2 <= 0 ? 1 : this.ammo.length - 2;
      this.post = this.magazine[0];
    },

    nextPost(){
      console.log("Llamo Nextpost")
      this.timeRemaining = 0
      this.toggleCountdown()
      this.dissolveAnimation = "dissolveAnimation"
      this.$emit('currentpost',this.currentPost)

      this.reloadWhen === 0 ? this.$emit('needMorePostsHere') : "";

      // Esperamos a que se complete la animacion de transición para cargar el post nuevo
      setTimeout(() => {
        if(this.currentPost === 9){
          this.post = this.posts[0];
          console.log(this.post)
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
    }
    ,

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

    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },

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
        <OppenheimerPost :post="post"
                         :timeRemaining="timeRemaining"
                         @nextPost="nextPost"
                         @click="toggleCountdown"
                         @uppGived="nextPost"
                         v-if="!loading"
                         :dissolveAnimation="dissolveAnimation"
        >
        </OppenheimerPost>
        <MockupPost v-else></MockupPost>
      </div>
    </section>

    <section class="postDataArea">
      <PostDataArea
          :post="post"
          v-if="!loading">

      </PostDataArea>
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