<script setup>
defineProps({
  isOpenNav: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle-nav"]);
</script>

<template>
  <div :class="$style.hamburger">
    <input
      :checked="isOpenNav"
      @change="emit('toggle-nav')"
      :class="$style.checkbox"
      type="checkbox"
    />
    <svg fill="none" viewBox="0 0 50 50" height="4.8rem" width="4.8rem">
      <path
        :class="[$style.line, $style.lineTop, $style.black]"
        stroke-width="4"
        d="M6 11L43 11"
      ></path>
      <path
        stroke-width="4"
        stroke="black"
        d="M6 24H43"
        :class="[$style.line, $style.lineMid]"
      ></path>
      <path
        stroke-width="4"
        stroke="black"
        d="M6 37H43"
        :class="[$style.line, $style.lineBottom]"
      ></path>
    </svg>
  </div>
</template>

<style lang="scss" module>
@use "../assets/variables" as var;

.hamburger {
  transform: 0.2s;
  position: relative;
}
.hamburger .checkbox {
  position: absolute;
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.line {
  transition: 0.5s;
  stroke-width: 3px;
  stroke: var.$c-accent;
}
.lineTop {
  stroke-dasharray: 40 40;
}
.lineBottom {
  stroke-dasharray: 40 40;
}
.lineMid {
  stroke-dasharray: 40 40;
}
.hamburger .checkbox:checked + svg .line {
  stroke: var.$c-background;
}
.hamburger .checkbox:checked + svg .lineTop {
  stroke-dashoffset: 0;
  transform-origin: left;
  transform: rotateZ(45deg) translate(-8px, -5px);
}
.hamburger .checkbox:checked + svg .lineMid {
  stroke-dashoffset: 40;
}
.hamburger .checkbox:checked + svg .lineBottom {
  stroke-dashoffset: 0;
  transform-origin: left;
  transform: rotateZ(-45deg) translate(-5px, 5px);
}
</style>
