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
    path: "/card",
    name: "Card",
    component: Card,
    props : true,
  },
  {
    path:'/collection/:id',
    name: "Collection",
    component: Collection,
    props : true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
