<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
      postsBuffer:[],
      post: {},
      currentPost:0,
      offset: 0,
      wheelInterval: null,
      opacidad: 100,
      accumulatedTime: 0,
      direction:0,
      timer: null,
      upp: false,
      uppVisibility:"nonVisible",
      postVisibility:"visible"
    };
  },
  mounted() {
    this.loadPosts();
  },
  methods: {
    handleWheel(event) {
      let index = 0
      let deltaY = event.deltaY;

      // Reiniciar el temporizador si la rueda del ratón se mueve de nuevo
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if(deltaY > 0){
        this.direction = 1
      }else{
        this.direction = -1
      }

      // Actualizar el temporizador después de 500 milisegundos de inactividad
      this.timer = setTimeout(() => {
        this.postVisibility = "visible"
        this.accumulatedTime = 0;
      }, 700);

      // Desplazamiento hacia arriba
      if(this.accumulatedTime > 29 && deltaY > 0){
        console.log("Upp!")

        if(this.currentPost === 9){
          this.post =this.post[0]
          this.currentPost = 0
        }else{
          this.post = this.posts[this.currentPost++]
        }

        this.postVisibility = "nonVisible"
        this.direction = 0;
        this.accumulatedTime = 0;
        this.addUpp()
      }

      // Desplazamiento hacia abajo
      if(this.accumulatedTime > 30 && deltaY < 0){

        if(this.currentPost === 9){
          this.post =this.post[0]
          this.currentPost = 0
        }else{
          this.post = this.posts[this.currentPost++]
        }

        this.postVisibility = "nonVisible"
        this.direction = 0;
        this.accumulatedTime = 0;
      }

      // Acumular el tiempo si la rueda del ratón se está moviendo
      console.log(deltaY);
      this.accumulatedTime++;
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
    }
    ,
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
        @wheel="handleWheel"
    >
      <p>Time: {{ accumulatedTime }} s</p>
      <p>Titulo: {{ post.titulo }}</p>
      <p v-if="post.tipo === 'texto'">Contenido: {{ post.contenido }}</p>
      <img v-if="post.tipo === 'imagen'" :src="post.contenido">

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
  transition: 1s;
}

.centerPost{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
