<template>
  <v-col class="mb-4em ml-auto mr-auto" height="100%">
    <AppLogo centred />

    <v-fade-transition>
      <v-form ref="form" @submit="connect">
        <AppTextFieldEmail v-model="email" />
        <AppTextFieldPassword v-model="password" />

        <AppButtonBlock type="submit" :loading="isLoading">{{ $t('authentication.login') }}</AppButtonBlock>

        <v-row class="mt-4 justify-center font-italic">
          <NuxtLink to="/registration">{{ $t('authentication.create_an_account') }}</NuxtLink>
          <span class="ml-2 mr-2 primary--text">/</span>
          <span class="primary--text font-italic text-decoration-none pointer" @click="openResetPassword">
            {{ $t('authentication.lost_password') }}
          </span>
        </v-row>
      </v-form>
    </v-fade-transition>
    <DialogResetPassword :want-open-dialog="wantOpenDialog" />
  </v-col>
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'centred-with-welcome',
  meta: { protected: false },
  data() {
    return {
      email: '',
      password: '',
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
        await this.$authentication.login(this.email, this.password)
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
.v-image {
  margin-bottom: 2em;
}

.center-v-alert {
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
