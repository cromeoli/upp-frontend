<template>
  <div class="profileBox">
    <div class="usernameBox">
      <p class="username">{{ username }}</p>
    </div>
    <i class="material-icons profileIcon">
      account_circle
    </i>
    <i @click="logout" class="material-icons logoutIcon">
      logout
    </i>
  </div>

</template>

<script>
export default {
  name: "profileButton",
  data(){
    return {
      username:""
    }
  },
  methods:{
    setUsername(){
      if(localStorage.getItem("username")){
        this.username = localStorage.getItem("username");
      } else {
        this.username = "Error"
      }
    },
    logout(){
      this.$emit("logout")
    }
  },
  created() {
    this.setUsername()
  }
}
</script>

<style scoped>
.profileBox{
  display: flex;
  align-items: center;
  gap: 1em;
  position: absolute;
  top: 20px;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  padding: 0.5em;
  border-radius: 50px;
  transition: .5s;
  cursor: pointer;
}

.username{
  font-family: "IBM Plex Mono";
  font-size: 1.4em;
}

.profileIcon{
  font-size: 4em;
}

.logoutIcon{
  transition: 0.5s;
}

.logoutIcon:hover{
  transform: scale(1.5);
}

</style>