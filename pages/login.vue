<template>
  <v-col class="mb-4em ml-auto mr-auto" height="100%">
    <AppLogo class="mb-8" centred />

    <v-fade-transition>
      <v-form ref="form" @submit="connect">
        <AppTextFieldEmail v-model="email" />
        <AppTextFieldPassword v-model="password" />

        <AppButtonBlock type="submit" :loading="isLoading">{{ $t('authentication.login') }}</AppButtonBlock>

        <v-row class="mt-4 justify-center font-italic">
          <NuxtLink id="account-link" class="hover:font-bold" to="/signin">{{
            $t('authentication.create_an_account')
          }}</NuxtLink>
          <span
            class="primary--text font-italic text-decoration-none pointer hover:font-bold"
            @click="openResetPassword"
          >
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
      if (!this.$refs.form.validate()) return null

      this.isLoading = true
      await this.$authentication.login(this.email, this.password)
      this.isLoading = false
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

#account-link {
  margin-right: 1.5em;
  position: relative;
}

#account-link:after {
  background: #08c5d1;
  border-radius: 50%;
  content: '';
  cursor: auto;
  display: inline-block;
  height: 0.25rem;
  pointer-events: none;
  position: absolute;
  right: -0.9em;
  top: 0.7em;
  width: 0.25rem;
}
</style>
