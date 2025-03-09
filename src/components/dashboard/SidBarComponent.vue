<template>
  <div
    :class="`sid-bar-${this.$store.state.theme}-${this.$store.state.sid_bar_status}`"
  >
    <icon
      icon="arrow-right"
      @click="this.$store.commit('ChangeSidBarStatus')"
    />

    <ul>
      <li
        @click="this.$store.commit('ChangeSidBarStatus')"
        v-for="(link, index) in this.$store.state.dash_board_links_path"
        :key="index"
      >
        <router-link :to="link.path">
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  date() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.sid-bar-dark-open {
  width: 20%;
  height: 98vh;
  position: fixed;
  z-index: 50;
  left: 5px;
  top: 1vh;
  border-radius: 5px;
  backdrop-filter: blur(30px);
  transition-duration: 0.5s;

  svg {
    padding: 10px;
    border-radius: 3px;
    background-color: $menu-dark;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    transition-duration: 0.5s;
    transform: rotate(180deg);
  }

  @media (max-width: $phone) {
    width: 40%;
  }

  @media (min-width: $x-large-display) {
    width: 10%;
  }

  ul {
    width: 100%;
    height: auto;
    margin: 25% 0% 20% 0%;

    @media (max-width: $phone) {
      margin: 40% 0% 20% 0%;
    }

    li {
      list-style-type: none;
      width: 98%;
      height: 40px;
      margin: 5px 1%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      a {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        padding: 0px 5px;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        color: $font-light;
        transition-duration: 0.5s;
      }

      a:hover {
        background-color: $menu-item-dark;
        text-decoration: underline;
      }
    }
  }
}

.sid-bar-dark-close {
  @extend .sid-bar-dark-open;
  left: -30%;
  width: 25%;

  svg {
    padding: 10px;
    border-radius: 3px;
    background-color: $menu-dark;
    cursor: pointer;
    position: absolute;
    right: -35%;
    top: 5px;
    transform: rotate(0deg);

    @media (max-width: $phone) {
      right: -70%;
    }

    @media (min-width: $x-large-display) {
      width: -20%;
    }
  }
}
// dark

// light
.sid-bar-light-open {
  width: 20%;
  height: 98vh;
  position: fixed;
  z-index: 50;
  left: 5px;
  top: 1vh;
  border-radius: 5px;
  backdrop-filter: blur(30px);
  transition-duration: 0.5s;

  svg {
    padding: 10px;
    border-radius: 3px;
    background-color: $menu-light;
    color: $font-dark;
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 5px;
    transition-duration: 0.5s;
    transform: rotate(180deg);
  }

  @media (max-width: $phone) {
    width: 40%;
  }

  @media (min-width: $x-large-display) {
    width: 10%;
  }

  ul {
    width: 100%;
    height: auto;
    margin: 25% 0% 20% 0%;

    @media (max-width: $phone) {
      margin: 40% 0% 20% 0%;
    }

    li {
      list-style-type: none;
      width: 98%;
      height: 40px;
      margin: 5px 1%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: center;

      a {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        padding: 0px 5px;
        display: flex;
        justify-content: start;
        align-items: center;
        text-decoration: none;
        color: $font-dark;
        transition-duration: 0.5s;
      }

      a:hover {
        background-color: $menu-item-light;
        text-decoration: underline;
      }
    }
  }
}

.sid-bar-light-close {
  @extend .sid-bar-light-open;
  left: -30%;
  width: 25%;

  svg {
    padding: 10px;
    border-radius: 3px;
    background-color: $menu-light;
    cursor: pointer;
    position: absolute;
    right: -35%;
    top: 5px;
    transform: rotate(0deg);

    @media (max-width: $phone) {
      right: -70%;
    }

    @media (min-width: $x-large-display) {
      width: -20%;
    }
  }
}
// light
</style>
