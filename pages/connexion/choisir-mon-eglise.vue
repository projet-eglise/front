<template>
  <v-col class="choises ml-auto mr-auto flex-column" height="100%" align="center">
    <NuxtLink v-if="is_admin" to="/admin">
      <v-btn color="primary" block>Administrateur</v-btn>
    </NuxtLink>
    <v-btn v-for="church in churches" :key="church.uid" color="primary" block @click="chooseChurch(church.uid)">
      {{ church.name }}
    </v-btn>
    <NuxtLink to="/eglise/creer-ou-rejoindre" style="text-decoration: none">
      <v-btn color="primary" block outlined> <i class="fas fa-add mr-2" /> Rejoindre une Eglise</v-btn>
    </NuxtLink>
  </v-col>
</template>

<script>
export default {
  name: 'ChooseMyChurchPage',
  layout: 'configuration',
  meta: { protected: true },
  data() {
    return {
      is_admin: false,
      churches: {},
    }
  },
  mounted() {
    if (this.$nuxt.context.from === 'connexion') {
      this.churches = this.$store.getters['authentication/whoami'].churches
      this.is_admin = this.$store.getters['authentication/whoami'].user.is_admin
    } else {
      this.$repositories.authentication.whoami().then(function (response) {
        this.churches = response.data.data.churches
        this.is_admin = response.data.data.user.is_admin
      }.bind(this))
    }
  },
  methods: {
    chooseChurch(churchUid) {
      this.$store.dispatch('church/setChurchWithUid', churchUid)
      this.$router.push('/tableau-de-bord')
    },
  },
}
</script>

<style scoped>
.choises {
  margin-bottom: 2em;
}

.v-btn {
  margin: 2em 0px;
}
</style>
