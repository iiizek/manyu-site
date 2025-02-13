<script setup>
import { onMounted, watch, ref } from "vue";
import HeartIcon from "./icons/HeartIcon.vue";
import useFavoritesStore from "@/stores/favorites";

const props = defineProps({
  id: {
    type: String,
    default: null,
  },
});

const { favorites, toggleFavorite } = useFavoritesStore();
const isFavorite = ref(false);

onMounted(() => {
  isFavorite.value = favorites.includes(props.id);
});

watch(favorites, () => {
  isFavorite.value = favorites.includes(props.id);
});
</script>

<template>
  <button @click="() => toggleFavorite(id)" :class="$style.button">
    <heart-icon width="2.817rem" height="2.481rem" :is-active="isFavorite" />
  </button>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.button {
  all: unset;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.9);
    opacity: 0.6;
  }
}
</style>
