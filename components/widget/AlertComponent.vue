<template>
  <v-container class="alert-widget absolute-bottom-center">
    <v-alert
      dismissible
      elevation="24"
      :type="type"
      transition="scale-transition"
      class="center-v-alert"
      :value="display"
    >
      {{ message }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  computed: {
    type() {
      return this.$store.getters['components/alert-component/type']
    },
    display() {
      return this.$store.getters['components/alert-component/display']
    },
    message() {
      return this.$store.getters['components/alert-component/message']
    },
  },
}
</script>

<style>
.absolute-bottom-center {
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.alert-widget {
  width: 50%;
  z-index: 100000;
}

@media (max-width: 480px) {
  .alert-widget {
    width: 100%;
    z-index: 100000;
  }
}

@media (min-width: 480px) and (max-width: 768px) {
  .alert-widget {
    width: 70%;
    z-index: 100000;
  }
}
</style>