<template>
    <div>
    <h1> Parcourir les collections </h1>
    <div id="collection"  v-for="set in sets" v-bind:key="set.id">
      <img id="collection-logo" v-bind:src="set.images.logo">
      <h1 id="collection-title"> {{ set.name }}</h1>
    </div>
    </div>
</template>

<script>
import pokemon from 'pokemontcgsdk'
export default {
  name: 'Collections',
  props: {
  },
  data () {
    return {
      sets: {}
    }
  },
  mounted: async function () {
    this.sets = await pokemon.set.all()
  }
}
</script>

<style scoped>
#collection{
  background-color : black;
}
</style>