<template>
  <v-col>
    <p>Inscription</p>
    <NuxtLink to="{ name: 'login' }">Retour à la page de connexion</NuxtLink>
  </v-col>
</template>

<script>
export default {
  name: 'SignInPage',
  layout: 'login',
}
</script>
