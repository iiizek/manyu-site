<template>
  <footer :class="$style.container">
    <router-link :class="$style.link" to="/about">
      <h2 :class="$style.title">О бренде</h2>
    </router-link>

    <p :class="$style.text">
      MANYU | Since 2020 concept basic clothing<br />OWN PREMIUM PRODUCTION FROM
      DAGESTAN.
    </p>
  </footer>
</template>

<style module lang="scss">
@use "@/assets/variables" as var;

.container {
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
</style>
