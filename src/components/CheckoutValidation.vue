<template>
  <div>
		<p>Votre commande d'une valeur de {{ (this.totalPrice).toFixed(2) }} $ a été enregistré.</p>
		<p>Adresse de livraison : {{ this.address }}</p>
		<p>Code postal : {{ this.zipCode }}</p>
		<p>Ville : {{ this.city }}</p>
		<p>Pays : {{ this.country }}</p>
  </div>
</template>

<script>

export default {
	name: 'Checkout',
	props: {
		totalPrice: Number,
		address: String,
		zipCode: String,
		city: String,
		country: String,
	}
}
</script>

<style scoped>
	p{
		font-size : 24px;
	}
</style>