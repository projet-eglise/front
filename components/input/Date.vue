<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        :prepend-inner-icon="prepend_inner_icon"
        :label="label"
        :class="classes"
        :value="formatedDate"
        dense
        solo
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      locale="fr-fr"
      :active-picker.sync="activePicker"
      :max="new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)"
    >
      <v-spacer />
      <v-btn text color="primary" class="text-uppercase" @click="modal = false"> Annuler </v-btn>
      <v-btn text color="primary" class="text-uppercase" @click="save"> Valider </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
import moment from 'moment'

export default {
  data: () => ({
    date: '',
    modal: false,
    activePicker: null,
  }),
  watch: {
    modal(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  props: {
    label: {
      type: String,
      default: 'Date',
      required: false,
    },
    prepend_inner_icon: {
      type: String,
      default: 'fa-calendar fa-md',
      required: false,
    },
    classes: {
      type: String,
      default: '',
      required: false,
    },
  },
  computed: {
    formatedDate() {
      moment.locale('fr')
      return this.date ? moment(this.date).format('DD MMMM YYYY') : ''
    },
  },
  methods: {
    save() {
      this.$refs.dialog.save(this.date)
      this.$emit('input', this.date)
    },
  },
}
</script>
