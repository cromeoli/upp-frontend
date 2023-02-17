<template>
  <div class="container post" ref="post">
    <div class="animation-block"
         :class="{ 'animate-up': scrollDirection === 'up', 'animate-down': scrollDirection === 'down' }">
      <!-- contenido del bloque animado -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastScrollPosition: 0,
      currentScrollPosition: 0,
      scrollDirection: ''
    };
  },
  mounted() {
    this.$refs.post.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    this.$refs.post.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.currentScrollPosition = this.$refs.post.scrollTop;
      if (this.currentScrollPosition < this.lastScrollPosition) {
        console.log("going down...")
        this.scrollDirection = 'down';
      } else if (this.currentScrollPosition > this.lastScrollPosition) {
        console.log("going up...")
        this.scrollDirection = 'up';
      }
      this.lastScrollPosition = this.currentScrollPosition;
    }
  }
};
</script>

<style>
.animate-up {
  /* estilos de animación para scroll hacia arriba */
}

.animate-down {
  /* estilos de animación para scroll hacia abajo */
}

.animation-block{
  height: 31rem;
  width: 100%;
}

.post {
  width: 55vh;
  height: 40vw;
  max-height: 30rem;
  min-height: 30rem;
  max-width: 25rem;
  min-width: 25rem;

  overflow: scroll;
  background-color: red;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  transition: 0.3s;
}
</style>
