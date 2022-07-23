<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="absolute bottom-0 left-0 flex flex-row items-center bg-[#FFFFFF] h-20 w-screen text-center">
    <AppBottomNavigationItem :label="$t('global.home')" icon="home" path="/dashboard" />
    <AppBottomNavigationItem :label="$t('global.services')" icon="th" path="/services" />
    <AppBottomNavigationItem :label="$t('global.chat')" icon="comment-alt" path="/chat" />
    <AppBottomNavigationItem :label="$t('global.menu')" icon="bars" />
  </div>
</template>
