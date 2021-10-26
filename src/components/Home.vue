<template>
  <div id="homepage">
    <div class="section" id="section-1">
      <h1> Bienvenue sur PokeTrafic </h1>
      <h2> Boutique en ligne de carte à collectionner de la license Pokémon </h2>
      <h2> Réservez des maintenants les cartes de votre choix ! </h2>
      <button> Rechercher une carte </button>
    </div>
    <div class="section" id="section-2">
      <h1> PokeTrafic recense l'intégralité des cartes Pokémon sortie à ce jour </h1>
      <h2> Parcourez l'ensemble des collections </h2>
    </div>
    <div class="section" id="section-3">
      <h1> Découvrez en plus sur le projet PokéTrafic </h1>
      <a v-bind:href="'/about'"> En savoir plus sur PokéTrafic </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  props: {

  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#homepage{
  display:flex;
  flex-direction : column;
}

.section{
  height : 500px;
  width : 100%;
  display : flex;
  padding : 40px;
}

#section-1{
  background-color : blue;
  flex-direction : column;
  justify-content : space-evenly;
}
#section-2{
  background-color :red;
}

#section-3{
  background-color : yellow;
}
</style>