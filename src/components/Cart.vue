<template>
  <div>
    <div id="cart-form" v-if="this.cart.length != 0">
      <div id="checkout-container">
        <div id="delivery-inputs">
          <h1>Informations de livraison</h1>
          <input id="address" v-model="address" type="text" placeholder="Adresse" />
          <input id="zipCode" v-model="zipCode" type="text" placeholder="Code postal"/>
          <input id="city" v-model="city" type="text" placeholder="Ville" />
          <input id="country" v-model="country" type="text" placeholder="Pays" />
        </div>

        <div id="total-price">
          <h1>Prix total de la commande</h1>
          <p>{{ Number.parseFloat(this.totalPrice).toFixed(2) }} $</p>
        </div>

        <div id="order-buttons">

          <div v-if="totalPrice > 0 && address != '' && zipCode != '' && city != '' && country != ''">
            <button @click="checkout()">Payer</button>
          </div>

          <div v-else>
            <button id="disabled" disabled @click="checkout()">Payer</button>
          </div>
        <button  @click="removeAll()">Vider le panier</button>

        </div>

      </div>
      <div id="items">
        <table>
          <thead>
            <tr>
              <th id='firstcol' colspan="5"> Panier </th>
            </tr>
            <tr>
              <th id="image-preview"> Aperçu </th>
              <th> Nom </th>
              <th> Prix à l'unité </th>
              <th> Prix total </th>
              <th> Quantité </th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td id="image-preview">
              <div id="card-image-container" v-on:click="goToCard(item.id)">
                  <img id="card-img" :src="item.card.images.small" />
              </div>
            </td>
            <td id="card-name">
              <p v-on:click="goToCard(item.id)">{{ item.card.name }}</p>
            </td>
            <td>
              <p>{{ item.card.cardmarket.prices.averageSellPrice }} $</p>
            </td>
            <td>
              <p>{{ Number.parseFloat(item.card.cardmarket.prices.averageSellPrice * item.quantity).toFixed(2) }} $</p>
            </td>
            <td>
              <div id="quantity-manager">
                <div id="quantity-container" class="cart-item-end">
                    <button class="quantity-button" @click="decreaseQuantity(item.id)">-</button>
                    <p>{{ item.quantity }}</p>
                    <button class="quantity-button" @click="increaseQuantity(item.id)">+</button>
                </div>
                <div id="button-container" class="cart-item-end">
                    <button @click="removeFromCart(item.id)">Retirer</button>
                </div>
               </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      

      <div id="checkout-validation" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModalCheckoutValidation()">&times;</span>
          <check-out-validation :totalPrice="totalPrice" :address="address" :zipCode="zipCode" :city="city" :country="country"></check-out-validation>
          <button id="confirm-button" @click="closeModalCheckoutValidation()">Confirmer</button>
        </div>
      </div>
    </div>
    <div id="cart-empty" v-else>
      <p>Votre panier est vide !</p>
			<button @click="$router.push('/search')">Rechercher une carte</button>
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



*{
  font-family: 'Lato', sans-serif;
  font-weight : bold;
}
#cart-empty p{
  font-size : 32px;
  font-family : 'Work Sans', sans-serif;
  font-weight : bold;
  margin-bottom : 20px;
}

#cart-empty button{
  padding : 10px 20px 10px 20px;
  border : 3px solid gray;
  font-size : 18px;
}

#cart-empty button:hover{
  cursor : pointer;
}

#delivery-inputs{
  display : flex;
  flex-direction : column;
  margin-bottom : 50px;
}

#delivery-inputs h1{
  margin-bottom : 20px;
}
#delivery-inputs input{
  padding : 10px;
  margin : 5px;
}

#total-price p {
  margin-top : 10px;
  font-size : 28px;
}

#order-buttons{
  display : flex;
  flex-direction : row;
  flex-wrap : nowrap;
  justify-content : space-between;
}

#order-buttons button, button#confirm-button{
  margin-top : 40px;
  padding : 20px;
  font-size : 20px;
  background-color : #FFCC00;
  border: none;
  border-radius : 10px 10px;
  width : 200px;
}

#order-buttons button#disabled{
  background-color : #C7C7C7;
}

#order-buttons button:hover, button#confirm-button:hover{
  cursor : pointer;
}

#order-buttons button#disabled:hover{
  cursor : default;
}

#cart-form{
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
}

#items{
  flex:2;
  min-width : 70%;
  display:flex;
  flex-direction : column;
}

#checkout-container {
  flex: 1;
  padding : 50px;
  border : 1px solid black;
  margin-right : 20px;
  margin-bottom : 50px;
}

table{
  background-color : #E7E7E7;
  border-collapse : collapse;
}




thead tr:first-child{
  background-color: #ffcc00;
}

thead th{
  background-color : #ffcc00a2;
}

tbody tr:nth-child(odd){
  background-color: rgb(190, 225, 241);
}

#image-preview{
  width : 100px;
}

th{
  width : fit-content;
  padding : 20px;
}


td{
  width : fit-content;
  text-align : center;
  padding : 20px; 
}

tbody tr:hover{
  background-color : #f8f5c8;
}

td#card-name, td#image-preview{
  cursor: pointer;
}

#cart-item {
  display : flex;
  flex-direction : row;
  flex-wrap : wrap;
  border : 5px black solid; 
}

#card-image-container {
  width : 100%;
  height: auto;
  display: flex;
  flex-wrap : nowrap;
}

#card-info-container {
  width: 50%;
  display: flex;
  flex-wrap : nowrap;
  flex-direction : column;
  justify-content : space-evenly;
}

#quantity-container {
  width : 100%;
  display : flex;
  flex-flow : row nowrap;
  justify-content : space-around;
}

#quantity-manager{
  display : flex;
  width : 100%;
  flex-direction : column;
  flex-wrap : nowrap;
  height : 100%;
  justify-content : space-evenly;
}

#quantity-manager p {
  font-size : 29px;
}

.quantity-button{
  background: none;
  font-family:"Lato", sans-serif;
  font-size : 1em;
  color: black;
  border: 0px;
  border-radius: 8px;
  padding:1em;
}

.quantity-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
}

#button-container {
  width : 100%;
  display : flex;
  flex-flow : row nowrap;
  justify-content : space-evenly;
}

#button-container button{
  background: none;
  font-family:"Lato", sans-serif;
  font-size: 1em;
  border: 0px;
  color: black;
  border-radius: 8px;
  margin: 0.5em;
  padding:1em;
}

#button-container button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  cursor: pointer;
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

thead th{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: bold; 
}

#card-name p{
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-style: bold; 
}
</style>