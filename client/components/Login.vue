<template>
  <div>
    <form @submit.prevent="loginUser">
        <h2>Se connecter</h2>
        <input type="email" v-model="newUser.email" placeholder="Email" required>
        <input type="password" v-model="newUser.password" placeholder="Password" required>
        <button type="submit">Se connecter</button>
    </form>
    <p>Pas encore inscrit ?</p>
    <button><router-link to='/register'>Inscrivez-vous</router-link></button>
  </div>
</template>
 
<script>
module.exports = {
  props: {
  },
  data () {
    return {
        newUser: {
            email: '',
            password: ''
        }
    }
  },
  methods: {
    loginUser () {
      this.$emit('login-user', this.newUser)
    }
  }
}
</script>
 
<style>
</style>
