<template>
  <div>
  
  <div v-if="this.ready">
    <div id="card" v-bind:key="card.id">
      <button @click="addToCart(card.id)">add to cart</button>
      <div id="card-pic">
        <img id="card-photo" v-bind:src="card.images.large">
      </div>
      <div id="card-propreties">
        <h1 id="card-name"> {{ card.name}}</h1>
        <h2 id="card-types">{{ card.types}}</h2>
        <h2 id="card-supertype">Type de carte: {{ card.supertype}}</h2>
        <h2 id="card-subtypes">Sous-types: {{ card.subtypes}}</h2>
        <h2 id="card-rarity">Rareté: {{ card.rarity}}</h2>
      </div>
      <div id="card-set-info">
        <h2 id="card-set-name"> Extension: {{card.set.name}}</h2>
        <img id="card-set-pic" v-bind:src="card.set.images.symbol">
        <h2 id="card-set-series"> Série: {{card.set.series}}</h2>
      </div>
      <div id="card-sell">
        <h1 id="card-price">{{card.cardmarket.prices.averageSellPrice}}€</h1>
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
      alert("Ajouté au panier");
    },
  }
  }
</script>

<style scoped>

</style>