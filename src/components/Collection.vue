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
                <img v-bind:src="card.images.small"/>
                <h1> {{card.name}}</h1>
                <p> {{card.rarity}}</p>
                <p> {{card.cardmarket.prices.averageSellPrice}} $</p>
            </div>
        </div>
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
      await pokemon.set.find(this.id).then(set => {
          this.set = set;
          this.ready = true;
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
  }
}
</script>

<style scoped>
#cards{
    margin : auto;
    width : 75vw;
    display: flex;
    flex-direction : row;
    flex-wrap : wrap;
    justify-content : space-evenly;
}
#card{
    width : 500px;
    height : 500px;
}

#card:hover{
    background-color : #E7E7E7E7;
    cursor : pointer;
}

#set-infos{
    display : flex;
    flex-direction : column;
    flex-wrap : wrap;
    justify-content : space-around;
}

#set-logo-container img{
    height : 300px;
    width : auto;
}
</style>