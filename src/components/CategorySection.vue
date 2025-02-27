<script setup>
import { reactive, onMounted, ref, onUnmounted, watch } from "vue";

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

const sectionRef = ref(null);

const screenWidth = ref(window.innerWidth);
const isLoading = ref(false);
const isManyItems = ref(false);

const allProducts = reactive([]);
const viewedProducts = reactive([]);

const { getProductsByCollectionId } = useProductsStore();

const API_URL = import.meta.env.VITE_API_URL;

const updateViewedProducts = () => {
  let maxItems = 4;

  if (screenWidth.value > 2000) {
    if (screenWidth.value <= 3000) {
      maxItems = 5;
    } else {
      maxItems = 6;
    }
  } else if (screenWidth.value < 1200 && screenWidth.value >= 768) {
    maxItems = 3;
  } else if (screenWidth.value < 768) {
    maxItems = 3;
  }

  isManyItems.value = allProducts.length > maxItems;
  viewedProducts.splice(0, viewedProducts.length);
  viewedProducts.push(...allProducts.slice(0, maxItems));
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  isLoading.value = true;

  if (sessionStorage.getItem(`${props.slug}`)) {
    allProducts.push(...JSON.parse(sessionStorage.getItem(`${props.slug}`)));
    updateViewedProducts();
    isLoading.value = false;
  } else {
    getProductsByCollectionId(props.id)
      .then((data) => {
        allProducts.push(...data);
        sessionStorage.setItem(`${props.slug}`, JSON.stringify(allProducts));
        updateViewedProducts();
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  window.addEventListener("resize", handleResize);
});

watch(screenWidth, () => {
  updateViewedProducts();
});

onUnmounted(() => {
  isLoading.value = false;
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <section ref="sectionRef" :class="$style.container">
    <div :class="$style.header">
      <h2 :class="$style.name">{{ name }}</h2>
      <router-link
        v-if="isManyItems"
        :class="$style.link"
        :to="`/collections/${slug}`"
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
        v-for="product in viewedProducts"
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

  @media (width < 768px) {
    padding-inline: 3.8rem;
    align-items: center;
  }
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

  @media (width < 768px) {
    font-size: 2rem;
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

  @media (width < 768px) {
    display: grid;
    grid-template-columns: none;
    grid-auto-flow: column;

    width: 100%;
    min-width: 0;

    overflow-x: auto;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    scrollbar-width: none;

    & > li {
      width: 45rem;
      scroll-snap-align: center;
    }
  }
}
</style>
