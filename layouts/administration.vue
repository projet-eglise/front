<template>
  <v-app>
    <v-main>
      <div class="flex flex-col w-screen h-screen">
        <AppBarAdmin class="md:hidden z-50" />
        <div class="flex">
          <AppNavigationDrawerAdminDesktop class="hidden md:block z-50" />
          <div class="pt-24 pb-4 px-4 md:py-0 h-screen overflow-auto w-full">
            <Nuxt />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

