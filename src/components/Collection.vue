<template>
<div>
    <div v-if="ready">
        <div id="set-infos">
            <h1> Collection  {{set.name}}</h1>
            <div id="set-logo-container">
                <img id="set-logo" v-bind:src="set.images.logo">
            </div>
        </div>
        <button v-on:click="{if(this.currentPage > 1){this.currentPage--; updateCurrentCards()}}"> - </button>
        <input type="text" readonly v-model="currentPage"/>
        <button v-on:click="{if(this.currentPage < Math.floor(this.cards.length  / 10) + 1){this.currentPage++; updateCurrentCards()}}"> + </button>
        <div id="cards">
            <div id="card" v-for="card in currentCards" v-bind:key="card.id">
                <div v-on:click="goToCard(card.id)">
                <img v-bind:src="card.images.small"/>
                <h1> {{card.name}}</h1>
                <p> {{card.rarity}}</p>
                <p> {{card.cardmarket.prices.averageSellPrice}} $</p>
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
        for(var i = this.currentPage-1; i <= (this.currentPage*10)-1; i++) {
            this.currentCards.push(this.cards[i])
        }
        console.log(this.currentCards)
      })
  },
  methods: {
      updateCurrentCards(){
          if(this.currentPage > 0 && this.currentPage <= Math.floor(this.cards.length / 10) + 1){
            this.currentCards = []
            let TotalCardCount = this.cards.length
            console.log(TotalCardCount)
            let index = 0 + (this.currentPage - 1) * 10
            let done = false;
            let count = 10;
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
    display : block;
    flex-direction : column;
    flex-wrap : wrap;
    justify-content : space-around;
    text-align: center;
}

#set-logo-container > img{
    display: inherit;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
}

#cards{
    margin : auto;
    width : 75vw;
    display: flex;
    flex-direction : row;
    flex-wrap : wrap;
    justify-content : space-evenly;
}
#card{
    width : 20vw;
    height : auto;
    padding : 1em;
}

#card:hover{
    background-color : #E7E7E7E7;
    cursor : pointer;
}



</style>