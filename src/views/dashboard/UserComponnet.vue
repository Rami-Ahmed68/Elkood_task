<template>
  <div :class="`user-component-${this.$store.state.theme}`">
    <img :src="this.user_data.avatar" alt="user's avatar" />

    <div class="info">
      <h3>{{ this.user_data.name }}</h3>

      <div class="chips">
        <span v-if="this.user_data.appointments"
          >Appointmens 🎫 :
          {{ this.user_data.appointments.length }}
        </span>
        <span v-else :class="this.$store.state.current_user.account_type"
          >Admin 👨🏻‍💼
        </span>
        <span>Phone Number 📞 : {{ this.user_data.phone_number }}</span>
        <span>Blood Groupm 🩸 : {{ this.user_data.blood_groupm }}</span>
        <span>⚧ : {{ this.user_data.gender }}</span>
        <span>Joind at 📅 : {{ this.user_data.joind_at }}</span>
      </div>
    </div>

    <span
      v-if="
        this.user_appointments.length > 0 &&
        this.user_data.account_type != 'admin'
      "
      id="status"
      :class="
        this.user_data.status == 'in'
          ? `in-${this.$store.state.theme}`
          : `out-${this.$store.state.theme}`
      "
    >
      {{ this.user_data.status == "in" ? "Current Patient 🩺" : "waiting ⌛" }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // today's date
      today: "",
      user_appointments: "",
    };
  },
  props: {
    user_data: Object,
  },
  async mounted() {
    // generate the date
    this.today = await this.$store.dispatch("generateDate");

    // filter the user's appointments
    if (this.user_data.appointments) {
      this.user_appointments = this.$store.state.appointments.filter(
        (appointment) => {
          // check if the user's appointment's date is equl today's date
          return (
            this.user_data.appointments.includes(appointment._id) &&
            appointment.appointment_date === this.today
          );
        }
      );
    }
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.user-component-dark {
  width: 100%;
  min-height: 100px;
  background-color: $card-dark;
  border-radius: 5px;
  margin: 5px 0%;
  transition-duration: 0.5s;
  padding: 5px;
  display: flex;
  justify-content: start;
  position: relative;

  img {
    max-width: 100px;
    height: 100px;
    border-radius: 5px;
  }

  .info {
    width: auto;
    height: 100%;
    margin: 0px 10px;
    color: $font-light;

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

      .admin {
        background-color: $success-message-body;
        border: 1px solid $success-message-border;
      }
    }
  }

  #status {
    position: absolute;
    right: 5px;
    top: 5px;
  }

  .in-dark {
    padding: 3px;
    border-radius: 3px;
    background-color: $success-message-body;
    border: 1px solid $success-message-border;
    font-size: $small;
  }

  .out-dark {
    @extend .in-dark;
    background-color: $error-message-body;
    border: 1px solid $error-message-border;
  }
}
// dark

// light
.user-component-light {
  width: 100%;
  min-height: 100px;
  background-color: $card-light;
  border-radius: 5px;
  margin: 5px 0%;
  transition-duration: 0.5s;
  padding: 5px;
  display: flex;
  justify-content: start;
  position: relative;

  img {
    max-width: 100px;
    max-height: 100%;
    border-radius: 5px;
  }

  .info {
    width: auto;
    height: 100%;
    margin: 0px 10px;
    color: $font-dark;

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

      .admin {
        background-color: $success-message-body;
        border: 1px solid $success-message-border;
      }
    }
  }

  #status {
    position: absolute;
    right: 5px;
    top: 5px;
    color: $font-dark;
  }

  .in-light {
    padding: 3px;
    border-radius: 3px;
    background-color: $success-message-body;
    border: 1px solid $success-message-border;
    font-size: $small;
  }

  .out-light {
    @extend .in-light;
    background-color: $error-message-body;
    border: 1px solid $error-message-border;
  }
}

// light
</style>
