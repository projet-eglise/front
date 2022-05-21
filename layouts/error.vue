<template>
  <Error404Component />
</template>

<script>
export default {
  mounted() {
    setTimeout(function() {
      let route = '/connexion/choisir-mon-eglise';
      if(this.$nuxt.context.from !== undefined) route = this.$nuxt.context.from.path
      this.$router.push(route)
    }.bind(this), 3000);
  }
}
</script>