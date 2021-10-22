const Home = window.httpVueLoader('./components/Home.vue')
const Panier = window.httpVueLoader('./components/Panier.vue')
const Register = window.httpVueLoader('./components/Register.vue')
const Login = window.httpVueLoader('./components/Login.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

const router = new VueRouter({
  routes
})

var app = new Vue({
  router,
  el: '#app',
  data: {
    user: {
      email: '',
      password: ''
    }
  },
  async mounted () {
  },
  methods: {
    async loginUser(user) {
      await axios.post('/api/login', user).then(function() {
        alert('Connected')
        router.push('/')
      })
    }
  }
})
