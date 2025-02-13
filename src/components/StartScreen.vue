<script setup>
import LogoIcon from "./icons/LogoIcon.vue";
</script>

<template>
  <div :class="$style.container">
    <div :class="$style.logo">
      <logo-icon />
    </div>
    <div :class="$style.slider"></div>
  </div>
</template>

<style module lang="scss">
@use "@/assets/variables.scss" as var;

.container {
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var.$c-primary;
  background: url("/purple-bg.jpg") no-repeat;
  background-size: cover;

  animation: slideToTop 1.5s 5s linear forwards;
}

.slider {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(var.$c-primary, 0) 0%,
    var.$c-primary 10%
  );
  transform: skew(-30deg, 0deg) scaleX(1.5);
  animation: slideRightToLeft 3s linear forwards;
  animation-delay: 0.5s;
}

.logo {
  visibility: hidden;
  animation: popLogo 0s linear forwards;
  animation-delay: 3.5s;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1.5);
}

@keyframes slideRightToLeft {
  from {
    transform: skew(-30deg, 0deg) scaleX(1.5);
    transform: translateX(0);
  }
  to {
    transform: skew(0deg, 0deg) scaleX(1.5);
    transform: translateX(100%);
  }
}

@keyframes popLogo {
  from {
    visibility: hidden;
  }
  to {
    visibility: visible;
  }
}

@keyframes slideToTop {
  from {
    transform: translateY(0) scaleY(1);
  }
  to {
    transform: translateY(-100%) scaleY(0.5);
  }
}
</style>
