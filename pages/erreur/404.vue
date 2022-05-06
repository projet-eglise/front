<template>
  <Error404Component />
</template>

<script>
export default {
  layout: 'default',
  meta: { protected: false },
  mounted() {
    setTimeout(function () {
      let route = '/tableau-de-bord';
      if(this.$nuxt.context.from !== undefined) route = this.$nuxt.context.from.path
      this.$router.push(route)
    }.bind(this), 5000)
  },
}
</script>
