<template>
  <nav :class="`nav-${this.$store.state.theme}`">
    <a href="/">
      <img src="../../assets/dentist-logo.png" alt="" />
    </a>

    <ul v-if="!this.$store.state.current_user">
      <router-link
        v-for="(link, index) in this.$store.state.links_path.slice(0, -2)"
        :key="index"
        :to="link.path"
      >
        {{ link.title }}
      </router-link>

      <div class="theme-icon" @click="this.$store.commit('ChangeTheme')">
        <icon :icon="this.$store.state.theme == 'dark' ? 'sun' : 'moon'" />
      </div>

      <div class="bars-icon" @click="this.$store.commit('ChangeMenuStatus')">
        <icon icon="bars" />
      </div>
    </ul>

    <ul v-else>
      <router-link
        v-for="(link, index) in this.$store.state.links_path"
        :key="index"
        :to="link.path"
        :id="
          this.$store.state.current_user &&
          link.condition.includes(this.$store.state.current_user.account_type)
            ? 'show'
            : 'hidde'
        "
      >
        {{ link.title }}
      </router-link>

      <div class="theme-icon" @click="this.$store.commit('ChangeTheme')">
        <icon :icon="this.$store.state.theme == 'dark' ? 'sun' : 'moon'" />
      </div>

      <div class="bars-icon" @click="this.$store.commit('ChangeMenuStatus')">
        <icon icon="bars" />
      </div>
    </ul>

    <div
      :class="`menu-${this.$store.state.menu_status}`"
      v-if="!this.$store.state.current_user"
    >
      <router-link
        @click="this.$store.commit('ChangeMenuStatus')"
        v-for="(link, index) in this.$store.state.links_path.slice(0, -2)"
        :key="index"
        :to="link.path"
      >
        {{ link.title }}
      </router-link>
    </div>

    <div :class="`menu-${this.$store.state.menu_status}`" v-else>
      <router-link
        @click="this.$store.commit('ChangeMenuStatus')"
        v-for="(link, index) in this.$store.state.links_path"
        :key="index"
        :to="link.path"
        :id="
          this.$store.state.current_user &&
          link.condition.includes(this.$store.state.current_user.account_type)
            ? 'show'
            : 'hidde'
        "
      >
        {{ link.title }}
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-component",
  data() {
    return {
      page: 1,
      limit: 10,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.HandelScroll);
    // call to get messages method
    // this.GetMesages();
  },
  methods: {},
  computed: {
    isDashboardRoute() {
      return this.$route.name && this.$route.name.includes("dashboard");
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/_varibels.scss";

// dark style
.nav-dark {
  width: 100%;
  height: 60px;
  background-color: $dark-theme-nav;
  backdrop-filter: blur(40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15%;
  position: fixed;
  z-index: 10;
  @media (max-width: $phone) {
    padding: 0px 5px;
  }

  @media (min-width: $x-large-display) {
    padding: 0px 25%;
  }

  a {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
  }

  ul {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0px;

    a {
      padding: 10px;
      margin: 3px;
      cursor: pointer;
      text-decoration: none;
      color: $font-light;
      font-weight: 400;

      @media (max-width: $phone) {
        display: none;
      }
    }

    #hidde {
      display: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .router-link-active {
      background-color: $blue;
      color: $font-dark;
      border-radius: 5px;
    }

    .theme-icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $dark-icon-theme-color;
      color: $light-theme;
      border-radius: 5px;
      cursor: pointer;
      transition-duration: 0.5s;
      margin: 0px 5px;

      svg {
        font-size: medium;
      }
    }

    .bars-icon {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      color: $font-light;
      border: 1px solid $border-color-dark;
      margin: 0px 5px;

      @media (min-width: $phone) {
        display: none;
      }
    }
  }

  .menu-open {
    width: 200px;
    height: auto;
    overflow: hidden;
    background-color: $menu-dark;
    border-radius: 5px;
    position: absolute;
    top: 110%;
    right: 10px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (min-width: $phone) {
      display: none;
    }

    a {
      width: 96%;
      height: 35px;
      margin: 5px 2%;
      cursor: pointer;
      display: flex;
      justify-content: start;
      padding: 0px 10px;
      text-decoration: none;
      border-radius: 5px;
      color: $font-light;
      font-weight: 400;
    }

    #hidde {
      display: none;
    }

    .router-link-active {
      background-color: $menu-item-dark;
      color: $font-light;
      border-radius: 5px;
    }

    a:hover {
      background-color: $menu-item-dark;
      text-decoration: underline;
    }
  }

  .menu-close {
    @extend .menu-open;
    width: 0px;
    height: auto;
    top: 80%;
    right: 0px;
    overflow: hidden;
    opacity: 0;
    transition-duration: 0.5s;
  }
}

.nav-light {
  width: 100%;
  height: 60px;
  background-color: $light-theme-nav;
  backdrop-filter: blur(40px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15%;
  position: fixed;
  z-index: 10;

  @media (max-width: $phone) {
    padding: 0px 5px;
  }

  @media (min-width: $x-large-display) {
    padding: 0px 25%;
  }

  a {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
    }
  }

  ul {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px 0px;

    a {
      padding: 10px;
      margin: 3px;
      cursor: pointer;
      text-decoration: none;
      color: $font-dark;
      font-weight: 400;

      @media (max-width: $phone) {
        display: none;
      }
    }

    #hidde {
      display: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .router-link-active {
      background-color: $blue;
      color: $font-dark;
      border-radius: 5px;
    }

    .theme-icon {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $light-icon-theme-color;
      color: $dark-theme;
      border-radius: 5px;
      cursor: pointer;
      transition-duration: 0.5s;
      margin: 0px 5px;

      svg {
        font-size: medium;
      }
    }

    .bars-icon {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      color: $font-dark;
      border: 1px solid $border-color-light;
      margin: 0px 5px;
      @media (min-width: $phone) {
        display: none;
      }
    }
  }

  .menu-open {
    width: 200px;
    height: auto;
    overflow: hidden;
    background-color: $menu-light;
    border-radius: 5px;
    position: absolute;
    top: 110%;
    right: 10px;
    opacity: 1;
    transition-duration: 0.5s;

    @media (min-width: $phone) {
      display: none;
    }

    a {
      width: 96%;
      height: 35px;
      margin: 5px 2%;
      cursor: pointer;
      display: flex;
      justify-content: start;
      padding: 0px 10px;
      text-decoration: none;
      border-radius: 5px;
      color: $font-dark;
      font-weight: 400;
    }

    #hidde {
      display: none;
    }

    .router-link-active {
      background-color: $menu-item-light;
      border-radius: 5px;
      color: $font-dark;
    }

    a:hover {
      background-color: $menu-item-light;
      text-decoration: underline;
    }
  }

  .menu-close {
    @extend .menu-open;
    width: 0px;
    height: auto;
    top: 80%;
    right: 0px;
    overflow: hidden;
    opacity: 0;
    transition-duration: 0.5s;
  }
}
// light style
</style>
