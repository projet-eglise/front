<template>
  <v-btn v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners">
    <slot></slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
      required: false,
    },
    primary: {
      type: Boolean,
      default: false,
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
        class: this.$attrs.outlined !== undefined ? [] : ['background--text'],
        color: 'primary',
        large: true,
        type: this.type,
      }
    },
  },
}
</script>
