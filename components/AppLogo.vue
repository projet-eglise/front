<template>
  <img :src="require('@/assets/img/circled-logo.png')" v-bind="{ ...$attrs, ...commonAttrs }" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '250',
      required: false,
    },
    width: {
      type: String,
      default: '250',
      required: false,
    },
    centred: {
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
        width: this.width,
        height: this.height,
        class: {
          'ml-auto mr-auto': this.centred,
          'object-contain': true
        },
      }
    },
  },
}
</script>
