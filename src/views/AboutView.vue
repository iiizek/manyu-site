<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useSeoMeta } from "@unhead/vue";

import useContentStore from "@/stores/content";
import RootLoader from "@/components/RootLoader.vue";
import PurpleLogoIcon from "@/components/icons/PurpleLogoIcon.vue";

const { getAboutContent } = useContentStore();

const isLoading = ref(false);
const content = ref("");

onMounted(async () => {
  window.scrollTo(0, 0);
  isLoading.value = true;
  const data = await getAboutContent();
  if (data) {
    content.value = data;
  }
  isLoading.value = false;
});

onUnmounted(() => {
  isLoading.value = false;
});

useSeoMeta({
  title:
    "MANYU | О бренде | Own Premium Production From Dagestan since 2020. Concept basic clothing",
});
</script>

<template>
  <section :class="$style.wrapper">
    <div v-if="isLoading" :class="$style.loadingWrapper">
      <root-loader />
    </div>
    <div v-else :class="$style.container">
      <h2 :class="$style.title">О бренде</h2>
      <div :class="$style.content" v-html="content"></div>
    </div>

    <div :class="$style.svg"><purple-logo-icon /></div>
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

.wrapper {
  background: var.$c-primary url("/purple-bg.webp");
  position: relative;
  min-height: 100vh;
  width: 100%;

  & > .svg {
    z-index: 1;
    position: fixed;
    bottom: 0;
    right: 0;
  }
}

.loadingWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  z-index: 2;
  position: relative;
  justify-content: flex-start;
  background-size: cover;
  padding: 9rem 13rem;
  animation: opacity 1s;

  @media (width < 768px) {
    padding: 9rem 6rem;
  }
}

.title {
  color: var.$c-accent;
  font-size: 2.4rem;
  text-transform: uppercase;
  font-weight: var.$fw-semi;
  margin-bottom: 2.4rem;

  @media (width < 1200px) {
    font-size: 3.2rem;
  }
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 92rem;

  @media (width < 1200px) {
    width: 100%;
  }

  & > p {
    font-size: 1.8rem;
    color: var.$c-neutral-1;

    @media (width < 1200px) {
      font-size: 2.4rem;
    }

    & > em {
      font-style: italic;
      color: var.$c-accent;
    }

    & > strong {
      font-weight: var.$fw-semi;
      color: var.$c-accent;
    }

    & > a {
      color: var.$c-accent;
      text-decoration: underline;
      transition: 0.2s opacity;

      &:hover {
        opacity: 0.5;
      }
    }
  }
  & > ol,
  ul {
    padding-inline: 4em;

    & > li {
      font-size: 1.8rem;
      color: var.$c-neutral-1;
    }
  }

  ul {
    list-style: none;

    & > li::before {
      content: "•";
      color: var.$c-accent;
      display: inline-block;
      margin-left: -1em;
      margin-inline-end: 0.5em;
    }
  }

  ol {
    list-style: none;

    & > li {
      padding-left: 0.2em;
      counter-increment: item;
      position: relative;
      font-size: 1.8rem;
      color: var.$c-neutral-1;

      &::before {
        content: counter(item) ".";
        position: absolute;
        left: -1em;
        color: var.$c-accent;
      }
    }
  }

  & > h3 {
    font-size: 2.2rem;
    font-weight: var.$fw-semi;
    color: var.$c-accent;
  }
}
</style>
