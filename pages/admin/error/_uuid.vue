<template>
  <div>
    <AppTitlePageAdmin>{{ $t('global.errors') }}</AppTitlePageAdmin>
  </div>
</template>

<script>
export default {
  layout: 'administration',
  meta: { protected: true },
}
</script>