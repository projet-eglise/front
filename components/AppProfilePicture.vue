<template>
  <v-avatar :size="imageSize" :style="backgroundColor">
    <span v-show="!hasImage">{{ content }}</span>
    <v-img v-show="hasImage" :src="content" class="rounded-circle" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    hasImage: {
      type: Boolean,
      default: false,
      required: false,
    },
    content: {
      type: String,
      default: 'UI',
      required: false,
    },
    size: {
      type: String,
      default: 'm',
      required: false,
    },
  },
  computed: {
    imageSize() {
      switch (this.size) {
        case 'xs':
          return 30
        case 's':
          return 40
        case 'l':
          return 62
        case 'xl':
          return 84
        default:
          return 48
      }
    },
    backgroundColor() {
      let background = ''
      let color = ''

      switch (this.content.charCodeAt(0) % 5) {
        case 0:
          background = '#430C05'
          color = 'white'
          break
        case 1:
          background = '#D46F4D'
          color = 'white'
          break
        case 2:
          background = '#FFBF66'
          color = 'black'
          break
        case 3:
          background = '#08C5D1'
          color = 'white'
          break
        case 4:
          background = '#00353F'
          color = 'white'
          break
      }

      return `background-color: ${background}; color: ${color};`
    },
  },
}
</script>
