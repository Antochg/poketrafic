<template>
	<div>
    <input type="text" v-model="searchInput"/>
    <button @click="this.currentPage = 1 ; getCards()">recherche</button>
		<div v-if="this.cards != undefined">
			<button v-on:click="{if(this.currentPage > 1){this.currentPage--; getCards()}}"> - </button>
			<input type="text" readonly v-model="currentPage"/>
			<button v-on:click="{if(this.currentPage < Math.floor(this.cards.totalCount  / 8)){this.currentPage++; getCards()}}"> + </button>
			<div id="cards">
				<div id="card" v-for="card in cards.data" v-bind:key="card.id">
					<div id="card-image-container">
						<img id="card-img" v-bind:src="card.images.small">
					</div>
					<h1 id="card-title"> {{ card.name }}</h1>
					<div v-if="card.cardmarket!= undefined">
						<h2 id="card"> {{ card.cardmarket.prices.averageSellPrice }} </h2>
						<button @click="$router.push('/cart')">Payer</button>
						<button @click="addToCart(card.id)">add to cart</button>
					</div>
				</div>
			</div>
		</diV>
	</div>
</template>

<script>
import pokemon from 'pokemontcgsdk'

export default {
	name: 'Search',
  data () {
    return {
			cards: undefined,
			cart: [],
			currentPage: 1,
      searchInput: ""
    }
  },
	methods: {
		async getCards() {
			await pokemon.card.where({ q : 'name:*'+this.searchInput+"*", pageSize:8, page:this.currentPage }).then((cards) => {
        console.log(cards)
        this.cards = cards
        console.log(this.cards.data)
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
      const item = this.cards.data.find(({ id }) => id === cardId);
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      if (!this.isInCart(cardId)) {
        cartItems.push({ id:item.id ,card: item, quantity: 1 });
      }
      else {
        const item = cartItems.find(({ id }) => id === cardId);
        const index = cartItems.indexOf(item)
        var quantity = cartItems[index].quantity
        quantity++
        cartItems.splice(index, 1)
        cartItems.push({ id: item.id, card: item.card, quantity: quantity })
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
        this.cart = JSON.parse(localStorage.getItem("cart"));
    }
	}
}
</script>

<style scoped>
#card{
	width : 400px;
	height :auto;
	display : flex;
	flex-wrap : wrap;
	flex-direction: column;
}

#cards{
	display : flex;
	flex-wrap : wrap;
	flex-direction : row;
}
</style>