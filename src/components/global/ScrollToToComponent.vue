<template>
  <div
    :class="`scroll-to-top-${this.$store.state.theme}-${this.$store.state.scroll_status}`"
    @click="scrollToTop"
  >
    <icon icon="arrow-left" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.scroll-to-top-dark-open {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $font-light;
  background-color: $dark-scroll-top;
  cursor: pointer;
  transition-duration: 0.5s;

  svg {
    transform: rotate(90deg);
  }
}

.scroll-to-top-dark-close {
  @extend .scroll-to-top-dark-open;
  bottom: -10%;
}
// dark

// light
.scroll-to-top-light-open {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  position: fixed;
  right: 10px;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $font-dark;
  background-color: $light-scroll-top;
  cursor: pointer;
  transition-duration: 0.5s;

  svg {
    transform: rotate(90deg);
  }
}

.scroll-to-top-light-close {
  @extend .scroll-to-top-light-open;
  bottom: -10%;
}
// light
</style>
