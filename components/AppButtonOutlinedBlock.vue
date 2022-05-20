<template>
  <AppButton v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners">
    <slot></slot>
  </AppButton>
</template>

<script>
export default {
  computed: {
    commonAttrs() {
      return {
        block: true,
        outlined: true,
      }
    },
  },
}
</script>