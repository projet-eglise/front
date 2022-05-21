<template>
  <AppButton v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners">
    <slot></slot>
  </AppButton>
</template>

<script>
export default {
  props: {
    primary: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    commonAttrs() {
      return {
        text: true,
        primary: this.primary,
      }
    },
  },
}
</script>
