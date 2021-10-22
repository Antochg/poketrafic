<template>
    <div>
      <h1> Parcourir les collections </h1>
      <div id="collections">
        <div id="collection"  v-for="set in sets" v-bind:key="set.id">
            <div id="collection-logo-container">
              <img id="collection-logo" v-bind:src="set.images.logo">
            </div>
            <h1 id="collection-title"> {{ set.name }}</h1>
        </div>
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
  width : 500px;
  height : auto;
  min-height : 300px;
  padding : 50px;
  background-color : #e7e7e7;
  margin : 10px;
  display : flex;
  flex-wrap : nowrap;
  flex-direction : column;
  justify-content : space-between;
}

img#collection-logo{
  max-width : 400px;
  height : auto;
}

#collections{
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
  justify-content : space-evenly;
}
</style>