<template>
	<div>
		<div v-for="item in cart" :key="item.id">
      <!-- <p>{{ item.name }}</p>
      <img :src="item.images.small" /> -->

      <p>{{ item.card.name }}</p> 
      <img :src="item.card.images.small" />
      <p>{{ item.quantity }}</p>

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
      console.log(this.cart)
    },
  },
  beforeMount() {
    this.getCart();
  },
}
</script>

<style scoped>

</style>