<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";

import BurgerButton from "@/components/BurgerButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import RootNav from "@/components/RootNav.vue";
import SearchSection from "@/components/SearchSection.vue";
import SearchIcon from "@/components/icons/SearchIcon.svg?component";

const route = useRoute();
const headerState = reactive({
  isOpenNav: false,
  isOpenSearch: false,
  isAnimating: false,
});

const toggleFeatures = (target, disable = null) => {
  if (!headerState[target] && !headerState.isAnimating) {
    headerState.isAnimating = true;
    setTimeout(() => {
      headerState.isAnimating = false;
    }, 500);
  }
  headerState[target] = !headerState[target];
  if (disable) {
    headerState[disable] = false;
  }
};

const goOnTop = () => {
  if (route.name === "main") {
    window.scrollTo(0, 0);
  }
  closeAllFeatures();
};

const closeAllFeatures = (features = ["isOpenNav", "isOpenSearch"]) => {
  features.forEach((feature) => {
    if (headerState[feature]) {
      headerState[feature] = false;
    }
  });
};
</script>

<template>
  <div :class="$style.wrapper">
    <header
      :class="[
        $style.container,
        {
          [$style.navActive]: headerState.isOpenNav,
          [$style.navInactive]: !headerState.isOpenNav,
          [$style.activeSearch]: headerState.isOpenSearch,
        },
      ]"
    >
      <div :class="$style.headerWrapper">
        <div :class="$style.leftWrapper">
          <burger-button
            :is-open-nav="headerState.isOpenNav"
            @toggle-nav="() => toggleFeatures('isOpenNav', 'isOpenSearch')"
          />
        </div>

        <h1>
          <router-link to="/" @click="goOnTop">
            <logo-icon :is-open-nav="headerState.isOpenNav" />
          </router-link>
        </h1>

        <div :class="$style.rightWrapper">
          <router-link
            to="/favorites"
            @click="() => closeAllFeatures()"
            :class="$style.favorites"
          >
            <heart-icon :is-open-nav="headerState.isOpenNav" />
          </router-link>

          <search-icon
            width="4.7rem"
            height="4.7rem"
            stroke-width="0.65"
            :class="[
              $style.searchIcon,
              {
                [$style.searchIconActive]: headerState.isOpenNav,
              },
            ]"
            @click="() => toggleFeatures('isOpenSearch', 'isOpenNav')"
          />
        </div>
      </div>

      <root-nav
        :is-open-nav="headerState.isOpenNav"
        @toggle-nav="() => toggleFeatures('isOpenNav', 'isOpenSearch')"
      />
    </header>
    <search-section v-if="headerState.isOpenSearch" />
  </div>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.wrapper {
  position: sticky;
  width: 100%;
  z-index: 999;

  display: flex;
  flex-direction: column;
  justify-content: center;

  left: 0;
  top: 0;
}

.container {
  overflow: hidden;
  width: 100%;
  height: 10rem;
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
  padding-block: 1.9rem;
  transition: 0.5s all;
  background-color: var.$c-primary;
}

.navActive {
  height: 100vh;
  background-color: var.$c-accent;

  animation-name: navUpToDown;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.navInactive {
  animation-name: navDownToUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}

.activeSearch {
  background-color: var.$c-background;
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

.leftWrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3.8rem;
  flex: 1;
}

.rightWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3.8rem;
  flex: 1;
}

.searchIcon {
  cursor: pointer;
  transition: stroke 0.5s, transform 0.2s, opacity 0.2s;

  &:hover {
    transform: scale(1.1);
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.9);
    opacity: 0.6;
  }

  stroke: var.$c-accent;
}

.searchIconActive {
  stroke: var.$c-background;
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
