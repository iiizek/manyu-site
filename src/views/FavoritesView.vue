<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import RootLoader from "@/components/RootLoader.vue";
import ProductCard from "@/components/ProductCard.vue";
import useProductsStore from "@/stores/products";
import useFavoritesStore from "@/stores/favorites";

const isLoading = ref(false);
const favoriteProducts = ref([]);

const { getProductByIdMin } = useProductsStore();
const { favorites } = useFavoritesStore();

const API_URL = import.meta.env.VITE_API_URL;

onMounted(() => {
  window.scrollTo(0, 0);
  if (favorites.length > 0) {
    isLoading.value = true;
  }
  favorites.forEach((favoriteId) => {
    getProductByIdMin(favoriteId).then((product) => {
      favoriteProducts.value.push(product);
      if (favoriteProducts.value.length === favorites.length) {
        isLoading.value = false;
      }
    });
  });
});

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <section :class="$style.container">
    <div v-if="isLoading" :class="$style.loadingWrapper">
      <root-loader />
    </div>
    <h2 :class="$style.name">Любимое</h2>
    <ul :class="$style.productList">
      <product-card
        v-for="favorite in favoriteProducts"
        :key="favorite.id"
        :id="favorite.id"
        :img-url="`${API_URL}/assets/${favorite.image}`"
        :name="favorite.name"
      />
    </ul>

    <div :class="$style.empty" v-if="favorites.length === 0">
      <h3>Список пуст</h3>
      <p>Чтобы добавить изделие в любимое, нажмите на ❤️ в карточке товара</p>
    </div>
  </section>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.container {
  display: flex;
  flex-direction: column;
  gap: 6.4rem;
  padding-top: 6rem;
  padding-bottom: 9.2rem;
}

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.empty {
  margin-top: 6.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var.$c-neutral-2;
  text-align: center;

  h3 {
    font-size: 2.4rem;
    font-weight: var.$fw-bold;
    margin-bottom: 1.6rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.8rem;
  }
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
