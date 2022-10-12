<template>
  <div class="flex">
    <AppReturnButtonIcon :to="to" class="hidden md:block text-3xl my-4 text-primary">
      <slot></slot>
    </AppReturnButtonIcon>
    <WidgetReturnButton :to="to" class="block md:hidden mt-n4" />
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>
