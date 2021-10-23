<template>
	<div>
		<button @click="$router.push('/cart')">Payer</button>
		
		<div v-for="card in cards.data" v-bind:key="card.id">
			<div id="card-image-container">
				<img id="card-img" v-bind:src="card.images.small">
			</div>

			<h1 id="card-title"> {{ card.name }}</h1>
			<h2 id="card"> {{ card.cardmarket.prices.averageSellPrice }} </h2>

      <button @click="addToCart(card.id)">add to cart</button>
		</div>
	</div>
</template>

<script>
import pokemon from 'pokemontcgsdk'

export default {
	name: 'Search',
  data () {
    return {
			cards: {},
			cart: [],
			currentPage: 1,
    }
  },
	beforeMount() {
		this.getCards()
	},
	methods: {
		async getCards() {
			this.cards = await pokemon.card.where({ pageSize: 20, page: this.currentPage })
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
      const item = this.cards.data.find(({ id }) => id === cardId);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (!this.isInCart(cardId)) {
        console.log("if")
        cartItems.push({ id:item.id ,card: item, quantity: 1 });
      }
      else {
        console.log("else")
        const item = cartItems.find(({ id }) => id === cardId);
        const index = cartItems.indexOf(item)
        var quantity = cartItems[index].quantity
        quantity++
        cartItems.splice(index, 1, { id:item.id ,card: item, quantity: quantity})
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
    }
	}
}
</script>

<style scoped>

</style>