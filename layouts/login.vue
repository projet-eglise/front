<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container fluid>
        <Nuxt v-if="!startWaitingPage" class="content" />
        <v-col v-else class="justify-center text-center">
          <LoginLightningWelcome />
        </v-col>
      </v-container>
    </v-main>
    <WidgetAlertComponent />
  </v-app>
</template>

<script>
export default {
  name: 'LoginLayout',
  computed: {
    startWaitingPage() {
      return this.$store.getters['main/displayWelcome']
    },
  },
  mounted() {
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
  overflow-y: hidden;
}

.content {
  width: 30%;
}

@media (max-width: 480px) {
  .content {
    width: 90%;
  }
}

@media (min-width: 480px) and (max-width: 768px) {
  .content {
    width: 70%;
  }
}
</style>
