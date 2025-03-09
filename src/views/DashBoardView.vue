<template>
  <div :class="`dash-board-${this.$store.state.theme}`">
    <div class="head">
      <h1>Control panel</h1>
      <span
        >Good day Dr.
        {{ this.$store.state.current_user.user_data.name }}👋</span
      >
    </div>

    <SidBarComponent />

    <div class="section">
      <transition name="slide">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import SidBarComponent from "@/components/dashboard/SidBarComponent.vue";
export default {
  data() {
    return {};
  },
  components: {
    SidBarComponent,
  },
  mounted() {
    // check if there are a user and he is an admin
    if (
      !this.$store.state.current_user ||
      this.$store.state.current_user.account_type != "admin"
    ) {
      // send the user to home page
      this.$router.push("/");
    }
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";

// dark
.dash-board-dark {
  width: 80%;
  height: 100%;
  margin: auto;
  padding: 70px 0px 10px 0px;
  color: $font-light;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .head {
    border-bottom: 1px solid $border-color-dark;
    width: 100%;
    height: auto;
    margin: 20px 0px;
    color: $font-light;

    span {
      font-size: small;
    }
  }

  .section {
    width: 100%;
    height: auto;
    margin: auto;
  }

  .slide-enter-active {
    animation: slideIn 0.5s ease-out;
    /* مدة وسرعة التأثير */
  }

  .slide-leave-active {
    animation: slideOut 0.5s ease-in;
    /* تأثير معاكس عند إخفاء المحتوى */
  }

  @keyframes slideIn {
    from {
      transform: translateY(40px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(-40px);
      opacity: 0;
    }
  }
}
// dark

// light
.dash-board-light {
  width: 80%;
  height: 100%;
  margin: auto;
  padding: 70px 0px 10px 0px;
  color: $font-light;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .head {
    border-bottom: 1px solid $border-color-dark;
    width: 100%;
    height: auto;
    margin: 20px 0px;
    color: $font-dark;

    span {
      font-size: small;
    }
  }

  .section {
    width: 100%;
    height: auto;
    margin: auto;
  }

  .slide-enter-active {
    animation: slideIn 0.5s ease-out;
    /* مدة وسرعة التأثير */
  }

  .slide-leave-active {
    animation: slideOut 0.5s ease-in;
    /* تأثير معاكس عند إخفاء المحتوى */
  }

  @keyframes slideIn {
    from {
      transform: translateY(40px);
      opacity: 0;
    }

    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateY(0);
      opacity: 1;
    }

    to {
      transform: translateY(-40px);
      opacity: 0;
    }
  }
}
// light
</style>
