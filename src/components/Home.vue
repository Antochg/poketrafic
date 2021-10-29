<template>
  <div id="homepage">
    <div class="section" id="section-1">
      <h1> Bienvenue sur PokeTrafic </h1>
      <img src="../assets/home-illustration.jpg"/>
    </div>
    <div class="section" id="section-2">
      <h1> PokeTrafic recense l'intégralité des cartes Pokémon sortie à ce jour !  </h1>
      <a href="/search"><h2> Rechercher une carte </h2></a>
      <a href="/collections"><h2> Parcourir les collections </h2></a>
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

a{
  text-decoration : none;
  color : black;
}
h1,h2{
  font-family : 'Work Sans', sans-serif;
  font-weight : bold;
  margin : 5px;
  font-size : 1.3em;
}

h1{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: bold; 
}

#homepage{
  display:flex;
  flex-direction : column;
  width : 100%;
}

.section{
  height : fit-content;
  width : 100%;
  display : flex;
}

#section-1{
  flex-direction : column;
  justify-content : space-evenly;
}

#section-1 img{
  width : 100%;
}

#section-1 h1{
  width : 100%;
  text-align : center;
  font-size : 3vw;
  margin-bottom : 30px;
}
#section-2{
  background-color : #FFCC00;
  flex-direction : row;
  flex-wrap : nowrap;
  justify-content : space-evenly;
}

#section-2 h1, #section-2 h2{
  height : 100%;
  padding : 20px;
  text-align : center;
}

#section-2 h2:hover{
  color :white;
  cursor : pointer;
}
</style>