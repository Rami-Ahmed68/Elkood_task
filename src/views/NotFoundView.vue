<template>
  <div :class="`not-found-page-${this.$store.state.theme}`">
    <img src="../assets/not-found-icon.png" alt="not found image" />
    <div class="cont">
      <p>
        Not Found page
        <span @click="ReplacePath">Back to home page</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // replace path method
    ReplacePath() {
      this.$router.replace("/");
    },
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";

// dark
.not-found-page-dark {
  width: 80%;
  height: 100%;
  padding: 70px 0px 10px 0px;
  margin: auto;
  color: $font-light;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    height: 300px;
  }

  .cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    p {
      width: 100%;
      text-align: center;
      margin: 10px 0px;

      span {
        width: 100%;
        text-align: center;
        margin: 10px 0px;
        color: $link-dark;
        font-size: $small;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
// dark

// light
.not-found-page-light {
  width: 80%;
  height: 100%;
  padding: 70px 0px 10px 0px;
  margin: auto;
  color: $font-dark;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  img {
    width: 300px;
    height: 300px;
  }

  .cont {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    p {
      width: 100%;
      text-align: center;
      margin: 10px 0px;

      span {
        width: 100%;
        text-align: center;
        margin: 10px 0px;
        color: $link-light;
        font-size: $small;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
// light
</style>
