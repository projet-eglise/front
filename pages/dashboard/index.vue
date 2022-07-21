<template>
  <v-col>
    <p>Page de récapitulatif ^^</p>
    <AppButtonBlock @click="goChoosePage">Retour au choix d'Eglise</AppButtonBlock>
  </v-col>
</template>

<script>
export default {
  meta: { protected: true },
  methods: {
    goChoosePage(churchUid) {
      this.$store.dispatch('church/clearChurch', churchUid)
      this.$router.push('/login/choisir-mon-eglise')
    },
  },
}
</script>
