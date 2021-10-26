<template>
	<div id="search">
		<!-- Formulaire d'input pour la recherche -->
		<div id="search-inputs">
			<div id="search-input-text">
				<input type="text" v-model="searchInput" placeholder="Ex : Charizard"/>
			</div>
			<div id="search-input-select" v-if="this.rarities != undefined">
				<select name="rarities" id="rarities-filter" v-model="raritySelected">
					<option value=""> -- Choisir une rareté -- </option>
					<option v-for="rarity in rarities" :value="rarity" :key="rarity"> {{rarity}} </option>
				</select>
			</div>
			<!-- Radio button pour le tri des résultats -->
			<div id="search-radio-buttons">
				<p> Trier par : </p>
				<div id="search-radio-button">
					<input type="radio" id="nameAsc" value="name" v-model="filterSelected"/>
					<label for="nameAsc"> Ordre alphabétique </label>
				</div>
				<div id="search-radio-button">
					<input type="radio" id="setRealeaseAsc" value="set.releaseDate" v-model="filterSelected"/>
					<label for="nameAsc"> Date de sorite la plus ancienne</label>
				</div>
				<div id="search-radio-button">
					<input type="radio" id="setRealeaseAsc" value="-set.releaseDate" v-model="filterSelected"/>
					<label for="nameAsc"> Date de sorite la plus récente</label>
				</div>
			</div>

			<button @click="this.currentPage = 1 ; getCards()">Recherche</button>
		</div>

		<!-- Affichage des résultats -->
		<div v-if="this.cards != undefined">
			<div id="search-page-result" v-if="this.cards.totalCount > 0">
				<!-- Navigateur de page -->
				<div id="navigator">
					<button v-on:click="{if(this.currentPage > 1){this.currentPage--; getCards()}}"> ⯇ </button>
					<input type="text" readonly v-model="currentPage"/>
					<button v-on:click="{if(this.currentPage < Math.floor(this.cards.totalCount  / 9)){this.currentPage++; getCards()}}"> ⯈ </button>
				</div>
				
				<!-- Affichage en mosaïque des cartes -->
				<div id="cards">
					<div id="card" v-for="card in cards.data" v-bind:key="card.id">
						<a v-bind:href="'/card/' + card.id">
						<div id="card-image-container">
							<img id="card-img" v-bind:src="card.images.small">
						</div>
						<h1 id="card-title"> {{ card.name }}</h1>
						<h2 id="card-rarity"> {{ card.rarity}}</h2>
						</a>
						
						<div v-if="card.cardmarket== undefined || card.cardmarket.prices == undefined || card.cardmarket.prices.averageSellPrice == undefined">
							<h2 id="card-price"> Rupture de stock </h2>
							<div id="button-container">
								<button disabled>Indisponible</button>
							</div>
						</div>
						<div v-else>
							<h2 id="card-price"> {{ card.cardmarket.prices.averageSellPrice }} $ </h2>
							<div id="button-container">
								<button @click="addToCart(card.id)">Ajouter au panier</button>
							</div>
						</div>
					</div>
				</div>

			</div>
		<!-- Si le résultat est vide (pas de résultat correspondant à la recherche) -->
		<div v-else>
			<h1> Aucun résultat </h1>
		</div>
		</div>
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
			raritySelected : "",
			filterSelected : "-set.releaseDate"
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
				let rarity = this.raritySelected
				await pokemon.card.where({ q : 'name:"*'+this.searchInput+'*" !rarity:"' + rarity+'"', pageSize:9, page:this.currentPage, orderBy: this.filterSelected }).then((cards) => {
					console.log(cards)
					this.cards = cards
				}).catch((error) => {
					console.log(error)
				})
			}else{
				await pokemon.card.where({ q : 'name:"*'+this.searchInput+'*"', pageSize:9, page:this.currentPage,  orderBy: this.filterSelected }).then((cards) => {
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
			alert("Ajouté au panier");
    }
	}
}
</script>

<style scoped>
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
	padding-bottom : 30px;
}

#card:hover{
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
}

#card h2{
	font-family: 'Work Sans', sans-serif;
}

#card #button-container {
	width : 100%;
	display:flex;
	justify-content : space-around;
}

#card #button-container button{
	width : fit-content;
	padding : 10px 30px 10px 30px;
	margin : auto;
}

#cards{
	display : flex;
	flex-wrap : wrap;
	flex-direction : row;
}

#search-inputs{
	display : flex;
	flex-direction : row;
	justify-content : space-evenly;
	margin-bottom : 30px;
	background-color : #E7E7E7;
	padding : 40px;
	height : 100%;
}

#search-input-text{
	display : flex;
	width : fit-content;
}

#search-input-text input{
	height : fit-content;
}

#search-page-result{
	display : flex;
	flex-direction : column;
	justify-content : space-evenly;
}
</style>