<template>
  <v-dialog v-model="openDialog" persistent max-width="500">
    <v-card>
      <v-card-title class="text-h5" style="word-break: break-word"> Réinitialisation de mot de passe </v-card-title>
      <v-card-text
        >Veuillez saisir l’adresse e-mail de votre compte pour que nous puissions envoyer un lien de réinitialisation de
        mot de passe.</v-card-text
      >

      <v-text-field
        v-model="email"
        solo
        label="Email de récupération"
        class="ml-4 mr-4"
        prepend-inner-icon="fa-at fa-md"
        :rules="[$rules.required, $rules.email]"
      />

      <v-card-text class="font-italic primary--text mt-n2 pb-1"
        >Si vous ne recevez pas l’e-mail, pensez a regarder dans vos spams. Si le problème persiste contacter l’administrateur de votre Eglise.</v-card-text
      >

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="openDialog = false"> Annuler </v-btn>
        <v-btn color="primary" text @click="openDialog = false"> Envoyer </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    }
  },
  watch: {
    wantOpenDialog(newValue) {
      if (newValue) {
        this.openDialog = true
      }
    },
  },
}
</script>
