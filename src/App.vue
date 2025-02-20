<script setup>
import StartScreen from "./components/StartScreen.vue";
import RootLayout from "@/layouts/RootLayout.vue";
</script>

<template>
  <start-screen />
  <root-layout>
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <router-view v-slot="{ Component }" name="modal">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </root-layout>
</template>

<style scoped>
/* Анимация слайда */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Анимация затухания */
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease;
}

.fade-enter-from {
  transform: translateY(100%);
}

.fade-leave-to {
  transform: translateY(100%);
}
</style>
