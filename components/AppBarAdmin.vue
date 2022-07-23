<template>
  <div class="absolute top-0 left-0 bg-[#FFFFFF] h-20 w-screen flex items-center px-4 rounded-br-lg rounded-bl-lg">
    <div @click="open">
      <v-icon>fas fa-bars</v-icon>
    </div>
    <AppLogo class="h-14" centred />
    <div ref="drawerContainer" class="hidden">
      <AppNavigationDrawerAdminMobile ref="drawer" />
      <div class="absolute top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)]" @click="close"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.drawerContainer.classList.value = []
      setTimeout(
        function () {
          this.$refs.drawer.$el.classList.value = this.$refs.drawer.$el.classList.value.replace('w-14', 'w-64')
        }.bind(this),
        20
      )
    },
    close() {
      this.$refs.drawer.$el.classList.value = this.$refs.drawer.$el.classList.value.replace('w-64', 'w-14')
      setTimeout(
        function () {
          this.$refs.drawerContainer.classList.value = ['hidden']
        }.bind(this),
        100
      )
    },
  },
}
</script>
