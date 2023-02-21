<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    }
  },
  methods: {
    clicked(){
      this.$emit("join-clicked");
    }
  }
}
</script>

<template>
    <button
        class="mainButton"
        @click="clicked"
    >
      {{ buttonText }}
    </button>
</template>

<style scoped>

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

.joinAppButton{
  position: fixed;
  left: 3rem;
  bottom: 4.5rem;
  z-index: 10;
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

.joinButtonFlex{
  display: flex;
  justify-content: left;
  align-items: center;
  padding-right: 5em;
  width: 100%;
  height: 100%;
}

</style>