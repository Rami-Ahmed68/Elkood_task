<template>
  <div :class="`user-profile-${this.$store.state.theme}`">
    <div class="header" v-if="this.searched_user">
      <img :src="this.searched_user.avatar" alt="avatar" />

      <div class="info">
        <h1>{{ this.searched_user.name }}</h1>
        <div class="chips">
          <span id="admin" v-if="this.searched_user.account_type == 'admin'"
            >Admin 👨🏻‍💼</span
          >
          <span
            v-if="
              this.searched_user.appointments &&
              this.$store.state.current_user.account_type !== 'admin'
            "
            >Appointmens 🎫 :
            {{ this.searched_user.appointments.length }}
          </span>
          <span>Phone Number 📞 : {{ this.searched_user.phone_number }}</span>
          <span>Blood Groupm 🩸 : {{ this.searched_user.blood_groupm }}</span>
          <span>⚧ : {{ this.searched_user.gender }}</span>
          <span>Joind at 📅 : {{ this.searched_user.joind_at }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searched_user: "",
      searched_user_appointments: "",
    };
  },
  mounted() {
    // check if the user is loged in or not
    if (!this.$store.state.current_user) {
      // send to the log in page
      this.$router.push("/login");
    }

    // call to find user method
    this.FindUser();

    // call to find user's appointmens
    this.FindUserAppointmens();
  },
  components: {},
  methods: {
    // find the user
    FindUser() {
      this.searched_user = this.$store.state.users.find(
        (user) => user._id === this.$route.params.id
      );
    },

    // find user's appointmens
    FindUserAppointmens() {
      // check if the searched user is not admin
      if (this.searched_user.account_type != "admin") {
        // filter searched_user's appointmens
        this.searched_user_appointments = this.$store.state.appointments.map(
          (appointment) => {
            // check if the current user's appointments array has a appointment's id and return it
            if (this.searched_user.appointments.includes(appointment._id)) {
              return appointment;
            }
          }
        );
      }
    },
  },
};
</script>

<style lang="scss">
@import "../sass/_varibels.scss";

// dark style
.user-profile-dark {
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

        #admin {
          border: 1px solid $confirm-form-green-border;
          background-color: $confirm-form-green-body;
        }
      }
    }
  }
}
// dark style

// light style
.user-profile-light {
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

        #admin {
          border: 1px solid $confirm-form-green-border;
          background-color: $confirm-form-green-body;
        }
      }
    }
  }
}
// light style
</style>
