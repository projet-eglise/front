<template>
  <NuxtLink :to="user && link ? '/admin/christian/' + user.uuid : ''" class="text-decoration-none" :style="style">
    <v-row class="d-flex justify-center align-center pl-4">
      <AppProfilePicture :size="size" :has-image="hasImage" :content="hasImage ? user.profile_picture : initials" />
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
    size: {
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
      if (this.user !== undefined && this.user !== null) return this.user.fullname
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
    style() {
      return this.link ? '' : 'cursor: default;'
    },
  },
}
</script>
