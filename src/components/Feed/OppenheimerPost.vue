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
      uppVisibility:"nonVisible",
      upp: false,
      contador: 0,
      tiempo: 10000, // Tiempo para cambiar de upp
      enableCountdown: false,
      deltaY: 0,
      slideUpAnimation: "",
      dissolveAnimation:""
    };
  },
  mounted() {
    this.loadPosts();
    this.countdown();

    const uppPost = document.getElementById("post")

    window.onmousedown = e => {
      uppPost.dataset.mouseDownAt = e.clientY;
      console.log("Clickk");
      window.onmousemove = e => {
        if(uppPost.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(uppPost.dataset.mouseDownAt) - e.clientY,
            maxDelta = window.innerHeight / 2;

        this.deltaY = (mouseDelta / maxDelta) * 100;
        console.log(this.deltaY)
      }
    }

    window.onmouseup = e => {
      if(this.deltaY > 70){
        this.addUpp()
      }
      uppPost.dataset.mouseDownAt = "0";
      this.deltaY = 0
      window.onmousemove = null;
    }
  },
  methods: {
    nextPost(){
      this.contador = 0
      this.toggleCountdown()
      this.dissolveAnimation = "dissolveAnimation"

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
        this.toggleCountdown()
        this.dissolveAnimation = ""
      }, 1003)
      },

    countdown(){
        setInterval(() => {
          if(this.enableCountdown){
            if (this.contador < this.tiempo) { //Mientras que el contador sea menor que el tiempo para cambiar
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
      this.slideUpAnimation= "slideUpAnimation";
      this.uppVisibility = "visible"

      setTimeout(() => {
        this.upp = false
        this.slideUpAnimation= ""
        this.uppVisibility = "nonVisible"
        this.nextPost()
      }, 1500);
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
  <div id="post" class="centerPost">
    <p v-if="upp" class="uppText" :class="uppVisibility">Upp!</p>
    <div
        class="post"
        :class="{slideUpAnimation, dissolveAnimation}"
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
  position: absolute;
  transition: 1s;
  left: 80%;
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
}

.slideUpAnimation{
  animation: slideUp;
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
}

.dissolveAnimation{
  animation: dissolve;
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
}

@keyframes slideUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-180px);
  }
  100%{
    transform: translateY(0);
  }
}

@keyframes dissolve {
  0% {
    opacity: 100;
  }
  50% {
    opacity: 0;
  }
  100%{
    opacity: 100;
  }

}
</style>
