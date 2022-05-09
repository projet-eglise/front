<template>
  <v-app>
    <v-main :class="classes">
      <v-container fluid>
        <Nuxt class="content"/>
      </v-container>
    </v-main>
    <WidgetAlertComponent />
  </v-app>
</template>

<script>
export default {
  computed: {
    classes() {
      return this.$nuxt.$route.path === "/eglise/rejoindre" ? "justify-center" : "align-center justify-center"
    }
  }
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
