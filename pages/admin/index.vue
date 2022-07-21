<template>
  <v-col>
    <p>Page d'administration</p>
    <v-btn @click="goChoosePage">Retour au choix d'Eglise</v-btn>
  </v-col>
</template>

<script>
export default {
  meta: { protected: true },
  methods: {
    goChoosePage() {
      this.$router.push('/login/choisir-mon-eglise')
    },
  },
}
</script>
