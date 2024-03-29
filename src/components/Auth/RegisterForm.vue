<script lang="ts">
import {defineComponent} from 'vue'
import {apiService} from "../../services/apiService.ts";

export default defineComponent({
name: "RegisterForm.vue",
    data() {
        return {
            nick: "",
            email: "",
            password: "",
            confirmPassword: "",
            visibility: true,
            notValidNick: false,
            notValidEmail: false,
            notValidPassword: false,
            notEqualPasswords: false,
            nicknameInUse: false,
            emailInUse: false,
            serverError: false,
            nickIcon: "verified",
            noErrors: true,
            registered: false,
            API: new apiService()
        }
    },
    emits: ["authSuccess"],

    methods: {
        toggleVisibility(){
            this.visibility = !this.visibility;
        },
        validateEmail(){
            const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

            this.API.checkEmail(this.email)
                .then(response => {
                    if(response.data[0]){
                        this.emailInUse = true
                        return 0;
                    } else {
                        this.emailInUse = false
                    }
                })

            emailRegex.test(this.email) ?
                this.notValidEmail = false :
                this.notValidEmail = true
        },
        validatePassword(){
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=~`[\]{}|:;"'<>?,./])(?=.*[A-Z]).{8,}$/;

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

            this.API.checkNickname(this.nick)
                .then(response => {
                    if(response.data[0]){
                        this.nickIcon = "error"
                        this.nicknameInUse = true
                        return 0;
                    } else {
                        this.nickIcon = "verified"
                        this.nicknameInUse = false
                    }
                })

            nickRegex.test(this.nick) ?
                this.notValidNick = false :
                this.notValidNick = true
        },
        registerUser(){
            this.API.register(this.nick, this.email, this.password)
                .then(response => {
                    if(response.status === 200){
                        localStorage.setItem("id", response.data.user.id)
                        localStorage.setItem("nickname", response.data.user.nickname)
                        localStorage.setItem("token", response.data.token)
                        this.registered = true
                        this.noErrors = true

                        setTimeout(() => {
                            this.registered = false
                            this.$emit("authSuccess")
                        }, 2000);
                    }else{
                        this.serverError = true
                    }
                })
                .catch(error => {
                    console.error(error)
                    this.serverError = true // Marcar la variable de error en true
                });
            
        }
    }
})
</script>

<template>
    <h1 class="authBox__title">¡Únete a Upp!</h1>
    <form class="register ">
        <label class="register__label">Nick</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--white"
                   v-model="nick"
                   v-on:blur="validateNick"
                   :class="{'register__inputWrapper__input--error': notValidNick || nicknameInUse}"
            >
            <i class="material-icons register__inputWrapper__icon">{{ nickIcon }}</i>
        </div>

        <label class="register__label">Email</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--white"
                   type="email"
                   v-model="email"
                   v-on:blur="validateEmail"
                   :class="{'register__inputWrapper__input--error': notValidEmail || emailInUse}"
            >
        </div>

        <label class="register__label">Contraseña</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--white"
                   :type="visibility ? 'password' : 'text'"
                   v-model="password"
                   v-on:blur="validatePassword"
                   :class="{'register__inputWrapper__input--error': notValidPassword}"
            >
            <i class="material-icons register__inputWrapper__icon"
               @click="toggleVisibility"
            >
                {{ visibility ? "visibility" : "visibility_off" }}
            </i>
        </div>

        <label class="register__label">Confirmar contraseña</label>
        <div class="register__inputWrapper">
            <input class="register__inputWrapper__input uppBox--white"
                   :type="visibility ? 'password' : 'text'"
                   v-model="confirmPassword"
                   v-on:blur="areEqualPasswords"
                   :class="{'register__inputWrapper__input--error': notEqualPasswords}"
            >
            <i class="material-icons register__inputWrapper__icon"
               @click="toggleVisibility"
            >
                {{ visibility ? "visibility" : "visibility_off" }}
            </i>
        </div>

        <button v-if="!notEqualPasswords
                    && !notValidNick
                    && !notValidEmail
                    && !notValidPassword
                    && !nicknameInUse
                    && !emailInUse"
                class="register__button"
                :class="{ 'register__button--onTap': registered }"
                @click="registerUser"
                type="button"
        >
            Validar
        </button>

        <div class="register__errorbox">
            <p v-if="notValidNick" class="error errorPasswd">
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

            <p v-if="serverError" class="error">
                <i class="material-icons Fill: 1 Weight: 500 Grade: 0 Optical Size: 48">priority_high</i>
                Error en el servidor
            </p>
        </div>
        <span v-if="registered" class="register__success">
                ¡Registrado con éxito! ¡Bienvenido a Upp!
        </span>


    </form>
</template>

<style scoped>

</style>