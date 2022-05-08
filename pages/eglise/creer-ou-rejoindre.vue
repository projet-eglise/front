<template>
  <v-col class="choises ml-auto mr-auto flex-column" height="100%" align="center">
    <WidgetReturnButton to="/connexion/choisir-mon-eglise" />
    <NuxtLink to="/eglise/rejoindre/code">
      <v-btn color="primary" block>Rejoindre une Eglise</v-btn>
    </NuxtLink>
    <p class="primary--text text-uppercase">ou</p>
    <NuxtLink to="/eglise/creer">
      <v-btn color="primary" block>Créer une Eglise</v-btn>
    </NuxtLink>
  </v-col>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
  methods: {
    chooseChurch(churchUid) {
      this.$store.dispatch('church/setChurchWithUid', churchUid)
      this.$router.push('/dashboard')
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
