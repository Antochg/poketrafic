import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Collections from "@/components/Collections.vue"
import Cart from "@/components/Cart.vue"
import Search from "@/components/Search.vue"
import Card from "@/components/Card.vue"
import Collection from "@/components/Collection.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta : {
      title : "Accueil"
    }
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta : {
      title : "A propos"
    }
  },
  {
    path: "/collections",
    name: "Collections",
    component: Collections,
    meta : {
      title : "Parcourir les collections"
    }
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    meta : {
      title : "Panier"
    }
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta : {
      title : "Recherche d'une carte"
    }
  },
  {
    path: '/card/:id',
    name: "Card",
    component: Card,
    props : true,
    meta : {
      title : "Carte"
    }
  },
  {
    path:'/collection/:id',
    name: "Collection",
    component: Collection,
    props : true,
    meta : {
      title : "Collection"
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(to);
  document.title = to.meta.title;
  next();
})

export default router;
