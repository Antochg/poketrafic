<template>
	<div>
    <button @click="removeAll()">Vider le panier</button>
		<div v-for="item in cart" :key="item.id">
      <div id="cart-item">
        <div id="card-image-container">
          <img id="card-img" :src="item.card.images.small" />
        </div>

        <div id="card-info-container">
          <h1>{{ item.card.name }}</h1>
          <p>{{ item.card.cardmarket.prices.averageSellPrice }} €</p>
        </div>

        <div id="quantity-container">
          <button @click="decreaseQuantity(item.id)">-</button>
          <p>{{ item.quantity }}</p>
          <button @click="increaseQuantity(item.id)">+</button>
        </div>

        <div id="total-container">
          <p>{{ (item.card.cardmarket.prices.averageSellPrice*item.quantity) }}</p>
        </div>

        <button @click="removeFromCart(item.id)">Retirer</button>
      </div>
    </div>

    <div id="checkout-container">
      <h1>Livraison</h1>
      <input id="address" v-model="address" type="text" placeholder="Adresse">
      <input id="zipCode" v-model="zipCode" type="text" placeholder="Code postal">
      <input id="city" v-model="city" type="text" placeholder="Ville">
      <input id="country" v-model="country" type="text" placeholder="Pays">

      <h1>Total</h1>
      <p>{{ this.totalPrice }} €</p>

      <button @click="checkout()">Payer</button>
    </div>

    <div id="checkout-validation">
      <div id="myModalCheckoutValidation" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModalCheckoutValidation()">&times;</span>

          <p>Votre commande d'une valeur de {{ totalPrice }} a été enregistré.</p>
          <p>Adresse de livraison : {{ address }}</p>
          <p>Code postal : {{ zipCode }}</p>
          <p>Ville : {{ city }}</p>
          <p>Pays : {{ country }}</p>
        </div>
      </div>
    </div>
	</div>
</template>

<script>
export default {
	name: 'Cart',
  data () {
    return {
      cart: [],
      totalPrice: 0,
      address: "",
      zipCode: "",
      city: "",
      country: "",
    }
  },
	methods: {
    increaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item);
      var quantity = cartItems[index].quantity;
      quantity++;
      cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice += item.card.cardmarket.prices.averageSellPrice;
    },
    decreaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item);
      var quantity = cartItems[index].quantity;
      if(quantity > 1) {
        quantity--;
        cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity });
        this.totalPrice -= item.card.cardmarket.prices.averageSellPrice;
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
		removeFromCart(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.findIndex(({ id }) => id === cardId);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice -= (item.card.cardmarket.prices.averageSellPrice*item.quantity);
    },
    removeAll() {
      var cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice = 0;
    },
    checkout() {
      var modal = document.getElementById("myModalCheckoutValidation");
      modal.style.display = "block";

      // window.onclick = function(event) {
      //   if (event.target == modal) {
      //     modal.style.display = "none";
      //   }
      // }
    },
    closeModalCheckoutValidation() {
      this.removeAll();
      this.clearDeliveryAddress();
      var modal = document.getElementById("myModalCheckoutValidation");
      modal.style.display = "none";
    },
    clearDeliveryAddress() {
      this.address = "";
      this.zipCode = "";
      this.city = "";
      this.country = "";
    },
		getCart() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    getCheckoutTotal() {
      for(var item of this.cart) {
        this.totalPrice += (item.card.cardmarket.prices.averageSellPrice*item.quantity);
      }
    },
  },
  beforeMount() {
    this.getCart();
    this.getCheckoutTotal();
  },
}
</script>

<style scoped>

</style>