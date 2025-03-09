<template>
  <div :class="`install-${this.$store.state.theme}`">
    <img src="../assets/install-app-icon.png" alt="" />
    <div class="cont">
      <h1>Install app 📥</h1>
      <p>You can install the web site ass a mobile app</p>
      <button @click="install">install App</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deferredPrompt: null,
    };
  },
  mounted() {
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      this.deferredPrompt = event;
    });
  },
  methods: {
    async install() {
      if (this.deferredPrompt) {
        await this.deferredPrompt.prompt();

        if (this.deferredPrompt) {
          this.deferredPrompt = null;
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";
// dark
.install-dark {
  width: 80%;
  height: 100%;
  padding: 100px 0px 10px 0px;
  margin: auto;
  color: $font-light;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  img {
    width: 300px;
    height: 300px;

    @media (max-width: $phone) {
      width: 200px;
      height: 200px;
    }

    @media (min-width: $x-large-display) {
      width: 400px;
      height: 400px;
    }
  }

  .cont {
    width: 80%;
    height: 40%;
    margin: 0px 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    h1 {
      color: $font-light;
      margin: 10px 0px;
    }

    p {
      width: 100%;
      height: auto;
      color: $font-light;
      text-align: center;
      margin: 10px 0px;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      color: $font-light;
      cursor: pointer;
      background-color: $button-blue-one;
      transition-duration: 0.5s;
      margin: 10px 0px;
    }

    button:hover {
      background-color: $button-blue-tow;
    }
  }
}
// dark

// light
.install-light {
  width: 80%;
  height: 100%;
  padding: 100px 0px 10px 0px;
  margin: auto;
  color: $font-light;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  img {
    width: 300px;
    height: 300px;

    @media (max-width: $phone) {
      width: 200px;
      height: 200px;
    }

    @media (min-width: $x-large-display) {
      width: 400px;
      height: 400px;
    }
  }

  .cont {
    width: 80%;
    height: 40%;
    margin: 0px 10%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    h1 {
      color: $font-dark;
      margin: 10px 0px;
    }

    p {
      width: 100%;
      height: auto;
      color: $font-dark;
      text-align: center;
      margin: 10px 0px;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      color: $font-dark;
      cursor: pointer;
      background-color: $button-blue-one;
      transition-duration: 0.5s;
      margin: 10px 0px;
    }

    button:hover {
      background-color: $button-blue-tow;
    }
  }
}
// light
</style>
