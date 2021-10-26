<template>
  <div>
    <div v-if="this.cart.length != 0">
      <div id="checkout-container">
        <h1>Livraison</h1>
        <input id="address" v-model="address" type="text" placeholder="Adresse" />
        <input id="zipCode" v-model="zipCode" type="text" placeholder="Code postal"/>
        <input id="city" v-model="city" type="text" placeholder="Ville" />
        <input id="country" v-model="country" type="text" placeholder="Pays" />

        <h1>Total</h1>
        <p>{{ this.totalPrice }} €</p>

        <div v-if="totalPrice > 0 && address != '' && zipCode != '' && city != '' && country != ''">
          <button @click="checkout()">Payer</button>
        </div>
      </div>

      <div class="items">
        <button @click="removeAll()">Vider le panier</button>
        <div v-for="item in cart" :key="item.id">
          <div id="cart-item">
            <div id="card-image-container" v-on:click="goToCard(item.id)">
              <img id="card-img" :src="item.card.images.small" />
            </div>

            <div id="card-info-container">
              <h1 v-on:click="goToCard(item.id)">{{ item.card.name }}</h1>
              <p>{{ item.card.cardmarket.prices.averageSellPrice }} €</p>
            </div>

            <div id="quantity-container" class="cart-item-end">
              <button class="quantity-button" @click="decreaseQuantity(item.id)">-</button>
              <p>{{ item.quantity }}</p>
              <button class="quantity-button" @click="increaseQuantity(item.id)">+</button>
            </div>

            <div id="total-container" class="cart-item-end">
              <p>
                {{ item.card.cardmarket.prices.averageSellPrice * item.quantity }}
              </p>
            </div>

            <div id="button-container" class="cart-item-end">
              <button @click="removeFromCart(item.id)">Retirer</button>
            </div>
          </div>
        </div>
      </div>

      <div id="checkout-validation" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModalCheckoutValidation()">&times;</span>
          <check-out-validation :totalPrice="totalPrice" :address="address" :zipCode="zipCode" :city="city" :country="country"></check-out-validation>
          <button @click="closeModalCheckoutValidation()">Confirmer</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Le panier est vide !</p>
			<button @click="$router.push('/search')">Ajouter des articles au panier</button>
    </div>
  </div>
</template>

<script>
import CheckoutValidation from "./CheckoutValidation.vue";

export default {
  components: {
    "check-out-validation": CheckoutValidation,
  },
  name: "Cart",
  data() {
    return {
      cart: [],
      totalPrice: 0,
      address: "",
      zipCode: "",
      city: "",
      country: "",
    };
  },
  methods: {
    increaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item);
      var quantity = cartItems[index].quantity;
      quantity++;
      cartItems.splice(index, 1, {
        id: item.id,
        card: item.card,
        quantity: quantity,
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice += item.card.cardmarket.prices.averageSellPrice;
    },
    decreaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item);
      var quantity = cartItems[index].quantity;
      if (quantity > 1) {
        quantity--;
        cartItems.splice(index, 1, {
          id: item.id,
          card: item.card,
          quantity: quantity,
        });
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
      this.totalPrice -=
        item.card.cardmarket.prices.averageSellPrice * item.quantity;
    },
    removeAll() {
      var cartItems = JSON.parse(localStorage.getItem("cart"));
      cartItems = [];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.totalPrice = 0;
    },
    checkout() {
      var modal = document.getElementById("checkout-validation");
      modal.style.display = "block";
    },
    closeModalCheckoutValidation() {
      this.removeAll();
      this.clearDeliveryAddress();
      var modal = document.getElementById("checkout-validation");
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
      for (var item of this.cart) {
        this.totalPrice += item.card.cardmarket.prices.averageSellPrice * item.quantity;
      }
    },
    goToCard(id){
      window.location.replace(window.location.origin+'/card/' + id)
    },
  },
  beforeMount() {
    this.getCart();
    this.getCheckoutTotal();
  },
};
</script>

<style scoped>
.items {
  width: 65%;
  float: left;
}

#checkout-container {
  width: 30%;
  float: right;
}

#cart-item {
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
  margin-bottom: 20px;
}

#card-image-container {
  width: 20%;
  height: auto;
  display: flex;
  flex-wrap : nowrap;
}

#card-info-container {
  width: 50%;
  display: flex;
  flex-wrap : nowrap;
  flex-direction : column;
}

#quantity-container {
  vertical-align: middle;
  height: 20%;
}

.quantity-button {
  width: 40%;
}

.cart-item-end {
  width: 10%;
  display: flex;
  flex-wrap : nowrap;
  flex-direction : row;
}

#card-img {
  width: 100%;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover, .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>