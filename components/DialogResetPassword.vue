<template>
  <v-expand-transition>
    <v-dialog v-model="openDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5" style="word-break: break-word">
          {{ $t('components.dialogs.reset_password.reset_password') }}
        </v-card-title>

        <v-fade-transition v-if="requested" appear>
          <v-container>
            <p>{{ $t('components.dialogs.reset_password.email_sent_to', { email: email }) }}</p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <AppButtonText @click="close">{{ $t('global.close') }}</AppButtonText>
            </v-card-actions>
          </v-container>
        </v-fade-transition>
        <v-container v-else>
          <v-card-text>{{ $t('components.dialogs.reset_password.enter_email') }}</v-card-text>

          <v-form ref="form">
            <AppTextFieldEmail v-model="email" :label="$t('components.labels.recovery_email')" class="ml-4 mr-4" />
            <v-card-text class="font-italic primary--text mt-n2 pb-1">
              {{ $t('components.dialogs.reset_password.if_dont_receive') }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <AppButtonText @click="close">{{ $t('global.cancel') }}</AppButtonText>
              <AppButtonText primary type="submit" @click="sendRequest">{{ $t('global.send') }}</AppButtonText>
            </v-card-actions>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>
  </v-expand-transition>
</template>

<script>
export default {
  props: {
    wantOpenDialog: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      openDialog: false,
      email: '',
      requested: false,
    }
  },
  watch: {
    wantOpenDialog(newValue) {
      if (newValue) {
        this.requested = false
        this.openDialog = true
      }
    },
  },
  methods: {
    close() {
      this.openDialog = false
      setTimeout(
        function () {
          this.requested = false
          this.email = ''
        }.bind(this),
        100
      )
    },
    async sendRequest(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.$refs.form.validate()) {
        this.$store.dispatch('components/alert-component/hide')
        this.isLoading = true

        try {
          await this.$repositories.authentication.passwordRequest(this.email)
          this.isLoading = false
          this.requested = true
          setTimeout(this.close, 5000)
        } catch (error) {
          this.$store.dispatch('components/alert-component/displayError', error.response.data.error)
          this.isLoading = false
        }
      }
    },
  },
}
</script>
