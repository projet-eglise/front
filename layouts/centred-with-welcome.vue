<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container fluid>
        <Nuxt v-if="!startWaitingPage" class="content" />
        <v-col v-else class="justify-center text-center">
          <LightningWelcome />
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
      process.env.ENV === 'PROD' ? 4000 : 200
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
