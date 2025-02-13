<script setup>
import { reactive, onMounted, ref, onUnmounted } from "vue";

import VideoSection from "./VideoSection.vue";
import ProductCard from "./ProductCard.vue";
import useProductsStore from "@/stores/products";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
  videoId: {
    type: String,
    default: null,
  },
  backgroundColor: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  slug: {
    type: String,
    default: null,
  },
});

const isLoading = ref(false);
const products = reactive([]);
const { getProductsByCollectionId } = useProductsStore();

const API_URL = import.meta.env.VITE_API_URL;

onMounted(() => {
  isLoading.value = true;

  getProductsByCollectionId(props.id).then((data) => {
    products.push(...data);
    isLoading.value = false;
  });
});

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <section :class="$style.container">
    <div :class="$style.header">
      <h2 :class="$style.name">{{ name }}</h2>
      <router-link
        v-if="products.length > 4"
        :class="$style.link"
        :to="`/collection-${slug}`"
      >
        Смотреть все
      </router-link>
    </div>

    <video-section
      v-show="videoId"
      :video-id="videoId"
      :color="backgroundColor"
    />

    <ul v-if="isLoading" :class="$style.productList">
      <product-card
        :is-skeleton="true"
        v-for="index in Array.from({ length: 4 })"
        :key="index"
        :id="index"
        name="Загрузка..."
      />
    </ul>

    <ul v-else :class="$style.productList">
      <product-card
        v-for="product in products.slice(0, 4)"
        :key="product.id"
        :id="product.id"
        :img-url="`${API_URL}/assets/${product.image}`"
        :name="product.name"
      />
    </ul>
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
  padding-block: 9.2rem;
}

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding-inline: 12.8rem;
}

.name {
  font-weight: var.$fw-bold;
  font-size: 2.4rem;
  color: var.$c-accent;
  text-transform: uppercase;
}

.link {
  display: flex;
  align-items: center;
  font-weight: var.$fw-semi;
  font-size: 1.6rem;
  color: var.$c-primary;
  transition: 0.2s color;

  &:hover {
    color: var.$c-accent;
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
  animation: opacity 1s;
}
</style>
