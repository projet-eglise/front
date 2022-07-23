<template>
  <v-app>
    <v-main>
      <div class="flex flex-col w-screen h-screen">
        <AppBarAdmin class="md:hidden" />
        <div class="flex">
          <AppNavigationDrawerAdminDesktop class="hidden md:block" />
          <div class="mb-20 mt-20 md:mb-0 md:mt-0 h-screen overflow-auto p-4">
            <Nuxt />
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

