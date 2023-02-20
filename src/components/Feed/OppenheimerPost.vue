<script>
import axios from "axios";

export default {
  data() {
    return {
      props: {
        postContent: {
          type: String,
          required: true
        },
        postType: {
          type: String,
          required: true
        },
      },

      // Variables del componente
      posts: [],
      postsBuffer:[],
      post: {},
      page: 1,
      currentPost:0,
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
    this.firstPostLoad();
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

      if(this.currentPost === this.posts.length - 2 || ( this.currentPost === this.posts.length - 1 )){
        console.log("Cargando buffer...")
        this.loadBufferPosts()
      }

      // Esperamos a que se complete la animacion de transición para cargar el post nuevo
      setTimeout(() => {
        if(this.currentPost === 9){
          console.log("Asignando el buffer...")
          this.posts = ""
          console.log(this.posts,"<-- imprimiendo posts vacios")
          this.posts = [...this.postsBuffer]
          console.log(`Posts: ${this.posts}`)
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


    loadBufferPosts(){
      axios.get(`http://localhost:3003/api/v1/posts/pages/${this.page}`)
          .then(response => {
            if(response.data.length === 0){
              console.log(response.data, "<-- Response data")
              console.log("Sin mas datos que cargar")
              this.page = 1;
              this.loadBufferPosts()
              return 1
            }
            this.postsBuffer = response.data;
            this.page++;
            console.log("Buffer cargado")
          })
          .catch(error => {
            console.log(error);
          })
    },


    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

  },
};
</script>

<template>

  <div id="post">
    <p v-if="upp" class="uppText" :class="uppVisibility">Upp!</p>
      <div
          class="post"
          :class="{slideUpAnimation, dissolveAnimation}"
          @click="toggleCountdown"
          v-on:dblclick="nextPost"
      >
        <p>Autor: {{ post.autor }}</p>
        <p>Titulo: {{ post.titulo }}</p>
        <p>Tiempo restante: {{ contador }}</p>
        <p v-if="post.tipo === 'texto'" class="textContent">Contenido: {{ post.contenido }}</p>
        <img v-if="post.tipo === 'imagen'" :src="post.contenido" alt="Current Post">

        <div class="loading" :style="{ width: `${contador/100}%`}"></div>
    </div>
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

.textContent{
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
}

.flexbox{
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100%;
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

  background: #FFFFFF;
  border: 3px solid #000000;
  box-shadow: 25px 25px 4px rgba(0, 0, 0, 0.1);
  border-radius: 52px;
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
