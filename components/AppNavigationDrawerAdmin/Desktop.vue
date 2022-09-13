<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="h-full bg-[#FFFFFF] w-14 hover:w-64 transition-all rounded-tr-lg rounded-br-lg">
    <AppLogo class="h-20 p-2" />

    <v-list dense>
      <AppNavigationDrawerListItem :label="$t('global.dashboard')" icon="home" path="/admin/dashboard" />
      <AppNavigationDrawerListItem :label="$t('global.christians')" icon="users" path="/admin/christians" />
      <AppNavigationDrawerListItem :label="$t('global.churches')" icon="church" path="/admin/churches" />
      <AppNavigationDrawerListItem :label="$t('global.emails')" icon="paper-plane" path="/admin/emails" />
      <AppNavigationDrawerListItem :label="$t('global.logout')" icon="power-off" path="/admin/logout" />
    </v-list>
  </div>
</template>
