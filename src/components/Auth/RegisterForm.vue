<template>
  <div v-if="isDrawerOpen">
    <form class="registerForm">
      <i
          class="material-icons closeDrawerX"
          @click="closeTheDrawer"
      >
        close
      </i>

      <h2 class="registerHeader"> Register </h2>

      <div class="formField">
        <label class="formLabel">
          Nickname
        </label>
        <input class="formInput" type="text">
      </div>

      <div class="formField">
        <label class="formLabel">
          Email
        </label>
        <input class="formInput" type="email">
      </div>

      <div class="formField">
        <label class="formLabel">
          Password
        </label>
        <input class="formInput" :type="visibility ? 'password' : 'text'">
        <i @click="toggleVisibility" class="material-icons visibilityIcon">
          {{ visibility ? "visibility" : "visibility_off" }}
        </i>
      </div>

      <div class="formField">
        <label class="formLabel">
          Confirm password
        </label>
        <input class="formInput" :type="visibility ? 'password' : 'text'">
        <i @click="toggleVisibility" class="material-icons visibilityIcon">
          {{ visibility ? "visibility" : "visibility_off" }}
        </i>
      </div>

      <button class="sendButton">
        Send
      </button>

      <span class="createAccountText">
          Already have an account? <b><u><a @click="changeToLogin">Log In</a></u></b>
        </span>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    isDrawerOpen:{
      type: Boolean,
      required: true
    }
  },
  data(){
    return {
      visibility: true
    }
  },
  methods: {
    closeTheDrawer(){
      this.$emit('closeTheDrawer');
    },
    changeToLogin(){
      this.$emit('changeToLogin');
    },
    toggleVisibility(){
      this.visibility = !this.visibility;
    }
  }
}
</script>

<style scoped>

.formField{
  position: relative;
  display: flex;
  flex-direction: column;
}

.formInput{
  background: white;
  height: 2em;
  text-align: left;
  padding-left: 1em;

}

.formLabel{
  align-self: flex-start;
  font-family: Cabin;
  font-size: 1.3em;
}

.sendButton{
  background: #f9f9f9;
  border: 2px solid black;
  cursor: pointer;
  margin-top: 1em;
  padding: 0.4em 0.8em;
  transition: .5s;
}

.sendButton:hover{
  background: black;
  color: white;
}

.registerHeader{
  font-size: 2em;
  margin-bottom: 0.5em;
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

</style>