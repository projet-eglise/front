<template>
  <NuxtLink :to="user && link ? '/admin/utilisateur/' + user.uid : ''" class="text-decoration-none" :style="style">
    <v-row class="d-flex justify-center align-center pl-4">
      <v-avatar :size="size" :style="backgroundColor">
        <span v-show="!hasImage">{{ initials }}</span>
        <v-img v-show="hasImage" :src="image" class="rounded-circle" />
      </v-avatar>
      <v-col v-if="displayUsername">
        <p class="ma-0 black--text">{{ username }}</p>
        <p v-show="secondLine" class="ma-0 black--text">{{ secondLine }}</p>
      </v-col>
    </v-row>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
      required: false,
    },
    secondLine: {
      type: String,
      default: '',
      required: false,
    },
    displayUsername: {
      type: Boolean,
      default: false,
      required: false,
    },
    imageSize: {
      type: String,
      default: 'm',
      required: false,
    },
    link: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    initials() {
      if (this.user !== undefined && this.user !== null) return this.user.firstname[0] + this.user.lastname[0]
      return 'UI'
    },
    username() {
      if (this.user !== undefined && this.user !== null) return this.user.firstname + ' ' + this.user.lastname
      return 'Utilisateur inconnu'
    },
    hasImage() {
      return (
        this.user !== undefined &&
        this.user !== null &&
        this.user.profile_picture !== null &&
        this.user.profile_picture !== ''
      )
    },
    image() {
      if (this.hasImage) return this.user.profile_picture
      return ''
    },
    size() {
      switch (this.imageSize) {
        case 'xs':
          return 30
        case 's':
          return 40
        case 'l':
          return 62
        default:
          return 48
      }
    },
    style() {
      return this.link ? '' : 'cursor: default;'
    },
    backgroundColor() {
      let background = ''
      let color = ''

      switch (this.initials.charCodeAt(0) % 5) {
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
