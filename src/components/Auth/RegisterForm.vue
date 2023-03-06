<template>
  <div v-if="isDrawerOpen">
    <form class="registerForm">
      <i
          class="material-icons closeDrawerX"
          @click="closeTheDrawer"
      >
        close
      </i>

      <h2 class="registerHeader"> Sign <i>Upp!</i> </h2>

      <div class="formField">
        <label class="formLabel">
          Nickname
        </label>
        <input class="formInput"
               type="text"
               v-model="username"
               v-on:blur="validateNick"
               :class="{'formInputError': notValidUsername || nicknameInUse}"
        >
        <i class="material-icons visibilityIcon">{{ nickIcon }}</i>
      </div>


      <div class="formField">
        <label class="formLabel">
          Email
        </label>
        <input class="formInput"
               type="email"
               v-model="email"
               v-on:blur="validateEmail"
               :class="{'formInputError': notValidEmail || emailInUse}"
        >
      </div>


      <div class="formField">
        <label class="formLabel">
          Password
        </label>
        <input class="formInput"
               :type="visibility ? 'password' : 'text'"
               v-model="password"
               v-on:blur="validatePassword"
               :class="{'formInputError': notValidPassword}"
        >
        <i @click="toggleVisibility" class="material-icons visibilityIcon">
          {{ visibility ? "visibility" : "visibility_off" }}
        </i>
      </div>

      <div class="formField">
        <label class="formLabel">
          Confirm password
        </label>
        <input class="formInput"
               :type="visibility ? 'password' : 'text'"
               v-model="confirmPassword"
               v-on:blur="areEqualPasswords"
               :class="{'formInputError': notEqualPasswords}"
        >
        <i @click="toggleVisibility" class="material-icons visibilityIcon">
          {{ visibility ? "visibility" : "visibility_off" }}
        </i>

      </div>

      <div class="errorBox">
        <p v-if="notValidUsername" class="error errorPasswd">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>  El nickname no puede contener espacios y
          debe ser mayor a 2 caracteres
        </p>
        <p v-if="nicknameInUse" class="error errorPasswd">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
          El nickname ya está en uso
        </p>
        <p v-if="emailInUse" class="error errorPasswd">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
          Ese email ya está en uso
        </p>
        <p v-if="notValidEmail" class="error errorPasswd">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i> El email debe estar en formato ***@example con una extensión valida
        </p>
        <p v-if="notValidPassword" class="error errorPasswd">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i> La debe contener al menos 8 caracteres, una mayúscula, un
          símbolo y un número
        </p>
        <p v-if="notEqualPasswords" class="error">
          <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i> Las contraseñas no coinciden
        </p>
      </div>

      <button v-if="!notEqualPasswords
                    && !notValidUsername
                    && !notValidEmail
                    && !notValidPassword
                    && !nicknameInUse
                    && !emailInUse"
              class="sendButton"
              @click="registerUser"
              type="button"
      >
        Send
      </button>

      <span class="createAccountText">
          Already have an account? <b><u><a @click="changeToLogin">Sign In</a></u></b>
        </span>
      <span v-if="registered" class="success">
          Success!! Welcome to Upp
        </span>
    </form>
  </div>
</template>

<script>

import axios from "axios";
import bcrypt from 'bcryptjs';

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
      visibility: true,
      username:"",
      email: "",
      password:"",
      nickIcon:"verified",
      confirmPassword:"",
      notValidUsername: false,
      nicknameInUse: false,
      notValidEmail: false,
      emailInUse: false,
      notValidPassword: false,
      notEqualPasswords: false,
      noErrors: true,
      registered: false
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
    },
    hashPassword(password){
      const saltRounds = 5;
      return bcrypt.hashSync(password, saltRounds);
    },
    validateEmail(){
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      axios.get(`http://localhost:3003/api/v1/users/email/${this.email}`)
          .then(response => {
            if(response.data){
              this.emailInUse = true
            } else {
              this.emailInUse = false
            }
          })

      emailRegex.test(this.email) ?
          this.notValidEmail = false :
          this.notValidEmail = true
    },
    validatePassword(){
      console.log("llamo")
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

      console.log(passwordRegex.test(this.password))


      passwordRegex.test(this.password) ?
          this.notValidPassword = false :
          this.notValidPassword = true

      console.log(this.notValidPassword)
    },
    areEqualPasswords(){
       this.password === this.confirmPassword ?
          this.notEqualPasswords = false :
          this.notEqualPasswords = true
    },
    validateNick(){
      const nickRegex = /^[^\s]{2,15}$/;

      axios.get(`http://localhost:3003/api/v1/users/user/${this.username}`)
          .then(response => {
            if(response.data){
              this.nickIcon = "error"
              this.nicknameInUse = true
              return 0;
            } else {
              this.nickIcon = "verified"
              this.nicknameInUse = false
            }
          })

      nickRegex.test(this.username) ?
          this.notValidUsername = false :
          this.notValidUsername = true
    },
    registerUser(){
      axios.post('http://localhost:3003/api/v1/users', {
        username: this.username,
        email: this.email,
        passwd: this.hashPassword(this.password)
      })
          .then(response => {
            localStorage.setItem("id", response.data.newUser.id)
            localStorage.setItem("username", response.data.newUser.username)
            this.registered = true
            this.$emit("isLoged")
          })
          .catch(error => console.error(error));

      setTimeout(() => {
        this.registered = false
        this.closeTheDrawer()
      }, 1500);
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

.errorBox{
  margin-top: .8em;
  width: 90%;
  display: flex;
  justify-content: left;
  align-items: flex-start;
  flex-direction: column;
  background: #DFC25A;
  text-align: left;
  padding: 0.5em;
  transition: .7s;
}

.formInput{
  background: white;
  height: 2em;
  text-align: left;
  padding-left: 1em;
  box-shadow: .5px 1px 0 0 black,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black,
  4.5px 5px 0 0 black,
  5.5px 6px 0 0 black;
  transform: translate(-3.5px, -4px);
  transition: 1s;
}

.formInputError{
  border: 2px solid red;

  box-shadow: .5px 1px 0 0 red,
  1.5px 2px 0 0 red,
  2.5px 3px 0 0 red,
  3.5px 4px 0 0 red,
  4.5px 5px 0 0 red,
  5.5px 6px 0 0 red;
}

.formInput:focus{
  transform: translate(3.5px, 4px);
  box-shadow: none
}

.error{
  display: flex;
  justify-content: left;
  align-items: flex-start;
  color: red;
  text-align: left;
  margin-top: 0.3em;
}

.errorPasswd{
  text-align: center;
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

.success{
  background: greenyellow;
  color: black;
  font-family: Cabin;
  padding: 0.5em;
  margin: 0.5em;
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
  top: 36px;
  right: -34px;
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