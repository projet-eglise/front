<template>
  <AppTextField
    v-bind="{ ...$attrs, ...commonAttrs }"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="icon"
    v-on="$listeners"
    @click:append="showPassword = !showPassword"
    @copy.prevent
    @paste.prevent
  />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: this.$t('components.labels.password'),
      required: false,
    },
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    unviewable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      inheritAttrs: false,
      showPassword: false,
    }
  },
  computed: {
    commonAttrs() {
      return {
        label: this.label,
        solo: true,
        leftIcon: 'lock',
        rules: [this.$rules.required, ...this.rules],
      }
    },
    icon() {
      if (this.unviewable) return null
      return this.showPassword ? 'fa-eye fa-md' : 'fa-eye-slash fa-md'
    },
  },
}
</script>
