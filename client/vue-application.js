const Home = window.httpVueLoader('./components/Home.vue')
const Collections = window.httpVueLoader('./components/Collections.vue')
const Search = window.httpVueLoader('./components/Search.vue')
const Cart = window.httpVueLoader('./components/Cart.vue')

const routes = [
  { path: '/', component: Home },
  { path: '/collections', component: Collections },
  { path: '/search', component: Search },
  { path: '/cart', component: Cart },
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
