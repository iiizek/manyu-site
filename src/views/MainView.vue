<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useHead } from "@unhead/vue";

import RootLoader from "@/components/RootLoader.vue";
import VideoSection from "@/components/VideoSection.vue";
import CategorySection from "@/components/CategorySection.vue";
import ExtraCategorySection from "@/components/ExtraCategorySection.vue";
import useContentStore from "@/stores/content";
import useCategoriesStore from "@/stores/categories";

const isLoading = ref(false);

const { topVideoSection, videoSections, getTopVideo, getVideoSections } =
  useContentStore();
const { baseCollections, extraCollections, topCollection } =
  useCategoriesStore();

const isTopVideoLoaded = computed(
  () => Object.keys(topVideoSection).length > 0
);
const isTopCollectionLoaded = computed(
  () => Object.keys(topCollection).length > 0
);

useHead({
  meta: [
    {
      name: "description",
      content: "Главная страница",
    },
  ],
});

onMounted(() => {
  isLoading.value = true;
  Promise.all([getTopVideo(), getVideoSections()]).then(() => {
    isLoading.value = false;
  });
});

onUnmounted(() => {
  isLoading.value = false;
});
</script>

<template>
  <div>
    <div v-if="isLoading" :class="$style.loadingWrapper">
      <root-loader />
    </div>
    <div v-else :class="$style.container">
      <video-section
        v-if="isTopVideoLoaded"
        :color="topVideoSection.background_color"
        :video-id="topVideoSection.video.id"
      />

      <category-section
        v-if="isTopCollectionLoaded"
        :id="topCollection.id"
        :video-id="topCollection.video?.id"
        :background-color="topCollection.background_color"
        :name="topCollection.name"
        :slug="topCollection.slug"
      />

      <video-section
        v-for="videoSection in videoSections"
        :key="videoSection.video.id"
        :color="videoSection.background_color"
        :video-id="videoSection.video.id"
      />

      <category-section
        v-for="collection in baseCollections"
        :key="collection.id"
        :id="collection.id"
        :video-id="collection.video?.id"
        :background-color="collection.background_color"
        :name="collection.name"
        :slug="collection.slug"
      />

      <section :class="$style.extra">
        <extra-category-section
          v-for="collection in extraCollections"
          :key="collection.id"
          :id="collection.id"
          :img-id="collection.extra_image.id"
          :name="collection.name"
          :slug="collection.slug"
        />
      </section>
    </div>
  </div>
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

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  animation: opacity 1s;
}

.extra {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  padding-inline: 3.6rem;
  padding-block: 9.2rem;
}
</style>
