<template>
  <div
      class="drawer"
      :style="{ width: `${this.drawerOpened ? 25 : 2}%`}"
      :class="{'loginMenuShadow': drawerOpened}"
  >
    <div class="drawerArea">
      <div v-if="registerOpened">
        <RegisterForm
            :is-drawer-open="drawerOpened"
            @changeToLogin="toggleRegister"
        >
        </RegisterForm>
      </div>
      <div v-else>
        <LoginForm
            @closeTheDrawer="closeDrawer"
            @changeToRegister="toggleRegister"
            :is-drawer-open="drawerOpened"
        >
        </LoginForm>
      </div>
    </div>
  </div>

  <div v-if="drawerOpened"
       class="closeDiv"
       @click="closeDrawer"
  >
  </div>

</template>

<script>
import MainButton from "../Feed/MainButton.vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

export default {
  data() {
    return {
      drawerOpened: false,
      registerOpened: false
    };
},components: {
    MainButton,
    LoginForm,
    RegisterForm
  }
  ,
  methods: {
    closeDrawer(){
      this.drawerOpened = !this.drawerOpened;
    },
    toggleRegister(){
      this.registerOpened = !this.registerOpened;
    }
  }

}
</script>

<style scoped>

.drawer{
  position: absolute;
  background: #FFEEB4;
  height: 100%;
  transition: .7s;
  z-index: 11;
}

.drawerMinWidth{
  min-width: 23rem;
}

.registerForm{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.mainButton{
  display: inline-block;
  border-radius: 0.3em;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  transition: 0.5s,transform .5s;
}

.mainButton:hover{
  box-shadow: .5px 1px 0 0 black,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black,
  4.5px 5px 0 0 black,
  5.5px 6px 0 0 black;
  transform: translate(-5.5px, -6px);
}

.closeDrawerX{
  position: absolute;
  top: 0;
  right: 0;
  margin: .8rem;
  cursor: pointer;
  font-size: 2em;
  transition: 1s;
}

.visibilityIcon{
  position: absolute;
  top: 35px;
  right: 8px;
  cursor: pointer;
}

.createAccountText{
  margin-top: 1em;
}

.closeDrawerX:hover{
  box-shadow: .5px 1px 0 0 white,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black;
  transform: translate(-3.5px, -4px);

}

.drawerArea{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
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