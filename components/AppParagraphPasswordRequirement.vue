<template>
  <p v-bind="{ ...$attrs }" class="primary--text text-center font-italic mt-n2">
    {{ $t('authentication.password_requirement') }}
  </p>
</template>
