<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import BurgerButton from "@/components/BurgerButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import RootNav from "@/components/RootNav.vue";

const isFirstRender = ref(true);
const isOpenNav = ref(false);
const isAnimating = ref(false);

const route = useRoute();

const toggleNav = () => {
  if (isFirstRender.value) {
    isFirstRender.value = false;
  }
  if (!isOpenNav.value) {
    isAnimating.value = true;
    setTimeout(() => {
      isAnimating.value = false;
    }, 500);
  }
  isOpenNav.value = !isOpenNav.value;
};

const goOnTop = () => {
  if (route.path === "/") {
    window.scrollTo(0, 0);
  }
};
</script>

<template>
  <header
    :class="[
      $style.container,
      {
        [$style.active]: isOpenNav,
        [$style.inactive]: !isOpenNav,
        [$style.noAnimation]: isFirstRender,
      },
    ]"
  >
    <div :class="$style.headerWrapper">
      <burger-button :is-open-nav="isOpenNav" @toggle-nav="toggleNav" />

      <h1>
        <router-link to="/" @click="goOnTop">
          <logo-icon :is-open-nav="isOpenNav" />
        </router-link>
      </h1>

      <router-link to="/favorites" :class="$style.favorites">
        <heart-icon :is-open-nav="isOpenNav" />
      </router-link>
    </div>

    <root-nav @toggle-nav="toggleNav" :is-showing="isAnimating || isOpenNav" />
  </header>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.container {
  overflow: hidden;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 10rem;
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
  padding-block: 1.9rem;
}

.active {
  height: 100vh;
  background-color: var.$c-accent;
  transition: 0.5s all;

  animation-name: navUpToDown;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.inactive {
  background-color: var.$c-primary;
  transition: 0.5s all;

  animation-name: navDownToUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.noAnimation {
  animation: none !important;
  transition: none !important;
}

.headerWrapper {
  padding-inline: 3.8rem;
  height: initial;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorites {
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

@keyframes navUpToDown {
  0% {
    height: 10rem;
  }
  100% {
    height: 100vh;
  }
}

@keyframes navDownToUp {
  0% {
    height: 100vh;
  }
  100% {
    height: 10rem;
  }
}
</style>
