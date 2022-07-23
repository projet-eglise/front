<template>
  <v-app>
    <v-main>
      <div class="flex flex-col w-screen h-screen">
        <AppBar class="md:hidden" />
        <div class="flex">
          <AppNavigationDrawer class="hidden md:block" />
          <div class="mb-20 mt-20 md:mb-0 md:mt-0 h-screen overflow-auto p-4">
            <Nuxt />
          </div>
        </div>
        <AppBottomNavigation class="md:hidden" />
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {}
</script>