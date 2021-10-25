<template>
  <div id="header">
    <div id="header-upper-part">
      <div id="side-logos" class="unreachable" style="opacity : 0">
        <img src="../assets/money-bag.png"/>
      </div>
      <div id="pkt-logo-container">
        <router-link to="/"><img src="../assets/Logo_Pokétrafic.png"/></router-link>
      </div>
      <div id="side-logos">
        <router-link to="/cart"><img src="../assets/money-bag.png"/></router-link>
      </div>
    </div>
    <div id="header-bottom-part">
      <Menu/>
    </div>
  </div>
</template>

<script>

import Menu from './Menu.vue'
export default {
  name: 'Header',
  components:{
    Menu
  },
  props: {

  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
#header{
  display:flex;
  flex-direction : column;
  flex-wrap : nowrap;
}

#header-upper-part{
  background: radial-gradient(50% 50% at 50% 50%, #21386E 28.12%, #2C61BD 100%);
  border-bottom : 10px solid #00008B;
  display: flex;
  justify-content : space-evenly;
}

#header-bottom-part{
  border-top : 15px solid white;
  background-color : #E7E7E7;
  padding : 30px;
  box-shadow : 0 5px 2px -2px gray;
}

#pkt-logo-container{
  align-self : center;
}

#pkt-logo-container img{
    max-width : 600px;
    width : 50vw;
    height: auto;
}

#side-logos{
  display:flex;
  flex-direction : column;
  justify-content : space-around;
}

#side-logos img{
  max-width : 100px;
  width : 10vw;
}

#side-logos img:hover{
  cursor : pointer;
}

.unreachable img:hover{
  cursor: default!important;
}

</style>