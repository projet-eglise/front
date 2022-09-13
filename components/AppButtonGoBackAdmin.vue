<template>
  <div v-if="adminIsConnected" class="fixed top-4 left-8 right-8 sm:left-0 sm:right-0 flex justify-center">
    <AppButton id="go-to-admin-button" @click="becomeAUser">Retourner sur l'administration</AppButton>
  </div>
</template>

<script>
export default {
  computed: {
    adminIsConnected() {
      return this.$store.getters['authentication/admin/isConnected']
    },
  },
  methods: {
    becomeAUser() {
      this.$authentication.logout(false, false)
      this.$router.push('/admin/christians')
    },
  },
}
</script>
