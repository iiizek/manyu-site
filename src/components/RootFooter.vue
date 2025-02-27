<script setup>
import MapIcon from "@/components/icons/MapIcon.svg?component";
import PhoneIcon from "@/components/icons/PhoneIcon.svg?component";
</script>

<template>
  <footer :class="$style.container">
    <router-link :class="$style.link" to="/about">
      <h2 :class="$style.title">О бренде</h2>
    </router-link>

    <p :class="$style.text">
      MANYU | Since 2020 concept basic clothing<br />OWN PREMIUM PRODUCTION FROM
      DAGESTAN.
    </p>

    <p :class="[$style.text, $style.links]">
      <a href="tel:+79285665046" target="_blank"
        ><phone-icon /> +7 (928) 566 50-46</a
      >
      <a href="geo://42.974373,47.496283" target="_blank"
        ><map-icon /> г. Махачкала, ул. Абубакарова, 48</a
      >
    </p>
  </footer>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.container {
  background-color: var.$c-background;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 5rem;
  padding: 4.5rem 9rem;

  @media (width < 768px) {
    padding: 4.5rem 3.6rem;
  }
}

.link {
  all: unset;
  display: inline-block;
  cursor: pointer;

  &:hover {
    & > .title {
      color: var.$c-primary;
    }
  }
}

.title {
  font-weight: var.$fw-bold;
  font-size: 2.4rem;
  color: var.$c-accent;
  text-transform: uppercase;
  transition: 0.2s color;
}

.text {
  font-weight: var.$fw-regular;
  font-size: 2.4rem;
  color: var.$c-neutral-3;
}

.links {
  display: flex;
  gap: 2.5rem;

  @media (width < 768px) {
    flex-direction: column;
  }

  & > a {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    font-weight: var.$fw-regular;
    font-size: 2.4rem;
    color: var.$c-neutral-2;
    text-decoration: none;
    transition: 0.2s color;

    &:hover {
      color: var.$c-accent;
      text-decoration: underline;
    }
  }
}
</style>
