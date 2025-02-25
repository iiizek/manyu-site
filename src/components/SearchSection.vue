<script setup>
import { computed, ref } from "vue";

import SearchIcon from "@/components/icons/SearchIcon.svg?component";
import ProductCard from "./ProductCard.vue";
import useProductsStore from "@/stores/products";

const text = ref("");
const products = ref([]);
const isDisabled = computed(() => text.value.length === 0);
const { searchProducts } = useProductsStore();

const API_URL = import.meta.env.VITE_API_URL;

const toggleSearch = (e) => {
  e.preventDefault();

  if (text.value.length > 0) {
    searchProducts(text.value).then((data) => {
      console.log(data);
      products.value = data;
    });
  }
};

const handleInput = (e) => {
  text.value = e.target.value;
};
</script>

<template>
  <section :class="$style.container">
    <form :class="$style.form" id="search-section" name="search-section">
      <input
        :class="$style.input"
        id="search-input"
        placeholder="Искать"
        type="search"
        :value="text"
        @input="handleInput"
      />
      <button
        @click="toggleSearch"
        :disabled="isDisabled"
        :class="$style.button"
        type="submit"
      >
        <search-icon :class="$style.icon" />
      </button>
    </form>

    <ul :class="$style.productList">
      <product-card
        v-for="product in products"
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

.container {
  z-index: 998;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var.$c-background;
  transition: 0.5s all;
  gap: 2.2rem;
  max-height: 90vh;

  animation: opacity 0.5s;
  scrollbar-width: none;
}

.form {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  align-self: center;
  position: relative;
  gap: 2rem;
  padding-inline: 3.6rem;
  padding-block: 3.6rem;
  @media (width < 768px) {
    width: 100%;
  }
}

.input {
  all: unset;
  flex: 1;
  font-size: 2.4rem;
  font-weight: var.$fw-semi;
  text-transform: uppercase;
  width: 77rem;
  padding: 2rem;
  border-bottom: 0.2rem solid var.$c-accent;

  &::placeholder {
    color: var.$c-neutral-2;
  }

  @media (width < 768px) {
    width: 100%;
  }
}

.button {
  all: unset;
  cursor: pointer;
  background-color: var.$c-accent;
  padding: 0.4rem;
  width: 5.8rem;
  height: 5.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.icon {
  stroke: var.$c-background;
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

  overflow: auto;
  scrollbar-width: none;

  padding-bottom: 4.4rem;

  @media (width < 768px) {
    row-gap: 6.4rem;
  }
}

@keyframes opacity {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
