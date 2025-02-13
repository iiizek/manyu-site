<script setup>
import { onMounted } from "vue";
import RootHeader from "@/components/RootHeader.vue";
import RootFooter from "@/components/RootFooter.vue";
import useFavoritesStore from "@/stores/favorites";

const { getFavorites } = useFavoritesStore();

onMounted(() => {
  getFavorites();
});
</script>

<template>
  <root-header />
  <main :class="$style.container">
    <slot />
  </main>
  <root-footer v-show="$route.name !== 'about'" />
</template>

<style module lang="scss">
.container {
  flex: 1;
}
</style>
