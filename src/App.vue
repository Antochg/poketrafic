<template>
  <div id="nav">
      <router-link to="/">Accueil</router-link>
      <router-link to="/search">Recherche</router-link>
      <router-link to="/collections">Collections</router-link>
      <router-link to="/cart">Panier</router-link>
      <router-link to="/about">À propos</router-link>
      <router-view />
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
