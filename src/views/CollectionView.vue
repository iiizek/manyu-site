<script setup>
import { reactive, ref, onMounted, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import ProductCard from "@/components/ProductCard.vue";
import useProductsStore from "@/stores/products";

const { getProductsBySlug } = useProductsStore();
const route = useRoute();

const isLoading = ref(false);
const name = ref("");
const products = reactive([]);

const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  window.scrollTo(0, 0);
  isLoading.value = true;
  await getProductsBySlug(route.params.collectionSlug).then((data) => {
    name.value = data.collectionName;
    products.push(...data.products);
    isLoading.value = false;
  });
});

watch(
  () => route.params.collectionSlug,
  async (newSlug) => {
    if (route.name !== "collection") return;
    isLoading.value = true;
    await getProductsBySlug(newSlug).then((data) => {
      name.value = data.collectionName;
      products.splice(0, products.length, ...data.products);
      isLoading.value = false;
    });
  }
);

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <section>
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
}
</style>
