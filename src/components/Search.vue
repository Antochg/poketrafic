<template>
	<div>
    <input type="text" v-model="searchInput"/>
		<div v-if="this.rarities != undefined">
		<select name="rarities" id="rarities-filter" v-model="raritySelected">
			<option value=""> -- Choisir une option -- </option>
			<option v-for="rarity in rarities" :value="rarity" :key="rarity"> {{rarity}} </option>
		</select>
		</div>
		<button @click="this.currentPage = 1 ; getCards()">Search</button>
		<div v-if="this.cards != undefined">
			<div v-if="this.cards.totalCount > 0">
				<button v-on:click="{if(this.currentPage > 1){this.currentPage--; getCards()}}"> - </button>
				<input type="text" readonly v-model="currentPage"/>
				<button v-on:click="{if(this.currentPage < Math.floor(this.cards.totalCount  / 8)){this.currentPage++; getCards()}}"> + </button>
				<button @click="$router.push('/cart')">Payer</button>
				<div id="cards">
					<div id="card" v-for="card in cards.data" v-bind:key="card.id">
						<div id="card-image-container">
							<img id="card-img" v-bind:src="card.images.small">
						</div>
						<h1 id="card-title"> {{ card.name }}</h1>
						<div v-if="card.cardmarket!= undefined">
							<h2 id="card"> {{ card.cardmarket.prices.averageSellPrice }} </h2>
							<button @click="addToCart(card.id)">Ajouter au panier</button>
						</div>
					</div>
				</div>
			</div>
			<div v-else>
			<h1> Aucun résultat </h1>
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
      searchInput: "",
			rarities : undefined,
			raritySelected : ""
    }
  },
	mounted : async function(){
		await pokemon.rarity.all().then((result) => {
			this.rarities = result
		})
	},
	methods: {
		async getCards() {
			if(this.raritySelected != ""){
				let rarity = this.raritySelected.replace(" ", "-")
				await pokemon.card.where({ q : 'name:*'+this.searchInput+"* rarity:" + rarity, pageSize:8, page:this.currentPage }).then((cards) => {
					console.log(cards)
					this.cards = cards
				})
			}else{
				await pokemon.card.where({ q : 'name:*'+this.searchInput+"*", pageSize:8, page:this.currentPage }).then((cards) => {
					console.log(cards)
					this.cards = cards
					console.log(this.cards.data)
				})
			}
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
        cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity })
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