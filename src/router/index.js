import { createRouter, createWebHistory } from "vue-router";
import { reactive } from "vue";

import MainView from "@/views/MainView.vue";
import AboutView from "@/views/AboutView.vue";
import CollectionView from "@/views/CollectionView.vue";
import FavoritesView from "@/views/FavoritesView.vue";
import ProductModal from "@/components/ProductModal.vue";

export const routeHistory = reactive({
  previous: null,
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainView,
    },
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesView,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/collection-:collectionSlug(.*)",
      name: "collection",
      component: CollectionView,
    },
    {
      path: "/products/:productId",
      name: "product",
      components: {
        modal: ProductModal,
      },
      beforeEnter: (to, from) => {
        if (from.matched.length) {
          to.matched[0].components.default = from.matched[0].components.default;
        } else {
          to.matched[0].components.default = MainView;
        }
      },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "main" },
    },
  ],
});

router.beforeEach((to, from, next) => {
  routeHistory.previous = from;
  next();
});

export default router;
