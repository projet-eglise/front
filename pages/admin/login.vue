<template>
  <v-col class="mb-4em ml-auto mr-auto" height="100%">
    <AppLogo class="mb-8" centred />

    <v-form id="login-form" ref="form" @submit="connect">
      <AppTextFieldEmail id="email" v-model="email" />
      <AppTextFieldPassword id="password" v-model="password" />

      <AppButtonBlock id="submit" type="submit" :loading="isLoading">{{ $t('authentication.login') }}</AppButtonBlock>
    </v-form>
  </v-col>
</template>

<script>
export default {
  layout: 'centred-with-welcome',
  meta: { protected: false },
  data() {
    return {
      email: process.env.DEFAULT_LOGIN ?? '',
      password: process.env.DEFAULT_PASSWORD ?? '',
      showPassword: false,
      isLoading: false,
      wantOpenDialog: false,
    }
  },
  mounted() {
    this.$store.dispatch('authentication/logout')
  },
  methods: {
    async connect(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.$refs.form.validate()) {
        this.isLoading = true
        await this.$authentication.login(this.email, this.password, true)
        this.isLoading = false
      }
    },
    openResetPassword(event) {
      event.preventDefault()
      event.stopPropagation()

      this.wantOpenDialog = true
      setTimeout(
        function () {
          this.wantOpenDialog = false
        }.bind(this),
        10
      )
    },
  },
}
</script>

<style scoped>
.center-v-alert {
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
