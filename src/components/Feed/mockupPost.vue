<script>

export default {
  data() {
    return {
    };
  },
};
</script>

<template>

  <div id="post">
    <div class="MockupPost"
    >
      <div class="custom-loader">

      </div>

    </div>
  </div>
</template>

<style>
.nonVisible{
  opacity: 0;
}

.custom-loader {
  width:200px;
  height:60px;
  display: flex;
  transform: rotate(-90deg);
}
.custom-loader:before {
  content: "";
  background: #000000;
  width:30px;
  clip-path: polygon(0 20px,calc(100% - 30px) 20px,calc(100% - 30px) 0,100% 50%,calc(100% - 30px) 100%,calc(100% - 30px) calc(100% - 20px),0 calc(100% - 20px));
  animation: a1 3s infinite linear;
}

@keyframes a1 {
  90%,100%{flex-grow: 1}
}

@keyframes i7 {
  100% {background-position: 0 50%}
}

.visible{
  opacity: 100;
}

.uppText{
  position: absolute;
  transition: 1s;
  left: 80%;
}

.textContent{
  font-style: normal;
  font-weight: 600;
  font-size: 1rem;
}

.flexbox{
  display: flex;
  justify-content: right;
  align-items: center;
  width: 100%;
  height: 100%;
}

.loading{
  margin-top: 10px;
  height: 5px;
  background: black;
  transition: 0.1s;
}

.MockupPost {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 55vh;
  height: 40vw;
  max-height: 30rem;
  min-height: 30rem;
  max-width: 25rem;
  min-width: 25rem;

  background: #FFFFFF;
  border: 3px solid #000000;
  box-shadow: 25px 25px 4px rgba(0, 0, 0, 0.1);
  border-radius: 52px;
}

.slideUpAnimation{
  animation: slideUp;
  animation-duration: 1.4s;
  animation-timing-function: ease-in-out;
}

.dissolveAnimation{
  animation: dissolve;
  animation-duration: 0.8s;
  animation-timing-function: ease-in-out;
}

@keyframes slideUp {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-180px);
  }
  100%{
    transform: translateY(0);
  }
}

@keyframes dissolve {
  0% {
    opacity: 100;
  }
  50% {
    opacity: 0;
  }
  100%{
    opacity: 100;
  }

}
</style>
