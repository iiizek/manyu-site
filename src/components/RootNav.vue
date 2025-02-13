<script setup>
import { onMounted } from "vue";
import useCategoriesStore from "@/stores/categories";

defineProps({
  isShowing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-nav"]);

const {
  topCollection,
  baseCollections,
  extraCollections,
  getBaseCollections,
  getExtraCollections,
  getTopCollection,
} = useCategoriesStore();

onMounted(() => {
  getTopCollection();
  getBaseCollections();
  getExtraCollections();
});
</script>

<template>
  <nav v-show="isShowing" :class="$style.nav">
    <ul :class="$style.navList">
      <li :class="$style.navItem">
        <router-link
          :class="$style.navLink"
          @click="emit('toggle-nav')"
          :to="`/collection-${topCollection.slug}`"
        >
          {{ topCollection.name }}
        </router-link>
      </li>

      <li
        v-for="collection in baseCollections"
        :key="collection.id"
        :class="$style.navItem"
      >
        <router-link
          :class="$style.navLink"
          @click="emit('toggle-nav')"
          :to="`/collection-${collection.slug}`"
        >
          {{ collection.name }}
        </router-link>
      </li>

      <li
        v-for="collection in extraCollections"
        :key="collection.id"
        :class="$style.navItem"
      >
        <router-link
          @click="emit('toggle-nav')"
          :class="$style.navLink"
          :to="`/collection-${collection.slug}`"
        >
          {{ collection.name }}
        </router-link>
      </li>

      <li :class="$style.navItem">
        <router-link
          :class="$style.navLink"
          @click="emit('toggle-nav')"
          to="/about"
        >
          О бренде
        </router-link>
      </li>
    </ul>
    <div :class="$style.navFade"></div>
  </nav>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.nav {
  position: relative;
  height: 90%;
}

.navFade {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15.2rem;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var.$c-accent 75%);

  animation-name: navListOpacity;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.navList {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  display: grid;
  gap: 5.2rem;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: min-content;
  list-style-type: none;
  padding-inline: 13.8rem;
  padding-top: 7.6rem;
  padding-bottom: 15.2rem;

  animation-name: navListOpacity;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.navItem {
  font-weight: var.$fw-bold;
  font-size: 4.4rem;
}

.navLink {
  text-decoration: none;
  color: var.$c-background;
  transition: 0.2s all;
  text-transform: uppercase;
  text-wrap: wrap;

  &:hover {
    color: var.$c-neutral-2;
  }
}

@keyframes navListOpacity {
  0% {
    display: none;
    opacity: 0;
  }
  50% {
    display: grid;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
