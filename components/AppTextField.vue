<template>
  <v-text-field v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    leftIcon: {
      type: String,
      default: '',
      required: false,
    },
    label: {
      type: String,
      default: 'Default label',
      required: false,
    },
    rules: {
      type: Array,
      default: () => [],
      required: false,
    },
  },
  data() {
    return {
      inheritAttrs: false,
    }
  },
  computed: {
    commonAttrs() {
      return {
        label: this.label,
        solo: true,
        'prepend-inner-icon': this.icon,
        rules: this.rules
      }
    },
    icon() {
      if (this.leftIcon !== '') return `fa-md fa-${this.leftIcon}`
      return null
    },
  },
}
</script>

