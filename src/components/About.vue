<template>
  <body>  
  <div>
    <h1> À propos </h1>
  </div>
  <div id='text'>
    <br>
    <p> PokéTrafic est LE site d'achat en ligne de carte pokémon destiné aux collectionneurs !</p>
    <br>
    <p> Vous pouvez cherchez vos futurs cartes par nom, par type et même directement parcourir <router-link to="/collections">les extensions</router-link> !</p>
    <p> Avec PokéTrafic, plus la peine de parcourir la terre entière, traquant avec espoir les meilleurs deals : ils sont tous ici! </p>
    <br>
    <br>
    <br>
    <p id='disclaimer'> Disclaimer : <br> Ce site n'est pas un réel site de vente, seulement un projet académique destiné à pratiquer le développement web. Il se repose notamment sur l'<a href="https://pokemontcg.io/">API Pokemon TGC Developers</a>.</p>
    <div id="credit">Logo original. Icônes conçues par <a href="https://www.flaticon.com/fr/auteurs/roundicons-freebies" title="Roundicons Freebies">Roundicons Freebies</a> sur <a href="https://www.flaticon.com/fr/" title="Flaticon">www.flaticon.com</a></div>
  </div>
  </body>
</template>

<script>
export default {
  name: 'About',
  props: {
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

body{
  background-image: url(https://assets.change.org/photos/7/pw/rk/KRPWRKjCaTAdrJp-1600x900-noPad.jpg?1560354396);
}

h1{
  font-family: 'Montserrat';
  background-color: white;
  font-size: 3em;
  padding-top : 0.5em;
  padding-bottom : 0.5em;
}

#text{
  width : 80%;
  padding : 1em;
  margin-left: auto;
  margin-right: auto;
}

p{
  font-family: 'work sans', sans-serif;
  font-style: bold;
  font-size: 1.5em;
  background-color: white;
  padding: 1em;

}

p#disclaimer {
  font-family: 'Montserrat';
  color: red;
  font-size:1em;
  margin-bottom: 1em;
}

#credit {
  font-family: 'work sans', sans-serif;
  font-style: bold;
  font-size: 1em;
  background-color: white;
  padding: 1em;
}

</style>