<script setup>
import { onMounted, reactive, watch, ref, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";

import RootLoader from "./RootLoader.vue";
import FavoriteButton from "./FavoriteButton.vue";
import useProductsStore from "@/stores/products";

const { getProductById, sizes, getSizes } = useProductsStore();

const chosenImage = ref(null);
const isLoading = ref(false);
const product = reactive({});
const router = useRouter();
const route = useRoute();

const close = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    router.push("/");
  }
};

const handleChosePhoto = (imageId) => {
  chosenImage.value = imageId;
};

const API_URL = import.meta.env.VITE_API_URL;

onMounted(async () => {
  isLoading.value = true;

  getProductById(route.params.productId).then((data) => {
    Object.assign(product, data);
    chosenImage.value = product.images[0].directus_files_id;
    isLoading.value = false;
  });

  getSizes();
});

watch(
  () => route.params.productId,
  async (newId) => {
    isLoading.value = true;
    await getProductById(newId).then((data) => {
      Object.assign(product, data);
      chosenImage.value = product.images[0].directus_files_id;
      isLoading.value = false;
    });
  }
);

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div :class="$style.backdrop" @click.self="close">
    <div :class="$style.container">
      <div :class="$style.loaderContainer" v-if="isLoading">
        <root-loader />
      </div>
      <div v-if="!isLoading" :class="$style.gallery">
        <div :class="$style.scrollable">
          <div
            v-for="image in product.images"
            :key="image.directus_files_id"
            @mouseover="handleChosePhoto(image.directus_files_id)"
            :class="[
              { [$style.active]: chosenImage === image.directus_files_id },
              $style.image,
            ]"
          >
            <img
              :src="`${API_URL}/assets/${image.directus_files_id}`"
              alt="Прикрепленная фотография к изделию"
            />
          </div>
        </div>
        <div :class="$style.chosenImage">
          <img
            :src="`${API_URL}/assets/${chosenImage}`"
            alt="Прикрепленная фотография к изделию"
          />
        </div>
      </div>

      <div v-if="!isLoading" :class="$style.info">
        <div :class="$style.header">
          <h2>{{ product.name }}</h2>
          <button @click="close">X</button>
        </div>

        <div :class="$style.sizes">
          <h3>Размеры</h3>
          <ul>
            <li
              :class="$style.sizesItem"
              v-for="size in product.sizes"
              :key="size.sizes_id.id"
              :title="`RU размер: ${size.sizes_id.ru_size}\nEU размер: ${size.sizes_id.main_size}\nОхват груди: ${size.sizes_id.waist}\nОхват талии: ${size.sizes_id.hip}\nОхват бедер: ${size.sizes_id.chest}`"
            >
              {{ size.sizes_id.main_size }}
              <span> / </span>
              {{ size.sizes_id.ru_size }}
            </li>
          </ul>
        </div>

        <div :class="$style.colors">
          <h3>Цвета</h3>
          <ul>
            <li
              :class="$style.colorsItem"
              v-for="color in product.colors"
              :key="color.colors_id.id"
              :style="`background-color: ${color.colors_id.color};`"
              :title="color.colors_id.name"
            />
          </ul>
        </div>

        <div :class="$style.cost">
          <span>{{
            new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(product.cost)
          }}</span>
          <favorite-button :id="route.params.productId" />
        </div>

        <div :class="$style.details">
          <details name="product-details">
            <summary>Состав и уход</summary>
            <div
              :class="$style.richContainer"
              v-html="product.composition"
            ></div>
          </details>

          <details name="product-details">
            <summary>Описание</summary>
            <div
              :class="$style.richContainer"
              v-html="product.description"
            ></div>
          </details>

          <details name="product-details">
            <summary>Размерный ряд</summary>
            <ul :class="$style.sizeRange">
              <li v-for="size in sizes" :key="size.id">
                <span>{{ size.ru_size }}</span>
                <span>{{ size.main_size }}</span>
                <span>{{ size.waist }}</span>
                <span>{{ size.hip }}</span>
                <span>{{ size.chest }}</span>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation-delay: 0.5s;
  z-index: 1000;
}

