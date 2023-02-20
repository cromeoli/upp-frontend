<template>
<button class="uploadButton">
  +
</button>
</template>

<script>
export default {
  name: "uploadButton"
}
</script>

<style scoped>
.uploadButton{
  height: 15rem;
  border-radius: 49px;
  background: white;
  border: 3px solid #000000;
  margin-right: 1.8em;
  transition: 0.5s,transform .5s;
}

.uploadButton:hover{
  box-shadow: .5px 1px 0 0 black,
  1.5px 2px 0 0 black,
  2.5px 3px 0 0 black,
  3.5px 4px 0 0 black,
  4.5px 5px 0 0 black,
  5.5px 6px 0 0 black;
  transform: translate(-5.5px, -6px);
}

</style>