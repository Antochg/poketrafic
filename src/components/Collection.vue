<template>
<div>
    <div v-if="ready">
        <div id="set-infos">
            <div id="set-logo-container">
                <img id="set-logo" v-bind:src="set.images.logo">
            </div>
        </div>
        <div id="navigator">
            <button v-if="this.currentPage > 1" v-on:click="{if(this.currentPage > 1){this.currentPage--; updateCurrentCards()}}"> ⯇ </button>
            <button v-else disabled> ⯇ </button>
            <input type="text" readonly v-model="currentPage"/>
            <button v-if="this.currentPage < Math.floor(this.cards.length  / 9) + 1" v-on:click="{if(this.currentPage < Math.floor(this.cards.length  / 9) + 1){this.currentPage++; updateCurrentCards()}}"> ⯈ </button>
            <button v-else disabled> ⯈ </button>
        </div>
        <div id="cards">
            <div id="card" v-for="card in currentCards" v-bind:key="card.id">
                <div v-on:click="goToCard(card.id)">
                    <div id="card-image-container">
                        <img v-bind:src="card.images.small"/>
                    </div>
                    <h1 id="card-title"> {{card.name}}</h1>
                    <h2 id="card-rarity"> {{card.rarity}}</h2>
                    <div v-if="card.cardmarket != undefined">
                        <h2 id="card-price"> {{card.cardmarket.prices.averageSellPrice}} $</h2>
                    </div>
                    <div v-else>
                        <h2 id="card-price"> Rupture de stock </h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
    <h1> Erreur : nous ne pouvons pas accéder à votre requête </h1>
    </div>
</div>
  
</template>

<script>
import pokemon from 'pokemontcgsdk'
export default {
    name: 'Collection',
    props: ['id'],
  data () {
    return {
        set : {},
        cards : {},
        currentCards : [],
        currentPage : 1,
        ready : false
    }
  },
  mounted : async function (){
      console.log(this.id)
      await pokemon.set.find(this.id).then(set => {
          this.set = set;
          this.ready = true;
          document.title = document.title + ' | ' + set.name;
      }).catch(() => {
          this.ready = false;
      })

      await pokemon.card.all({ q: 'set.id:'+this.id}).then(result => {
          this.cards = result
        for(var i = this.currentPage-1; i <= (this.currentPage*9)-1; i++) {
            this.currentCards.push(this.cards[i])
        }
        console.log(this.currentCards)
      })
  },
  methods: {
      updateCurrentCards(){
          if(this.currentPage > 0 && this.currentPage <= Math.floor(this.cards.length / 9) + 1){
            this.currentCards = []
            let TotalCardCount = this.cards.length
            console.log(TotalCardCount)
            let index = 0 + (this.currentPage - 1) * 9
            let done = false;
            let count = 9;
            while(!done){
                if(index < TotalCardCount){
                    if(count > 0){
                        this.currentCards.push(this.cards[index])
                        index++
                        count--
                    }else{
                        done = true
                    }
                }else{
                    done = true
                }
            }
          }
      },
      goToCard(id){
          window.location.replace(window.location.origin+'/card/' + id)
      }
  }
}
</script>

<style scoped>


#set-infos{
    display : flex;
    flex-direction : column;
    flex-wrap : wrap;
    justify-content : space-around;
    text-align: center;
    margin-bottom : 50px;
}

#set-logo-container > img{
    margin-left: auto;
    margin-right: auto;
    max-width : 500px;
    max-height : 500px;
    height : auto;
    width : auto;
}

#cards{
    margin : auto;
    display: flex;
    flex-direction : row;
    flex-wrap : wrap;
    justify-content : space-evenly;
}

#card{
	width : 30%;
	min-width : fit-content;
	margin : auto;
	height :auto;
	display : flex;
	flex-wrap : wrap;
	flex-direction: column;
	margin-top : 10px;
	margin-bottom : 10px;
    padding-top : 30px;
}

#card:hover{
    cursor : pointer;
    background-color : #d0def4;
    transition : 0.5s;
}

#card-image-container{
	width : fit-content;
	margin :auto;
}

#card-img{
	height : 330px;
	width : auto;
}

#card a {
	text-decoration : none;
	color : black;
}

#card h1, #card h2{
	width : 100%;
	text-align : center;
	text-decoration : none;
	font-size : 1.3em;
    margin-top : 10px;
    margin-bottom : 10px;
}

#card h1 {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-style: bold; 
}

#card h2{
	font-family: 'Work Sans', sans-serif;
}



</style>