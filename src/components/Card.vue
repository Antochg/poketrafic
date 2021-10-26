<template>
  <div>
  
  <div v-if="this.ready">
    <div id="card" v-bind:key="card.id">
      
      <div id="card-pic">
        <img id="card-photo" v-bind:src="card.images.large">
      </div>
      <div id="card-propreties">
        <h1 id="card-name"> {{ card.name}}</h1>
        <h2 id="card-types">{{ card.types}}</h2>
        <h2 id="card-supertype"><h3>Type de carte:</h3> {{ card.supertype}}</h2>
        <h2 id="card-subtypes"><h3>Sous-types:</h3> {{ card.subtypes}}</h2>
        <h2 id="card-rarity"><h3>Rareté:</h3> {{ card.rarity}}</h2>
        <h2 id="card-set-series"><h3>Série:</h3> {{card.set.series}}</h2>
        
        <div>
            <h2 id="card-set-name"> Extension: {{card.set.name}}
            <img id="card-set-pic" v-bind:src="card.set.images.symbol"></h2>
        </div>

      </div>
      <div id="card-sell">
        <h1 id="card-price">{{card.cardmarket.prices.averageSellPrice}}€</h1>
        <button @click="addToCart(card.id)">add to cart</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import pokemon from 'pokemontcgsdk'
export default {
  name: 'Card',
  props: ['id'],
  data () {
    return {
      ready : false,
      card:{},
			cart: [],
    }
  },

  mounted: async function () {
    await pokemon.card.find(this.id).then(card => {
      this.card = card;
      this.ready = true
      console.log(card);
    })
  },

  methods: {
    async updateCard(){
      this.ready = false;
      await pokemon.card.find(this.id).then(card => {
        this.card = card;
        this.ready = true
      })
    },
    isInCart(cardId) {
			if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
			else {
				this.cart = JSON.parse(localStorage.getItem("cart"));
			}
      const cartItem = this.cart.find(({ id }) => id === cardId);
      return Boolean(cartItem);
    },
    addToCart(cardId) {
      const item = this.card;
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (!this.isInCart(cardId)) {
        cartItems.push({ id: item.id, card: item, quantity: 1 });
      }
      else {
        const item = cartItems.find(({ id }) => id === cardId);
        const index = cartItems.indexOf(item)
        var quantity = cartItems[index].quantity
        quantity++
        cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity })
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
  }
  }
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@200&display=swap');

div#card{
  display: flex;
  flex-flow: row wrap;
  justify-content : space-evenly;
}

#card>div{
  padding: 3em;
}

img#card-photo{
  height: 30em;
  width: auto;
}

div#card-set-info{
  display: flex;
  flex-direction: column;
}

h2{
  font-family: 'Work Sans', sans-serif;
  font-style: light;
}


h3{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: bold; 
  font-size: 80%;
}

img#card-set-pic{
  height: 2em;
}
</style>