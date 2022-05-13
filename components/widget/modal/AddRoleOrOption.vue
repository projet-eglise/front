<template>
  <v-dialog v-model="openDialog" persistent max-width="400">
    <v-card>
      <v-card-title class="text-h5" style="word-break: break-word"> Ajouter un role </v-card-title>

      <v-form class="ml-4">
        <v-checkbox
          v-for="option in options"
          :key="option.uid"
          v-model="option.display"
          :label="option.name"
          class="mt-2 mb-2"
          hide-details
        ></v-checkbox>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close"> Annuler </v-btn>
        <v-btn color="primary" type="submit" text @click="close"> Ajouter </v-btn>
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
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      openDialog: false,
      options: this.value,
    }
  },
  watch: {
    wantOpenDialog(newValue) {
      if (newValue) {
        this.openDialog = true
        this.options = this.value
      }
    },
  },
  methods: {
    close() {
      this.openDialog = false
      this.$emit('input', this.options)
    },
  },
}
</script>
