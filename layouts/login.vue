<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container fluid>
        <Nuxt v-if="!startWaitingPage"/>
        <v-col class="justify-center text-center" v-else>
          <LoginLightningWelcome />
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  computed: {
    startWaitingPage: function () {
      return this.$store.getters['main/displayWelcome']
    },
  },
  mounted: function () {
    setTimeout(
      function () {
        this.$store.dispatch('main/welcomeDisplayed')
      }.bind(this),
      4000
    )
  },
}
</script>

<style>
body,
.v-application {
  background-color: #00353f !important;
}
</style>
