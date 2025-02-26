<script setup>
import { computed, ref } from "vue";

import SearchIcon from "@/components/icons/SearchIcon.svg?component";
import ClearIcon from "@/components/icons/ClearIcon.svg?component";
import RootLoader from "./RootLoader.vue";
import ProductCard from "./ProductCard.vue";
import useProductsStore from "@/stores/products";

const text = ref("");
const message = ref("");
const isLoading = ref(false);
const products = ref([]);
const isDisabled = computed(() => text.value.length === 0);
const isProductsLoaded = computed(() => products.value.length > 0);
const { searchProducts } = useProductsStore();

const API_URL = import.meta.env.VITE_API_URL;

const toggleSearch = (e) => {
  e.preventDefault();

  if (text.value.length > 0) {
    message.value = "";
    isLoading.value = true;
    searchProducts(text.value)
      .then((data) => {
        products.value = data;

        if (data.length === 0) {
          message.value = "Ничего не найдено";
        } else {
          message.value = "";
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
};

const handleInput = (e) => {
  text.value = e.target.value;
};

const clearInput = () => {
  text.value = "";
};
</script>

<template>
  <section
    :class="[$style.container, { [$style.paddingBottom]: !isProductsLoaded }]"
  >
    <form :class="$style.form" id="search-section" name="search-section">
      <div :class="$style.inputWrapper">
        <input
          :class="$style.input"
          id="search-input"
          type="search"
          placeholder="Искать"
          :value="text"
          @input="handleInput"
        />
        <button @click="clearInput" v-if="!isDisabled" type="button">
          <clear-icon :class="$style.clearIcon" />
        </button>
      </div>

      <button
        @click="toggleSearch"
        :disabled="isDisabled"
        :class="$style.button"
        type="submit"
      >
        <search-icon :class="$style.icon" />
      </button>
    </form>

    <div v-if="message.length > 0" :class="$style.message">
      <p>{{ message }}</p>
    </div>

    <div :class="$style.loaderWrapper" v-if="isLoading">
      <root-loader />
    </div>

    <ul v-if="isProductsLoaded" :class="$style.productList">
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
  max-height: 90svh;

  animation: opacity 0.5s;
  scrollbar-width: none;
}

.paddingBottom {
  padding-bottom: 4.4rem;
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

.inputWrapper {
  position: relative;
  width: 77rem;
  padding: 2rem;
  border-bottom: 0.2rem solid var.$c-accent;
  flex: 1;

  & > button {
    all: unset;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.5;
    }

    & > .clearIcon {
      stroke: var.$c-accent;
    }
  }
}

.input {
  all: unset;
  font-size: 2.4rem;
  font-weight: var.$fw-semi;
  text-transform: uppercase;
  width: 90%;

  &::placeholder {
    color: var.$c-neutral-2;
  }

  &::-webkit-search-cancel-button {
    display: none;
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

.message {
  text-align: center;
  font-size: 2.4rem;
  color: var.$c-neutral-2;
}

.loaderWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-block: 6.4rem;
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
