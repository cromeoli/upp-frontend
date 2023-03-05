<template>
<div class="turnOffLights" v-if="uploadOpened" @click="this.$emit('closeUpload')">
</div>
  <div class="uploadMainFrame " v-if="uploadOpened" >
    <div class="uploadFrame">
      <a href="#" class="uploadOptionButton colorYellow border-rightBottom flex">
        <i class="material-icons icons">image</i>
      </a>
      <a href="#" class="uploadOptionButton colorBlue border-leftBottom flex">
        <i class="material-icons icons">text_fields</i>
      </a>
      <a href="#" class="uploadOptionButton colorRed border-rightTop flex">
        <i class="material-icons icons">movie_filter</i>
      </a>
      <a href="#" class="uploadOptionButton border-leftTop flex">
        <i class="material-icons icons">volume_up</i>
      </a>
    </div>
  </div>

</template>

<script>
import { watch } from "vue";

export default {
  name: "uploadContentMenu",
  data(){
    return{
      uploadOpened:false,
      selectorMenuOpened: false

    }
  },
  watch(){

  }
}
</script>

<style scoped>

.icons{
  font-size: 4em;
}

.uploadOptionButton{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .5rem 1rem;
  background-color: white;
  cursor: pointer;
  transition: 0.5s,transform .5s;
}
.uploadOptionButton:hover{
  box-shadow: .5px 1px 0 0 black,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black,
  4.5px 5px 0 0 black,
  5.5px 6px 0 0 black;
  transform: translate(-5.5px, -6px);
  border: 2px solid black;
  border-radius: 0.3em;

}
.uploadFrame {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 30em;
  width: 30em;
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(255,255,255,0) 45%);
  box-shadow: 10px 10px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.border-rightBottom{
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  border-image: linear-gradient(135deg, white 50%, gray 60%) 1;
}
.border-leftBottom{
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  border-image: linear-gradient(-135deg, white 50%, gray 60%) 1;
}
.border-rightTop{
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  border-image: linear-gradient(45deg, white 50%, gray 60%) 1;
}
.border-leftTop{
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  border-image: linear-gradient(-45deg, white 50%, gray 60%) 1;
}

.uploadMainFrame{
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 2em;
  width: 50vw;
  height: 50vh;
}

.turnOffLights{
  position: absolute;
  background: radial-gradient(circle, gray, black 100%);
  width: 100vw;
  height: 100vh;
  z-index: 800;
  opacity: 45%;
}

.colorBlue{
  background: #B5DDDB;
}

.colorRed{
  background: #FCDCD9;
}

.colorYellow{
  background: #FFEEB4;
}




</style>