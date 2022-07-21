<template>
  <div class="flex flex-col mx-auto justify-center align-center">
    <WidgetReturnButton to="/connexion/choisir-mon-eglise" class="mr-auto" />
    <div class="flex flex-col md:flex-row justify-center">
      <AppButtonSquareWithImage link="/eglise/creer" icon="plus" first-line="Ajouter une" second-line="Eglise" />
      <span class="flex text-primary uppercase text-4xl text-center font-bold m-8 justify-center align-center"> </span>
      <AppButtonSquareWithImage link="/eglise/rejoindre" icon="church" first-line="Rejoindre une" second-line="Eglise" />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'configuration',
  meta: { protected: true },
}
</script>

<style scoped>
.choises {
  margin-bottom: 2em;
}

.v-btn {
  margin: 2em 0px;
}
</style>
