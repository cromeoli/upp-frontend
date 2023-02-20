<template>
  <div class="frame">
    <div class="parent">
      <a href="#" class="pressable-button border-rightBottom flex">
        Foto
      </a>
      <a href="#" class="pressable-button border-leftBottom flex">
        Texto
      </a>
      <a href="#" class="pressable-button border-rightTop flex">
        Video
      </a>
      <a href="#" class="pressable-button border-leftTop flex">
        Audio
      </a>
    </div>
  </div>

</template>

<script>
export default {
  name: "uploadMenu"
}
</script>

<style scoped>

.parent {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  height: 20em;
  width: 20em;
  background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(255,255,255,0) 45%);
}

.pressable-button{
  display: inline-block;
  padding: .5rem 1rem;
  background-color: white;
  cursor: pointer;
  transition: 0.5s,transform .5s;
}

.pressable-button:hover{
  box-shadow: .5px 1px 0 0 var(--color),
  1.5px 2px 0 0 var(--color),
  2.5px 3px 0 0 var(--color),
  3.5px 4px 0 0 var(--color),
  4.5px 5px 0 0 var(--color),
  5.5px 6px 0 0 var(--color);
  transform: translate(-5.5px, -6px);
  border: 2px solid var(--color);
  border-radius: 0.3em;

}

.border-rightBottom{
  border-right: 1px solid gray;
  border-bottom: 1px solid gray;
  border-image: linear-gradient(135deg, white 50%, gray 60%) 1;
}
.border-leftBottom{
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  border-image: linear-gradient(-135deg, white 50%, gray 60%) 1;
}
.border-rightTop{
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  border-image: linear-gradient(45deg, white 50%, gray 60%) 1;
}
.border-leftTop{
  border-left: 1px solid gray;
  border-top: 1px solid gray;
  border-image: linear-gradient(-45deg, white 50%, gray 60%) 1;
}

.frame{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 2em;
  width: 62%;
  height: 50%;
  border: 2px solid var(--color);
  border-radius: .8em;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

}

.flex{
  display:flex;
  justify-content: center;
  align-items: center;
}

</style>