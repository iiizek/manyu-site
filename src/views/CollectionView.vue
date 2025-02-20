<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";

import { routeHistory } from "@/router";

import useSwipe from "@/hooks/useSwipe";
import useRouterBack from "@/hooks/useRouterBack";

import RootLoader from "@/components/RootLoader.vue";
import ProductCard from "@/components/ProductCard.vue";
import useProductsStore from "@/stores/products";

const { getProductsBySlug } = useProductsStore();
const route = useRoute();
const routerBack = useRouterBack();
const { swipeStart, swipeMove, swipeEnd } = useSwipe(
  200,
  "clientX",
  routerBack
);

const isLoading = ref(false);
const name = ref("");
const products = ref([]);

const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  window.scrollTo(0, 0);
  isLoading.value = true;
  await getProductsBySlug(route.params.collectionSlug)
    .then((data) => {
      name.value = data.collectionName;
      products.value = data.products;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

watch(
  () => route.params.collectionSlug,
  async (newSlug) => {
    if (
      routeHistory.previous?.name !== "collection" ||
      route.name !== "collection"
    )
      return;
    isLoading.value = true;
    products.value = [];
    await getProductsBySlug(newSlug)
      .then((data) => {
        name.value = data.collectionName;
        products.value = data.products;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
);

onUnmounted(() => {
  isLoading.value = false;
  useHead({
    title: `MANYU | Own Premium Production From Dagestan since 2020. Concept basic clothing`,
  });
});

useHead(() => ({
  title: `MANYU | ${name.value} | Own Premium Production From Dagestan since 2020. Concept basic clothing`,
}));
</script>

<template>
  <section @touchstart="swipeStart" @touchmove="swipeMove" @touchend="swipeEnd">
    <div v-if="isLoading" :class="$style.loadingWrapper">
      <root-loader />
    </div>
    <div v-else :class="$style.container">
      <h2 :class="$style.name">{{ name }}</h2>
      <ul :class="$style.productList">
        <product-card
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :img-url="`${API_URL}/assets/${product.image}`"
          :name="product.name"
        />
      </ul>
    </div>
  </section>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.container {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  padding-top: 6rem;
  padding-bottom: 9.2rem;
  animation: opacity 1s;
}

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.name {
  font-weight: var.$fw-bold;
  font-size: 2.4rem;
  color: var.$c-accent;
  text-transform: uppercase;
  padding-inline: 12.8rem;

  @media (width < 768px) {
    padding-inline: 3.6rem;
  }
}

.productList {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  row-gap: 4.4rem;
  column-gap: 0.4rem;
  padding-inline: 3.6rem;
  justify-content: start;
  align-items: start;

  @media (width < 768px) {
    row-gap: 6.4rem;
  }
}
</style>
