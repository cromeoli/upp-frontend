<template>
  <div class="postData">
    <router-link to="/comingSoon" class="routerText circle">Global</router-link>
    <div class="titleAndUsername">
      <h1 class="title">Titulo de la publicación</h1>
      <h2 class="username">@Usuario</h2>
    </div>

  </div>

</template>

<script>
export default {
  name: "PostDataArea"
}
</script>

<style scoped>
.routerText{
  font-family: "Cabin";
  color: black;
  font-weight: 700;
  font-size: 1.5rem;
  text-underline-offset: 0.4em;
  text-decoration: underline 0.15em;
  transition: .5s;
}

.routerText:hover{
  text-underline-offset: 0.7em;
}

.postData{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  margin-left: 4rem;
}

.title{
  font-family: Cabin;
  font-weight: 700;
  font-size: 2em;
}

.username{
  align-self: center;
  margin-bottom: 4em;
  margin-right: 5em;
  font-family: "IBM Plex Mono";
  font-style: italic;
  font-weight: 600;
  opacity: 30%;
}

.circle{
  font-size: 1.8em;
  margin-bottom: 4em;
}


</style>