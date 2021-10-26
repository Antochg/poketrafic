<template>
    <div>
      <h1> Parcourir les collections </h1>
      <div id="navigator">
          <button v-on:click="{if(this.currentPage > 1){this.currentPage--; updateSet()}}"> ⯇ </button>
          <input type="text" readonly v-model="currentPage"/>
          <button v-on:click="{if(this.currentPage < Math.floor(this.sets.totalCount / 8) + 1){this.currentPage++; updateSet()}}"> ⯈ </button>
        </div>
      <div v-if="this.ready">
        <div id="collections">
          <div id="collection"  v-for="set in sets.data" v-bind:key="set.id">
             <a id="collection-card" v-bind:href="'collection/'+ set.id">
                <div id="collection-logo-container">
                  <img id="collection-logo" v-bind:src="set.images.logo">
                </div>
                <h1 id="collection-title"> Nom de la collection : {{ set.name}}</h1>
                <h1 id="collection-release"> Date de sortie : {{ set.releaseDate }} </h1>
                <h2 id="collection-printedTotal"> {{ set.printedTotal }} cartes </h2>
              </a>
          </div>
        </div>
      </div>
      <div v-else>
        <!--<h1> Chargement </h1> -->
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
      console.log(sets.data[0]);
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
  padding : 20px;
  margin : 10px;
  display : flex;
  flex-wrap : nowrap;
  flex-direction : column;
  justify-content : space-between;
  background-color : white;
  border-radius : 5%;
  box-shadow : 5px 5px 2px -2px gray;
}

#collection:hover{
  background-color : #d0def4;
  transition : 0.5s;
}

#collection-logo-container{
  margin :auto;
  display : flex;
  margin-bottom : 60px;
}

h1, h2{
  margin : 5px;
  font-size : 1.3em;
}


a{
  text-decoration : none;
  color : black;
}

#collection-card{
  display:flex;
  flex-direction : column;
  flex-wrap : nowrap;
  width : 100%;
  justify-content : space-between;
  margin : auto;
}

#collection:hover{
  cursor : pointer;
}

img#collection-logo{
  width : 100%;
  max-width : 300px;
  height : 100%;
  max-height : 100px;
}

#collections{
  display : flex;
  flex-flow : row wrap;
  justify-content : space-evenly;
}
</style>