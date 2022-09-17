<template>
  <span>
    <WidgetHttpResponseCode class="mr-2" :code="code" />
    {{ message }}
  </span>
</template>

<script>
export default {
  props: {
    code: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
}
</script>
