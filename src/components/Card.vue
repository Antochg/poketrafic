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
          
          <div id="card-extension">
              <h2 id="card-set-name"><h3>Extension:</h3>{{card.set.name}}</h2>
              <div id="card-set-pic">
                <img  v-bind:src="card.set.images.symbol"  v-on:click="goToCollec(card.set.id)">
              </div>
          </div>
        </div>
        
        <div id="card-sell">
          <h4 id="card-price">{{card.cardmarket.prices.averageSellPrice}}€</h4>
          <button class="button1" @click="addToCart(card.id, card.name)">Ajouter au panier</button>
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
      document.title = document.title + ' | ' + card.set.name + " " + card.name;
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
    addToCart(cardId, cardName) {
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
      alert('La carte " ' + cardName + ' " a été ajouté au panier !');
    },
    goToCollec(setId){
          window.location.replace(window.location.origin+'/collection/' + setId)
      },
  }
  }
</script>

<style scoped>

div#card{
  margin : 0;
  display: flex;
  flex-flow: row wrap;
  justify-content : space-evenly;
}

#card>div{
  padding: 1em;
}

#card-pic{
  width: 24em;
  align-self: center;
}

img#card-photo{
  height: auto;
  width: 24em;

  }

#card-propreties{
  width:16em;
  text-align: center;
}

#card-sell{
  width:9em;
  margin-top: auto;
}


div#card-set-info{
  display: flex;
  flex-direction: column;
}

h1{
  font-family: 'Montserrat', sans-serif;
}

h2{
  font-family: 'Lato', sans-serif;
}


h3{
  margin-top: 1em;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: bold; 
  font-size: 80%;
}

h4{
  font-family: 'Lato', sans-serif;
  font-size : 250%;
}

#card-extension{
  display : flex;
  flex-flow : column wrap;
}

#card-set-pic{
  margin-top: 1em;
}

#card-set-pic>img{
  height: 3em;
  cursor: pointer;
}


.button1{
  background: none;
  font-family:"Lato", sans-serif;
  color: black;
  border: 1px solid #515457;
  border-radius: 8px;
  padding:1em;
  padding-left: 2em;
  padding-right: 2em;
}

.button1:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
}
</style>