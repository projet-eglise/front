<template>
  <Error404Component />
</template>

<script>
export default {
  mounted() {
    setTimeout(function() {
      this.$router.push('/tableau-de-bord')
    }, 5000);
  }
}
</script>