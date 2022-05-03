<template>
  <v-app>
    <v-main class="align-center justify-center">
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <WidgetAlertComponent />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>

<style>
body,
.v-application {
  background-color: #00353f !important;
  overflow-y: hidden;
}
</style>
