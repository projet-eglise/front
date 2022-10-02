<template>
  <div class="h-10 flex rounded border border-primary">
    <div
      :class="[
        'choice-1 w-1/2 flex align-center justify-center rounded-l uppercase transition',
        checked ? 'text-primary' : 'primary',
      ]"
      @click="uncheck"
    >
      <slot name="label-left"></slot>
    </div>
    <div
      :class="[
        'choice-2 w-1/2 flex align-center justify-center rounded-r uppercase transition',
        checked ? 'primary' : 'text-primary',
      ]"
      @click="check"
    >
      <slot name="label-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
    }
  },
  methods: {
    check() {
      this.checked = true
      this.$emit('input', true)
    },
    uncheck() {
      this.checked = false
      this.$emit('input', false)
    },
  },
}
</script>
