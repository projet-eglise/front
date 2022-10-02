<template>
  <v-btn v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners">
    <v-icon>fas fa-{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
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
        color: this.color,
        icon: true,
      }
    },
  },
}
</script>
