<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="mini" permanent floating app>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="profilePictureLink"></v-img>
        </v-list-item-avatar>
        <v-list-item-title>{{ username }}</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item to="/admin/dashboard" nuxt>
          <v-list-item-icon>
            <v-icon>fas fa-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Tableau de bord</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin/login" nuxt>
          <v-list-item-icon>
            <v-icon>fas fa-power-off</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Déconnexion</v-list-item-title>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list dense>
          <v-list-item @click.stop="mini = !mini">
            <v-list-item-icon>
              <v-icon v-show="!mini">fas fa-angle-double-left</v-icon>
              <v-icon v-show="mini">fas fa-angle-double-right</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Cacher le menu</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      mini: false,
    }
  },
  computed: {
    username() {
      return `${this.$store.getters['authentication/whoami'].user.firstname} ${this.$store.getters['authentication/whoami'].user.lastname}`
    },
    hasProfilePicture() {
      return this.$store.getters['authentication/whoami'].user.profile_image_link !== null
    },
    profilePictureLink() {
      return this.$store.getters['authentication/whoami'].user.profile_image_link
    },
  },
}
</script>

<style>
body,
.v-application {
  background-color: #00353f !important;
  overflow-y: hidden;
}
</style>
