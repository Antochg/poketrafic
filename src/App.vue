<template>
  <div>
    <Header/>
    <div id="router-view">
      <router-view/>
    </div>
  </div>
</template>

<script>

import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200&display=swap%27');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100&display=swap');

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

#router-view{
  max-width : 70%;
  margin : auto;
  background-color : #F7F7F7;
  padding : 50px;
  min-height : 60vh;
}

#navigator{
	margin : auto;
	width : 100px;
	display : flex;
	flex-direction : row;
	flex-wrap : nowrap;
	justify-content : space-around;
	margin-bottom : 30px;
}
#navigator button{
	padding : 10px;
}

#navigator input{
	padding : 10px;
  max-width : 30px;
  text-align : center;
}
</style>
