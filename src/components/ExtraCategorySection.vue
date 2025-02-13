<script setup>
defineProps({
  id: {
    type: String,
    default: null,
  },
  imgId: {
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

const API_URL = import.meta.env.VITE_API_URL;
</script>

<template>
  <router-link :class="$style.link" :to="`/collection-${slug}`">
    <div :class="$style.container">
      <div :class="$style.imageWrapper">
        <img :src="`${API_URL}/assets/${imgId}`" :alt="name" />
      </div>
      <h2 :class="$style.name">{{ name }}</h2>
    </div>
  </router-link>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.link {
  all: unset;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &:hover {
    cursor: pointer;

    & > .imageWrapper {
      & > img {
        transform: scale(1.05);
      }
    }

    & > .name {
      color: var.$c-accent;
    }
  }
}

.imageWrapper {
  height: 61rem;
  overflow: hidden;
  transition: 0.2s opacity;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.2s transform;
  }
}

.name {
  font-weight: var.$fw-bold;
  font-size: 1.8rem;
  padding-inline: 3.2rem;
  text-transform: uppercase;
  transition: 0.2s color;
}
</style>
