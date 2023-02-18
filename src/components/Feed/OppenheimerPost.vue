<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      postsBuffer:[],
      post: {},
      currentPost:0,
      accumulatedTime: 0,
      upp: false,
      uppVisibility:"nonVisible",
      postVisibility:"visible",
      contador: 0,
      tiempo: 10000, // Tiempo para cambiar de upp
      enableCountdown: false
    };
  },
  mounted() {
    this.loadPosts();
    this.countdown();
  },
  methods: {
    nextPost(){
      this.contador = 0
      this.toggleCountdown()
      this.postVisibility = "nonVisible"

      setTimeout(() => {
        if(this.currentPost === 9){
          this.post =this.post[0];
          this.currentPost = 0;
        }else{
          this.currentPost++;
          this.post = this.posts[this.currentPost];
        }
      }, 350)

        setTimeout(() => {
          this.postVisibility = "visible";
        }, 700)
      setTimeout(() => {
        this.toggleCountdown()
      }, 1000)
      },

    countdown(){
        setInterval(() => {
          if(this.enableCountdown){
            if (this.contador < this.tiempo) {
              this.contador += 50; // Incrementar el contador cada 100 milisegundos
            } else {
              this.nextPost();
              this.contador = 0; // Reiniciar el contador después de 5 segundos
            }
          }
        }, 50); // Temporizador de 100 milisegundos

    },

    toggleCountdown(){
      this.enableCountdown = !this.enableCountdown
    },

    addUpp(){
      this.upp = true;

      setTimeout(() => {
        this.uppVisibility = "visible"
      }, 200);
      setTimeout(() => {
        this.uppVisibility = "nonVisible"
      }, 1000);
      setTimeout(() => {
        this.upp = false
      }, 1200);
    },


    loadPosts() {
      axios.get('http://localhost:3003/api/v1/posts')
          .then(response => {
            this.posts = response.data;
            this.post = this.posts[0]
          })
          .catch(error => {
            console.log(error)
          })
    },


    loadBufferPosts(){
      axios.get('http://localhost:3003/api/v1/posts')
          .then(response => {
            this.posts = response.data;
            this.post = this.posts[0]
          })
          .catch(error => {
            console.log(error)
          })
    },


    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    stopCounter(){
      this.contador = 0
    }


  },
};
</script>

<template>
  <div class="centerPost">
    <p v-if="upp" :class="uppVisibility">Upp!</p>
    <div
        class="post"
        :class="postVisibility"
        :style="{ transform: `translateY(${direction > 0 ? -accumulatedTime*2.5 : accumulatedTime*2.5}px)`}"
        @click="toggleCountdown"
        v-on:dblclick="nextPost"

    >
      <p>Time: {{ accumulatedTime }} s</p>
      <p>Titulo: {{ post.titulo }}</p>
      <p>Tiempo restante: {{ contador }}</p>
      <p v-if="post.tipo === 'texto'">Contenido: {{ post.contenido }}</p>
      <img v-if="post.tipo === 'imagen'" :src="post.contenido">

    </div>

  </div>
  <div class="loading"
       :style="{ width: `${contador/100}%`}"
  >

  </div>
</template>

<style>
.nonVisible{
  opacity: 0;
}

.visible{
  opacity: 100;
}

.uppText{
  transition: 1s;
}

.centerPost{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.loading{
  margin-top: 10px;
  height: 5px;
  background: black;
  transition: 0.1s;
}

.post {
  width: 55vh;
  height: 40vw;
  max-height: 30rem;
  min-height: 30rem;
  max-width: 25rem;
  min-width: 25rem;

  background-color: red;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}
</style>
