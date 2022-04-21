<template>
  <v-text-field
    :prepend-inner-icon="prepend_inner_icon"
    :label="label"
    solo
    dense
    style="width: 45%; margin-left: 10px"
    v-model="date"
    @blur="blur"
    @focus="focus"
    @keyup="keyup"
    @keypress="preventDefault"
    @keydown="preventDefault"
    :rules="[rules.required, rules.date]"
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'Date',
      required: false,
    },
    'prepend_inner_icon': {
      type: String,
      default: 'fa-calendar fa-md',
      required: false,
    },
  },
  data: function () {
    return {
      date: '',
      raw_date: '',
      rules: {
        required: (value) => !!value || 'Requis',
        date: (value) => {
          const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/([12][0-9]{3})$/
          return pattern.test(value) || 'Date incorecte ou incomplete'
        },
      },
    }
  },
  methods: {
    blur: function () {
      if (this.date === 'jj/mm/aaaa') this.date = ''
      this.notify()
    },
    focus: function () {
      if (this.date === '') this.date = 'jj/mm/aaaa'
      this.notify()
    },
    keyup: function (e) {
      e.preventDefault()

      if (e['key'] === 'Backspace' && this.raw_date.length > 0) {
        let letter = ''
        let index = 0

        switch (this.raw_date.length) {
          case 1:
          case 2:
            letter = 'j'
            index = this.raw_date.length - 1
            break
          case 3:
          case 4:
            letter = 'm'
            index = this.raw_date.length
            break
          case 5:
          case 6:
          case 7:
          case 8:
            letter = 'a'
            index = this.raw_date.length + 1
            break
        }

        this.raw_date = this.raw_date.substring(0, this.raw_date.length - 1)
        this.date = this.date.substring(0, index) + letter + this.date.substring(index + 1)
      } else {
        if (!isNaN(parseInt(e['key'])) && this.raw_date.length < 8) {
          this.raw_date += e['key']
          switch (this.raw_date.length) {
            case 1:
            case 2:
              this.date = this.date.replace('j', parseInt(e['key']))
              break
            case 3:
            case 4:
              this.date = this.date.replace('m', parseInt(e['key']))
              break
            case 5:
            case 6:
            case 7:
            case 8:
              this.date = this.date.replace('a', parseInt(e['key']))
              break
          }
        }
      }
      this.notify()
    },
    preventDefault: function (e) {
      e.preventDefault()
    },
    notify() {
      this.$emit('input', this.date)
    },
  },
}
</script>
