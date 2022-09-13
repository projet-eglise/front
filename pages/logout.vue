<template>
    <span></span>
</template>

<script>
export default {
  meta: { protected: true },
  beforeCreate() {
    this.$authentication.logout(false)
  },
}
</script>