@keyframes backdropOpacity {
  from {
    background-color: rgba(var.$c-text, 0);
  }
  to {
    background-color: rgba(var.$c-text, 0.5);
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

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var.$c-background;
  box-shadow: 0 0.4rem 2.9rem rgba(var.$c-text, 0.25);
  color: var.$c-text;
  padding: 4.4rem;

  width: 95vw;
  height: 95vh;

  display: flex;
  justify-content: stretch;
  gap: 4.4rem;
}

.loaderContainer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.gallery {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 4.4rem;
  animation: opacity 0.5s;
}

.scrollable {
  display: flex;
  flex-direction: column;
  gap: 4.4rem;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
}

.image {
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var.$c-neutral-4;
  border: 0.2rem solid var.$c-neutral-4;
  scroll-snap-align: start;

  width: 16.8rem;
  height: 22.4rem;

  transition: 0.2s border;

  & > img {
    height: 85%;
    object-fit: cover;
  }
}

.active {
  border: 0.2rem solid var.$c-accent;
}

.chosenImage {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var.$c-neutral-4;
  overflow: hidden;

  width: 55.5rem;

  & > img {
    height: 85%;
    object-fit: cover;
  }
}

.info {
  min-width: stretch;
  flex-direction: column;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  animation: opacity 0.2s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4.4rem;
  text-transform: uppercase;
  padding-bottom: 2.2rem;

  & > h2 {
    font-size: 2.4rem;
    font-weight: var.$fw-bold;
    color: var.$c-neutral-1;
  }

  & > button {
    all: unset;
    cursor: pointer;
    font-size: 2.4rem;
    color: var.$c-primary;
    font-weight: var.$fw-bold;
    text-decoration: underline;
    transition: 0.2s color;

    &:hover {
      color: var.$c-accent;
    }
  }
}

.sizes,
.colors {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 1.6rem;
  width: stretch;

  & > h3 {
    font-size: 1.4rem;
    font-weight: var.$fw-bold;
    color: var.$c-neutral-2;
    text-transform: uppercase;
  }

  & > ul {
    all: unset;
    display: flex;
    gap: 1.6rem;
    width: 100%;
    white-space: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: thin;
    padding-bottom: 1.6rem;
    margin-bottom: 1.6rem;

    & > .sizesItem {
      all: unset;
      scroll-snap-align: start;
      border: 0.1rem solid var.$c-primary;
      border-radius: 0.8rem;
      padding: 1.4rem;
      font-size: 1.8rem;
      font-weight: var.$fw-bold;
      color: var.$c-neutral-1;
      text-wrap: nowrap;

      & > span {
        color: var.$c-primary;
      }
    }

    & > .colorsItem {
      all: unset;
      scroll-snap-align: start;
      border: 0.1rem solid var.$c-primary;
      border-radius: 0.8rem;
      text-wrap: nowrap;
      width: 5rem;
      height: 5rem;
    }
  }
}

.cost {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 2.2rem;
  padding-bottom: 2.2rem;
  margin-bottom: 2.2rem;
  border-bottom: 0.1rem solid var.$c-primary;

  & > span {
    font-size: 2.4rem;
    font-weight: var.$fw-bold;
    color: var.$c-neutral-1;
  }
}

.details {
  display: flex;
  flex-direction: column;
  gap: 2.2rem;

  & > details {
    padding-bottom: 2.2rem;
    border-bottom: 0.1rem solid var.$c-primary;

    & > summary {
      font-size: 1.8rem;
      font-weight: var.$fw-regular;
      color: var.$c-neutral-1;
      text-transform: uppercase;
      cursor: pointer;
      list-style-type: none;
      transition: 0.2s color;

      &:hover {
        color: var.$c-accent;
      }
    }

    &[open] > summary {
      color: var.$c-accent;
    }

    & > .richContainer {
      margin-top: 3rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      & > p {
        font-size: 1.8rem;
        font-weight: var.$fw-regular;
        color: var.$c-neutral-1;
      }

      & > ol,
      li {
        font-size: 1.8rem;
        font-weight: var.$fw-regular;
        color: var.$c-neutral-1;
      }
    }

    & > .sizeRange {
      margin-top: 3rem !important;
      all: unset;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 5.1rem;
      row-gap: 1.2rem;

      & > li {
        all: unset;
        display: grid;
        gap: 1.2rem;
        grid-template-columns: repeat(5, 1fr);
        font-size: 1.8rem;
        font-weight: var.$fw-regular;
        color: var.$c-neutral-1;

        & > span {
          text-align: center;
          border: 0.1rem solid var.$c-primary;
          border-radius: 0.8rem;
          padding: 0.8rem;
        }
      }
    }
  }
}
</style>
