<template>
  <div :class="$style.loader"></div>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.loader {
  width: 4.8rem;
  height: 4.8rem;
  margin: auto;
  position: relative;
}

.loader:before {
  content: "";
  width: 4.8rem;
  height: 0.5rem;
  background: rgba(var.$c-primary, 0.5);
  position: absolute;
  top: 6rem;
  left: 0;
  border-radius: 50%;
  animation: shadow324 0.5s linear infinite;
}

.loader:after {
  content: "";
  width: 100%;
  height: 100%;
  background: var.$c-primary;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.4rem;
  animation: jump7456 0.5s linear infinite;
}

@keyframes jump7456 {
  15% {
    border-bottom-right-radius: 0.3rem;
  }

  25% {
    transform: translateY(0.9rem) rotate(22.5deg);
  }

  50% {
    transform: translateY(1.8rem) scale(1, 0.9) rotate(45deg);
    border-bottom-right-radius: 4rem;
  }

  75% {
    transform: translateY(0.9rem) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow324 {
  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
