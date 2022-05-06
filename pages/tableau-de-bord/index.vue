<template>
  <v-col>
    <p>Page de récapitulatif ^^</p>
    <v-btn @click="goChoosePage">Retour au choix d'Eglise</v-btn>
  </v-col>
</template>

<script>
export default {
  meta: { protected: true },
  methods: {
    goChoosePage(churchUid) {
      this.$store.dispatch('church/clearChurch', churchUid)
      this.$router.push('/connexion/choisir-mon-eglise')
    },
  },
}
</script>
