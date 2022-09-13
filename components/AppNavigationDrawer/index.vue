<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full bg-[#FFFFFF] w-14 hover:w-64 transition-all rounded-tr-lg rounded-br-lg">
    <AppLogo class="h-20 p-2" />

    <v-list dense>
      <AppNavigationDrawerListItem :label="$t('global.dashboard')" icon="home" path="/dashboard" />
      <AppNavigationDrawerListItem :label="$t('global.settings')" icon="cog" path="/settings" />
      <AppNavigationDrawerListItem :label="$t('global.logout')" icon="power-off" path="/logout" />
    </v-list>
  </div>
</template>
