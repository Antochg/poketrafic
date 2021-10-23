<template>
    <div id="nav">
        <router-link to="/">Accueil</router-link> | 
        <router-link to="/search">Recherche</router-link> | 
        <router-link to="/collections">Collections</router-link> | 
        <router-link to="/cart">Panier</router-link> | 
        <router-link to="/about">À propos</router-link>
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
</style>