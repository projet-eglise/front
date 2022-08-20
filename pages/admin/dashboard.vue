<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.dashboard') }}</AppTitlePageAdmin>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
}
</script>
