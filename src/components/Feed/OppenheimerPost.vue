<script>
import axios from "axios";

export default {
  props: {
    post: {
      type: Object,
      required: true
    },
    timeRemaining: {
      type: Number,
      required: true
    },
    dissolveAnimation:{
      type: String,
      required: true
    },
    enableCountdown:{
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // Variables del componente
      uppVisibility:"nonVisible",
      upp: false,
      deltaY: 0,
      slideUpAnimation: "",
    };
  }
,
  mounted() {
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
  computed:{

  },

  methods: {
    addUpp(){
      this.upp = true;
      this.slideUpAnimation= "slideUpAnimation";
      this.uppVisibility = "visible"

      setTimeout(() => {
        this.upp = false
        this.slideUpAnimation= ""
        this.uppVisibility = "nonVisible"
        this.$emit("uppGived")
      }, 1500);
    },
  },
};
</script>

<template>

  <div id="post">
    <div  class="uppText" :class="uppVisibility">
      <div class="custom-loader2"></div>
    </div>
      <div
          class="post"
          :class="{slideUpAnimation, dissolveAnimation}"
          v-on:dblclick="$emit('nextPost')"
      >
        <div class="content">

          {{ post.contenido }}
        </div>

    </div>
    <div class="loading" :style="{ width: `${timeRemaining/100}%`}"></div>
    <i class="material-icons pause" v-if="!enableCountdown">pause</i>
  </div>
</template>

<style>
.nonVisible{
  opacity: 0;
}

.visible{
  opacity: 100;
}

.pause{
  position: absolute;

}

.uppText{
  position: absolute;
  transition: 1s;
  left: 14%;
  transform: rotate(-90deg);
}

.content{
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  text-justify: auto;
  line-height: 1.1em;
  padding: 1.5em;
  width: 100%;
  height: 100%;
  font-family: Inter;
  font-weight: 600;
  font-size: 38px;
  cursor: pointer;
}

.flexbox{
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading{
  margin-top: 40px;
  height: 5px;
  background: black;
  transition: 0.1s;
}

.postContent{

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

.custom-loader2 {
  width:50px;
  height:30px;
  display: grid;
  overflow: hidden;
}
.custom-loader2:before,
.custom-loader2:after {
  content: "";
  grid-area: 1/1;
  background: #000000;
  clip-path: polygon(0 10px,calc(100% - 15px) 10px,calc(100% - 15px) 0,100% 50%,calc(100% - 15px) 100%,calc(100% - 15px) calc(100% - 10px),0 calc(100% - 10px));
  animation: a5 1s infinite;
  transform: translate(calc(0% + var(--s,0%)));
}

.custom-loader2:after {
  --s:-100%;
}

@keyframes a5 {
  80%,100%{transform: translate(calc(100% + var(--s,0%)))}
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
