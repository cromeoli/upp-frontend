<template>
  <div
      class="backgroundYellow drawerBox"
      :style="{ width: `${this.drawerOpened ? 30 : 2}%`}"
      :class="{'loginMenuShadow': drawerOpened}"
  >
    <div>
      <MainButton button-text="Log In"></MainButton>
      <MainButton button-text="Register"></MainButton>
    </div>


    <form class="">

    </form>


  </div>

  <div v-if="drawerOpened"
       class="closeDiv"
       @click="closeDrawer"
  >

  </div>
</template>

<script>
import UploadButton from "../Feed/UploadButton.vue";
import JoinUpp from "../Feed/JoinButton.vue";
import Navbar from "../Feed/BotNavbar.vue";
import OppenheimerPost from "../Feed/OppenheimerPost.vue";
import TopNavbar from "../Feed/TopNavbar.vue";
import BotNavbar from "../Feed/BotNavbar.vue";
import MainButton from "../Feed/MainButton.vue";

export default {
  data() {
    return {
      drawerOpened: false,
    };
},components: {
    MainButton
  }
  ,
  methods: {
    closeDrawer(){
      this.drawerOpened = !this.drawerOpened
    }
  }

}
</script>

<style scoped>

.backgroundYellow{
  position: absolute;
  background: #FFEEB4;
  height: 100%;
  transition: 1s;
  z-index: 11;
}

.registerForm{

}

.drawerBox{
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.loginMenuShadow{
  box-shadow: .5px 1px 0 0 black,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black,
  4.5px 5px 0 0 black,
  5.5px 6px 0 0 black;
}

.closeDiv{
  background: black;
  opacity: 20%;
  width: 100vw;
  height: 100vh;
}

</style>