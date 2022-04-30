<template>
  <v-col class="choises ml-auto mr-auto flex-column" height="100%" align="center">
    <NuxtLink v-if="$store.getters['authentication/whoami'].user.is_admin" to="/admin">
      <v-btn color="primary" block>Administrateur</v-btn>
    </NuxtLink>
    <v-btn v-for="church in $store.getters['authentication/whoami'].churches" :key="church.uid" color="primary" block @click="chooseChurch(church.uid)">
      {{ church.name }}
    </v-btn>
    <v-btn color="primary" block outlined> <i class="fas fa-add mr-2" /> Rejoindre une Eglise</v-btn>
  </v-col>
</template>

<script>
export default {
  name: 'ChooseMyChurchPage',
  layout: 'login',
  meta: { protected: true },
  methods: {
    chooseChurch(churchUid) {
      this.$store.dispatch('church/setChurchWithUid', churchUid)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.choises {
  width: 30%;
  margin-bottom: 2em;
}

.v-btn {
  margin: 2em 0px;
}
</style>
