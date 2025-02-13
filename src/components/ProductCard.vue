<script setup>
import FavoriteButton from "./FavoriteButton.vue";

defineProps({
  isSkeleton: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: null,
  },
  imgUrl: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <li :class="$style.item">
    <div v-if="!isSkeleton" :class="$style.favorite">
      <favorite-button :id="id" />
    </div>
    <router-link
      :class="$style.container"
      :to="{ path: !isSkeleton ? `/products/${id}` : `/` }"
    >
      <div
        :class="[
          $style.imageWrapper,
          {
            [$style.loader]: isSkeleton,
          },
        ]"
      >
        <img :src="imgUrl" :alt="imgUrl ? name : ''" :class="$style.image" />
      </div>

      <h3
        :class="[
          $style.name,
          {
            [$style.loader]: isSkeleton,
          },
        ]"
      >
        {{ name }}
      </h3>
    </router-link>
  </li>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.item {
  all: unset;
  position: relative;
}

.container {
  all: unset;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  &:hover {
    cursor: pointer;

    & > .imageWrapper {
      background-color: rgba(var.$c-neutral-4, 0.5);
    }

    & > .name {
      color: var.$c-accent;
    }

    & > .loader {
      color: var.$c-neutral-4;
    }
  }
}

.favorite {
  z-index: 100;
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
}

.imageWrapper {
  background-color: var.$c-neutral-4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61rem;
  transition: 0.2s background-color;

  & > img {
    height: 85%;
    object-fit: cover;
  }
}

.name {
  font-weight: var.$fw-bold;
  font-size: 1.8rem;
  padding-inline: 3.2rem;
  text-transform: uppercase;
  transition: 0.2s color;
}

.loader {
  background-color: var.$c-neutral-4;
  color: var.$c-neutral-4;
  animation: skeletonLoading 1s infinite;
}

@keyframes skeletonLoading {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
