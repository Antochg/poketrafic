import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Collections from "@/components/Collections.vue"
import Cart from "@/components/Cart.vue"
import Search from "@/components/Search.vue"
<<<<<<< HEAD
import Card from "@/components/Card.vue"
=======
import Collection from "@/components/Collection.vue"

>>>>>>> 90259f06c1af1b3dabe88b550b8f95bbe66eebc3

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/collections",
    name: "Collections",
    component: Collections
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
<<<<<<< HEAD
    path: "/card",
    name: "Card",
    component: Card,
    props : true,
  },
=======
    path:'/collection/:id',
    name: "Collection",
    component: Collection,
    props : true
  }
>>>>>>> 90259f06c1af1b3dabe88b550b8f95bbe66eebc3
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
