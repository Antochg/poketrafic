<template>
  <div>
    <Menu/>
    <router-view/>
  </div>
</template>

<script>

import Menu from './components/Menu.vue'
export default {
  name: 'App',
  components: {
    Menu
  }
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
