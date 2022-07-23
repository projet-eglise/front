<template>
  <v-col height="100%">
    <p>Page d'administration</p>
    <AppButtonBlock @click="goChoosePage">Retour au choix d'Eglise</AppButtonBlock>
  </v-col>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
  methods: {
    goChoosePage() {
      this.$router.push('/connexion/choisir-mon-eglise')
    },
  },
}
</script>
