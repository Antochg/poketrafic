<template>
    <div id="nav">
        <div id="navSearch"><router-link to="/search">RECHERCHE</router-link></div>
        <div id="navCollec"><router-link to="/collections">COLLECTIONS</router-link></div>
        <div id="navPanier"><router-link to="/cart">PANIER</router-link></div>
        <div id="navAbout"><router-link to="/about">À PROPOS</router-link></div>
    </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {

  },
  data () {
    return {
    }
  }
}
</script>

<style>

#nav {
  display: flex;
  flex-flow: row;
  justify-content: center;
}

#navSearch, #navAbout, #navCollec, #navPanier {
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-left: 1em;
  margin-right: 1em;
  font-size: 1.2em;;
}



</style>