<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
}
</script>

<style>
body,
.v-application {
  background-color: #00353f !important;
}
</style>
