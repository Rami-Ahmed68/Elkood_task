<template>
  <div :class="`profile-${this.$store.state.theme}`">
    <div class="header" v-if="this.$store.state.current_user.user_data">
      <img
        :src="this.$store.state.current_user.user_data.avatar"
        alt="avatar"
      />

      <div class="info">
        <h1>{{ this.$store.state.current_user.user_data.name }}</h1>
        <div class="chips">
          <span v-if="this.$store.state.current_user.account_type !== 'admin'"
            >Appointmens 🎫 :
            {{ this.$store.state.current_user.user_data.appointments.length }}
          </span>
          <span
            >Phone Number 📞 :
            {{ this.$store.state.current_user.user_data.phone_number }}</span
          >
          <span
            >Blood Groupm 🩸 :
            {{ this.$store.state.current_user.user_data.blood_groupm }}</span
          >
          <span>⚧ : {{ this.$store.state.current_user.user_data.gender }}</span>
          <span
            >Joind at 📅 :
            {{ this.$store.state.current_user.user_data.joind_at }}</span
          >
        </div>

        <button class="logout" @click="LogOut">Log out</button>
      </div>
    </div>

    <div
      class="section"
      v-if="
        this.$store.state.current_user.user_data &&
        this.$store.state.current_user.account_type !== 'admin'
      "
    >
      <h2>My</h2>

      <div class="container">
        <p
          class="default_message"
          v-if="
            this.$store.state.current_user &&
            this.$store.state.current_user.user_data.appointments.length == 0
          "
        >
          🤷‍♂️ No any patient 🤷‍♂️
        </p>

        <AppointmentComponnet
          v-for="(appointment, index) in this.$store.state
            .current_user_appointments"
          :key="index"
          :appointment_data="appointment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AppointmentComponnet from "@/components/appointments/AppointmentComponnet.vue";
export default {
  data() {
    return {};
  },
  mounted() {
    // check if the user is loged in or not
    if (!this.$store.state.current_user) {
      // send to the log in page
      this.$router.push("/login");
    }

    // check if the current user is not an admin
    if (this.$store.state.current_user.account_type !== "admin") {
      // filter use's appointmens
      this.$store.state.current_user_appointments =
        this.$store.state.appointments.map((appointment) => {
          // check if the current user's appointments array has a appointment's id and return it
          if (
            this.$store.state.current_user.user_data.appointments.includes(
              appointment._id
            )
          ) {
            return appointment;
          }
        });
    }
  },
  components: {
    AppointmentComponnet,
  },
  methods: {
    LogOut() {
      // delete the current user data of localStorage
      window.localStorage.removeItem("elkood_task_current_user");

      // move to the log in page
      window.location = "/login";
    },
  },
};
</script>

<style lang="scss">
@import "../sass/_varibels.scss";

// dark style
.profile-dark {
  width: 80%;
  height: 100%;
  padding: 70px 0px 10px 0px;
  margin: auto;
  color: $font-light;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .header {
    width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0px;
    background-color: $section-dark;
    display: flex;
    justify-content: start;

    img {
      width: 150px;
      height: 150px;
      border-radius: 5%;

      @media (max-width: $phone) {
        width: 80px;
        height: 80px;
      }
    }

    .info {
      margin: 0px 10px;
      flex-grow: 1;

      h1 {
        color: $font-light;
      }

      .chips {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border-radius: 3px;
          margin: 3px 3px 3px 0px;
          font-size: $small;
          color: $chips-dark-gray-text;
          background-color: $chips-dark-gray-body;
          border: 1px solid $chips-dark-gray-border;

          @media (max-width: $phone) {
            font-size: $x-small;
          }
        }
      }

      .logout {
        width: 100%;
        height: 30px;
        color: $font-light;
        transition-duration: 0.5s;
        margin: 10px 0px 5px 0px;
        border-radius: 5px;
        background-color: $confirm-form-red-body;
        border: 1px solid $confirm-form-red-border;
        cursor: pointer;
      }

      .logout:hover {
        background-color: $confirm-form-red-border;
      }
    }
  }

  .section {
    width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 5px;
    margin: 10px 0px;
    background-color: $section-dark;

    h2 {
      width: 100%;
      height: auto;
      padding: 0px 5px;
      margin: 10px 0px;
      border-left: 10px solid $boold-blue;
      border-bottom: 1px solid $border-color-dark;
      color: $font-light;
    }

    .container {
      width: 100%;
      min-height: 200px;
      margin: 10px 0px;
      padding: 10px;
      color: $font-light;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .default_message {
        width: 100%;
        text-align: center;
      }
    }
  }
}
// dark style

// light style
.profile-light {
  width: 80%;
  height: 100%;
  padding: 70px 0px 10px 0px;
  margin: auto;
  color: $font-light;

  @media (max-width: $phone) {
    width: 96%;
    margin: 0px 2%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .header {
    width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0px;
    background-color: $section-light;
    display: flex;
    justify-content: start;

    img {
      width: 150px;
      height: 150px;
      border-radius: 5%;

      @media (max-width: $phone) {
        width: 80px;
        height: 80px;
      }
    }

    .info {
      margin: 0px 10px;
      flex-grow: 1;

      h1 {
        color: $font-dark;
      }

      .chips {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        align-items: center;

        span {
          padding: 3px;
          border-radius: 3px;
          margin: 3px 3px 3px 0px;
          font-size: $small;
          color: $chips-light-gray-text;
          background-color: $chips-light-gray-body;
          border: 1px solid $chips-light-gray-border;

          @media (max-width: $phone) {
            font-size: $x-small;
          }
        }
      }

      .logout {
        width: 100%;
        height: 30px;
        color: $font-dark;
        transition-duration: 0.5s;
        margin: 10px 0px 5px 0px;
        border-radius: 5px;
        background-color: $confirm-form-red-body;
        border: 1px solid $confirm-form-red-border;
        cursor: pointer;
      }

      .logout:hover {
        background-color: $confirm-form-red-border;
      }
    }
  }

  .section {
    width: 100%;
    height: auto;
    border-radius: 5px;
    padding: 5px;
    margin: 10px 0px;
    background-color: $section-light;

    h2 {
      width: 100%;
      height: auto;
      padding: 0px 5px;
      margin: 10px 0px;
      border-left: 10px solid $boold-blue;
      border-bottom: 1px solid $border-color-light;
      color: $font-dark;
    }

    .container {
      width: 100%;
      min-height: 200px;
      margin: 10px 0px;
      padding: 10px;
      color: $font-dark;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      .default_message {
        width: 100%;
        text-align: center;
      }
    }
  }
}
// light style
</style>
