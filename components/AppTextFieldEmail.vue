<template>
  <AppTextField v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: this.$t('components.labels.email'),
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
        leftIcon: 'at',
        solo: true,
        rules: [this.$rules.required, this.$rules.email, ...this.rules],
      }
    },
  },
}
</script>
