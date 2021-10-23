<template>
	<div>
		<div v-for="item in cart" :key="item.id">
      <div id="card-image-container">
        <img id="card-img" :src="item.card.images.small" />
      </div>
      <div>
        <div id="card-info-container">
          <p>{{ item.card.name }}</p> 
        </div>
        
        <div id="quantity-container">
          <button @click="decreaseQuantity(item.id)">-</button>
          <p>{{ item.quantity }}</p>
          <button @click="increaseQuantity(item.id)">+</button>
        </div>
      </div>

      <button @click="removeFromCart(item.id)">Retirer</button>
    </div>
	</div>
</template>

<script>
export default {
	name: 'Cart',
  data () {
    return {
      cart: [],
    }
  },
	methods: {
    increaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item)
      var quantity = cartItems[index].quantity
      quantity++
      cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity })
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
    decreaseQuantity(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const item = cartItems.find(({ id }) => id === cardId);
      const index = cartItems.indexOf(item)
      var quantity = cartItems[index].quantity
      if(quantity > 1) {
        quantity--
        cartItems.splice(index, 1, { id: item.id, card: item.card, quantity: quantity })
      }
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
		removeFromCart(cardId) {
      const cartItems = JSON.parse(localStorage.getItem("cart"));
      const index = cartItems.findIndex(({ id }) => id === cardId);
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
		getCart() {
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
      }
      this.cart = JSON.parse(localStorage.getItem("cart"));
    },
  },
  beforeMount() {
    this.getCart();
  },
}
</script>

<style scoped>

</style>