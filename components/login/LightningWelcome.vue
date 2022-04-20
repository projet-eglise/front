<template>
  <p><span ref="part1">Bi</span><span ref="part2">enve</span><span ref="part3">nue</span></p>
</template>
<script>
export default {
  mounted: function () {
    setTimeout(
      function () {
        this.$refs['part1'].classList.value = ['neon']
      }.bind(this),
      200
    )
    setTimeout(
      function () {
        this.$refs['part2'].classList.value = ['neon']
      }.bind(this),
      400
    )
    setTimeout(
      function () {
        this.$refs['part3'].classList.value = ['neon']
      }.bind(this),
      700
    )
  },
}
</script>

<style scoped>
p {
  font-size: 7em;
  margin: 0;

  font-family: Neon, Verdana, Tahoma;
  letter-spacing: 0.1em;

  color: #08c5d1;
}

@media (max-width: 480px) {
  p {
    font-size: 3em;
  }
}

@media (min-width: 480px) and (max-width: 768px) {
  p {
    font-size: 5em;
  }
}

.neon {
  color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #08c5d1, 0 0 77px #08c5d1, 0 0 100px #08c5d1;

  animation: bling 1.8s linear;
}

@keyframes bling {
  0% {
    color: #08c5d1;
    text-shadow: none;
  }
  5% {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #08c5d1, 0 0 77px #08c5d1, 0 0 100px #08c5d1;
  }
  30% {
    color: #08c5d1;
    text-shadow: none;
  }
  35% {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #08c5d1, 0 0 77px #08c5d1, 0 0 100px #08c5d1;
  }
  40% {
    color: #08c5d1;
    text-shadow: none;
  }
  45% {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #08c5d1, 0 0 77px #08c5d1, 0 0 100px #08c5d1;
  }
  50% {
    color: #08c5d1;
    text-shadow: none;
  }
  75% {
    color: #08c5d1;
    text-shadow: none;
  }
  80% {
    color: #fff;
    text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 42px #08c5d1, 0 0 77px #08c5d1, 0 0 100px #08c5d1;
  }
  85% {
    color: #08c5d1;
    text-shadow: none;
  }
  100% {
    color: #08c5d1;
    text-shadow: none;
  }
}
</style>
