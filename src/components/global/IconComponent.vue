<template>
  <div :class="`add-appointment-${this.$store.state.theme}`">
    <router-link to="/appointment"><icon icon="plus" /></router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.add-appointment-dark {
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 50%;
  position: fixed;
  left: 20px;
  bottom: 20px;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;

  a {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $boold-blue;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;

    svg {
      background-color: none;
    }
  }
}

.add-appointment-dark:hover {
  background-color: $boold-blue-2;
  box-shadow: 0 0 10px $boold-blue;

  a {
    transform: scale(0.9);
    background-color: $boold-blue-3;
  }
}
// dark

// light
.add-appointment-light {
  width: auto;
  height: auto;
  padding: 10px;
  border-radius: 50%;
  position: fixed;
  left: 20px;
  bottom: 20px;
  transition-duration: 0.5s;
  display: flex;
  flex-wrap: wrap;

  a {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: $boold-blue;
    color: $font-dark;
    display: flex;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;

    svg {
      background-color: none;
    }
  }
}

.add-appointment-light:hover {
  background-color: $boold-blue-2;
  box-shadow: 0 0 10px $boold-blue;

  a {
    transform: scale(0.9);
    background-color: $boold-blue-3;
  }
}
// light
</style>
