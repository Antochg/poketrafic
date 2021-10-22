import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import About from "@/components/About.vue";
import Collections from "@/components/Collections.vue"

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
    name: "Collection",
    component: Collections
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
