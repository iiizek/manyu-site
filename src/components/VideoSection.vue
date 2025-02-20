<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";

const videoRef = ref(null);
let observer = null;

defineProps({
  videoId: {
    type: String,
    default: null,
  },

  color: {
    type: String,
    default: null,
  },
});

const API_URL = import.meta.env.VITE_API_URL;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef.value?.play();
        } else {
          videoRef.value?.pause();
        }
      });
    },
    { threshold: 0.1 }
  );

  if (videoRef.value) observer.observe(videoRef.value);

  watch(videoRef, (newVal) => {
    if (newVal) observer.observe(newVal);
  });
});

onUnmounted(() => {
  if (observer) observer.disconnect();
});
</script>

<template>
  <section
    :class="[
      $style.container,
      {
        [$style.red]: color === 'red',
        [$style.purple]: color === 'purple',
      },
    ]"
  >
    <video
      v-show="videoId"
      ref="videoRef"
      :class="$style.video"
      autoplay
      muted
      playsinline
      loop
      loading="lazy"
      preload="metadata"
    >
      <source :src="videoId && `${API_URL}/assets/${videoId}`" />
    </video>
  </section>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.container {
  @media (width >= 768px) {
    width: 100%;
    height: 100vh;
  }
}

.red {
  background: url("/red-bg.png") no-repeat;
  background-size: cover;
  background-color: var.$c-accent;
}

.purple {
  background: url("/purple-bg.png") no-repeat;
  background-size: cover;
  background-color: var.$c-primary;
}

.video {
  pointer-events: none;
  height: 100%;
  margin: 0 auto;
  will-change: transform, opacity;
}
</style>
