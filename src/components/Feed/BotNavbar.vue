<script>


import MainButton from "./MainButton.vue";

export default {
  name: "Navbar",
  components: {
    MainButton
  }
}
</script>

<template>
  <nav class="bottomNavbar">
      <router-link to="/comingSoon" class="routerText">Top</router-link>
      <router-link to="/comingSoon" class="routerText">The Wall</router-link>
  </nav>

</template>

<style scoped>
.bottomNavbar{
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: "Cabin";
  color: black;
  font-weight: 700;
  font-size: 1.5rem;
  gap: 2rem;
  align-items: center;
  padding-bottom: 1em;
}

.routerText{
  text-underline-offset: 0.4em;
  text-decoration: underline 0.15em;
  transition: .5s;
}

.routerText:hover{
  text-underline-offset: 0.7em;
}

</style>