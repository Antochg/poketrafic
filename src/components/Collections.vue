<template>
    <div>
      <h1> Parcourir les collections </h1>
      <div id="navigator">
          <button v-on:click="{if(this.currentPage > 1){this.currentPage--; updateSet()}}"> - </button>
          <input type="text" readonly v-model="currentPage"/>
          <button v-on:click="{if(this.currentPage < Math.floor(this.sets.totalCount / 8) + 1){this.currentPage++; updateSet()}}"> + </button>
        </div>
      <div v-if="this.ready">
        <div id="collections">
          <div id="collection"  v-for="set in sets.data" v-bind:key="set.id">
             <a v-bind:href="'collection/'+ set.id">
                <div id="collection-logo-container">
                  <img id="collection-logo" v-bind:src="set.images.logo">
                </div>
                <h1 id="collection-title"> {{ set.name}}</h1>
              </a>
          </div>
        </div>
      </div>
      <div v-else>
        <h1> Chargement </h1>
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
      ready : false,
      sets: {},
      currentPage : 1
    }
  },
  mounted: async function () {
    await pokemon.set.where({pageSize : 8, page:this.currentPage}).then((sets) => {
      this.sets = sets
      this.ready = true
    })
  },
  methods: {
    async updateSet(){
      this.ready = false;
      await pokemon.set.where({pageSize : 8, page:this.currentPage}).then((sets) => {
        this.sets=sets
        this.ready = true;
      })
    }
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

#collection:hover{
  cursor : pointer;
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