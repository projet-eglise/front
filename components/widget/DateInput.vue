<template>
  <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
    <template #activator="{ on, attrs }">
      <v-text-field
        :prepend-inner-icon="prependInnerIcon"
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
  props: {
    label: {
      type: String,
      default: 'Date',
      required: false,
    },
    prependInnerIcon: {
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
  data() {
    return {
      date: '',
      modal: false,
      activePicker: null,
    }
  },
  computed: {
    formatedDate() {
      moment.locale('fr')
      return this.date ? moment(this.date).format('DD MMMM YYYY') : ''
    },
  },
  watch: {
    modal(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
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
