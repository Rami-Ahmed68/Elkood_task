<template>
  <div :class="`home-${this.$store.state.theme}`">
    <header class="cont-one">
      <div class="data">
        <h1>
          {{ this.$store.state.data.cont_one.title }}
        </h1>

        <p>
          {{ this.$store.state.data.cont_one.description }}
        </p>

        <div class="links-cont">
          <router-link to="/login" v-if="!this.$store.state.current_user">
            Log in
          </router-link>

          <router-link
            to="/appointment"
            v-if="
              this.$store.state.current_user &&
              this.$store.state.current_user.account_type != 'admin'
            "
          >
            Book Appointment
          </router-link>
        </div>
      </div>
    </header>

    <section>
      <h2>Our features</h2>

      <div
        class="card"
        v-for="(card, index) in this.$store.state.data.cards"
        :key="index"
      >
        <img v-if="index % 2 != 0" :src="card.image" alt="card's image" />

        <div class="info">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
        </div>
        <img v-if="index % 2 == 0" :src="card.image" alt="card's image" />
      </div>
    </section>

    <div class="working-hours">
      <h2>Working hours</h2>

      <div class="cards-cont">
        <div
          class="card"
          v-for="(card, index) in this.$store.state.data.time_cards"
          :key="index"
        >
          <h4>{{ card.day }}</h4>
          <p>{{ card.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>

<style lang="scss">
@import "../sass/_varibels.scss";

// dark style
.home-dark {
  width: 80%;
  min-height: 100vh;
  margin: auto;
  padding: 70px 0px 10px 0px;
  color: $font-light;

  @media (max-width: $phone) {
    width: 98%;
    margin: 0px 1%;
  }

  @media (min-width: $x-large-display) {
    width: 800px;
  }

  .cont-one {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    @media (max-width: $phone) {
      width: 96%;
      margin: 10px 2%;
      height: 200px;
    }

    .data {
      color: $font-light;
      padding: 0px 10px;
      max-height: 50%;
      position: absolute;
      bottom: 0%;
      padding: 10px;

      h1 {
        font-size: $xx-large;
      }

      p {
        font-size: $medium;
      }

      .links-cont {
        width: 60%;
        height: auto;
        margin: 10px 0px;

        a {
          padding: 10px 15px;
          border-radius: 5px;
          color: $font-light;
          background-color: $button-blue-one;
          margin: 0px 5px;
          text-decoration: none;
          transition-duration: 0.5s;
        }

        a:hover {
          background-color: $button-blue-tow;
        }
      }

      @media (max-width: $phone) {
        color: $font-light;
        padding: 0px 10px;
        max-height: 50%;
        position: absolute;
        bottom: 0%;

        h1 {
          font-size: $medium;
        }

        p {
          font-size: $small;
        }

        .links-cont {
          width: 100%;
          height: auto;
          margin: 10px 0px;

          a {
            padding: 7px 10px;
            font-size: $x-small;
          }
        }
      }
    }
  }

  section {
    width: 100%;
    height: auto;

    h2 {
      width: 96%;
      height: auto;
      margin: 10px 2%;
      color: $font-light;
      padding: 0px 10px;
      border-left: 7px solid $boold-blue;
    }

    .card {
      width: 96%;
      max-height: 250px;
      margin: 5px 2%;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      padding: 5px;
      background-color: $card-dark;
      transition-duration: 0.5s;
      cursor: pointer;

      img {
        max-width: 40%;
        border-radius: 5px;
      }

      .info {
        width: 60%;
        padding: 0px 5px;
        // background-color: red;

        h3 {
          width: 100%;
          height: auto;
        }

        p {
          font-size: $medium;
        }
      }

      @media (max-width: $phone) {
        img {
          max-width: 50%;
          border-radius: 5px;
        }

        .info {
          width: 50%;

          p {
            font-size: $x-small;
          }
        }
      }
    }

    .card:hover {
      box-shadow: 0 0 5px $black;
    }
  }

  .working-hours {
    width: 100%;
    height: auto;

    h2 {
      width: 96%;
      height: auto;
      margin: 10px 2%;
      color: $font-light;
      padding: 0px 10px;
      border-left: 7px solid $boold-blue;
    }

    .cards-cont {
      width: 100%;
      height: auto;
      background-color: $section-dark;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      border-radius: 5px;

      .card {
        width: 150px;
        height: 150px;
        padding: 5px;
        margin: 5px;
        background-color: $card-dark;
        border-left: 7px solid $blue;

        p {
          font-size: $small;
        }

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;

          p {
            font-size: $x-small;
          }
        }
      }
    }
  }
}
// dark style

// light style
.home-light {
  width: 80%;
  min-height: 100vh;
  margin: auto;
  padding: 70px 0px 10px 0px;
  color: $font-light;

  @media (max-width: $phone) {
    width: 98%;
    margin: 0px 1%;
  }

  @media (min-width: $x-large-display) {
    width: 800px;
  }

  .cont-one {
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    background: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: relative;

    @media (max-width: $phone) {
      width: 96%;
      margin: 10px 2%;
      height: 200px;
    }

    .data {
      color: $font-light;
      padding: 0px 10px;
      position: absolute;
      bottom: 0%;

      h1 {
        font-size: $xx-large;
      }

      p {
        font-size: $medium;
      }

      .links-cont {
        width: 60%;
        height: auto;
        margin: 10px 0px;

        a {
          padding: 10px 15px;
          border-radius: 5px;
          color: $font-light;
          background-color: $blue;
          margin: 0px 5px;
          text-decoration: none;
        }
      }
      @media (max-width: $phone) {
        h1 {
          font-size: $medium;
        }

        p {
          font-size: $small;
        }

        .links-cont {
          width: 100%;
          height: auto;
          margin: 10px 0px;

          a {
            padding: 7px 10px;
            border-radius: 5px;
            color: $font-light;
            font-size: $x-small;
            background-color: $blue;
            margin: 0px 5px;
            text-decoration: none;
          }
        }
      }
    }
  }

  section {
    width: 100%;
    height: auto;

    h2 {
      width: 96%;
      height: auto;
      margin: 10px 2%;
      color: $font-dark;
      padding: 0px 10px;
      border-left: 7px solid $boold-blue;
    }

    .card {
      width: 96%;
      max-height: 250px;
      margin: 5px 2%;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      padding: 5px;
      background-color: $card-light;
      transition-duration: 0.5s;
      cursor: pointer;

      img {
        max-width: 40%;
        border-radius: 5px;
      }

      .info {
        width: 60%;
        padding: 0px 5px;
        color: $font-dark;

        h3 {
          width: 100%;
          height: auto;
        }

        p {
          font-size: $medium;
        }
      }

      @media (max-width: $phone) {
        img {
          max-width: 50%;
          border-radius: 5px;
        }

        .info {
          width: 50%;

          p {
            font-size: $x-small;
          }
        }
      }
    }

    .card:hover {
      box-shadow: 0 0 5px $black;
    }
  }

  .working-hours {
    width: 100%;
    height: auto;

    h2 {
      width: 96%;
      height: auto;
      margin: 10px 2%;
      color: $font-dark;
      padding: 0px 10px;
      border-left: 7px solid $boold-blue;
    }

    .cards-cont {
      width: 100%;
      height: auto;
      background-color: $section-light;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      border-radius: 5px;

      .card {
        width: 150px;
        height: 150px;
        padding: 5px;
        margin: 5px;
        background-color: $card-light;
        border-left: 7px solid $boold-blue;
        color: $font-dark;

        p {
          font-size: $small;
        }

        @media (max-width: $phone) {
          width: 100px;
          height: 100px;

          p {
            font-size: $x-small;
          }
        }
      }
    }
  }
}
// light style
</style>
