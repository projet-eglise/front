<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.users') }}</AppTitlePageAdmin>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
}
</script>
