<template>
  <div :class="`appointment-page-${this.$store.state.theme}`">
    <div class="form">
      <h1>Add Appointment</h1>

      <!-- user's name  -->
      <label for="name"
        >Name <span>{{ this.name.length }}</span></label
      >

      <input type="text" id="name" v-model="this.name" readonly />
      <!-- user's name  -->

      <!-- type of the appointment -->
      <label for="appointment_type">Appointment status</label>

      <select name="" id="appointment_type" v-model="this.appointment_type">
        <option
          v-for="(gender, index) in this.$store.state.data.appointment_type"
          :key="index"
          :value="gender.value"
        >
          {{ gender.title }}
        </option>
      </select>
      <!-- type of the appointment -->

      <!-- date of the appointment -->
      <label for="date">Appointment date</label>

      <input
        type="text"
        id="date"
        v-model="this.date"
        placeholder="Select appointment date"
      />
      <!-- date of the appointment -->

      <button @click="AddAppointment">Add an appointment</button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      name: this.$store.state.current_user.user_data.name,
      date: "",
      appointment_type: "pre-emptive",
    };
  },

  mounted() {
    // check if the user is an admin
    if (this.$store.state.current_user.account_type === "admin") {
      // send the admin to home page
      this.$router.push("/");
    }

    // call to setDefaultDate to set the default (today's date)
    this.setDefaultDate();
  },

  methods: {
    // validate date type
    validation_date() {
      const regex = /\d{2}-\d{2}-\d{4}/;

      // check if the typed date is false
      if (!regex.test(this.date)) {
        return false;
      } else {
        return true;
      }
    },

    SetMessgae(type, message_content) {
      // call to ChangeMessageStatus from store to open the message component
      this.$store.commit("ChangeMessageStatus");

      // set an error message to message's objectin to store
      this.$store.state.message = {
        type: type,
        message: message_content,
      };

      // call the CloseMessageAfter5s to close after 5s
      return this.$store.commit("CloseMessageAfter5s");
    },

    // set the default date
    async setDefaultDate() {
      this.date = await this.$store.dispatch("generateDate");
    },

    // add Appointment
    async AddAppointment() {
      // check if the user is loged in
      if (!this.$store.state.current_user) {
        return this.SetMessgae(
          "error",
          "Sorry, you must register or log in to continue booking an appointment."
        );
      }

      // check if the current user id not an admin
      if (this.$store.state.current_user.account_type == "admin") {
        return this.SetMessgae(
          "error",
          "Sorry, this feature is only available for regular users (not doctors)."
        );
      }

      // check of the validation_date result type
      if (!(await this.validation_date())) {
        // return and set a message
        return this.SetMessgae("error", "Sorry, invalid date format .");
      }

      // generate a Unique id
      const _id = uuidv4();

      // create a new Appointment
      let Appointment = {
        _id: _id,
        user_id: this.$store.state.current_user.user_data._id,
        name: this.$store.state.current_user.user_data.name,
        appointment_type: this.appointment_type,
        appointment_date: this.date,
        created_at: await this.$store.dispatch("generateDate"),
      };

      // add the create Appointment to the appointments array and save it in localStorage
      this.$store.state.appointments.push(Appointment);

      // save the appointments in data base
      window.localStorage.setItem(
        "elkood_task_appointments",
        JSON.stringify(this.$store.state.appointments)
      );

      // filter the users
      this.$store.state.users = this.$store.state.users.filter((user) => {
        return user._id !== this.$store.state.current_user.user_data._id;
      });

      // add the create appointment's id to the user's appointments array
      this.$store.state.current_user.user_data.appointments.push(
        Appointment._id
      );

      // resave the current user in local storage
      window.localStorage.setItem(
        "elkood_task_current_user",
        JSON.stringify(this.$store.state.current_user)
      );

      // add the current user to the users array
      this.$store.state.users.push(this.$store.state.current_user.user_data);

      // sav eth users after added the Appointment's id
      window.localStorage.setItem(
        "elkood_task_users",
        JSON.stringify(this.$store.state.users)
      );

      // set a message
      this.SetMessgae("success", "Appointment has been booked successfully");

      // send the user to home page
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";
// dark
.appointment-page-dark {
  width: 80%;
  height: 100vh;
  margin: auto;
  padding: 70px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: $phone) {
    width: 98%;
    margin: 0px 1%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .form {
    width: 90%;
    height: auto;
    margin: auto;
    padding: 10px;
    border-radius: 5px;
    background-color: $log-in-dark;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;

    h1 {
      width: 100%;
      height: auto;
      color: $font-light;
      margin: 5px 0px;
      text-align: center;
    }

    label {
      width: 100%;
      height: auto;
      color: $font-light;
      border: 1px solid;
      margin: 10px 0px;
      border-color: transparent transparent $border-color-dark transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input,
    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $input-dark;
      color: $font-light;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      margin: 20px 0px 10px 0px;
      cursor: pointer;
      color: $font-light;
      background-color: $confirm-form-green-body;
      border: 1px solid $confirm-form-green-border;
      transition-duration: 0.5s;
    }

    button:hover {
      background-color: $confirm-form-green-border;
    }
  }
}
// dark

// light
.appointment-page-light {
  width: 80%;
  height: 100vh;
  margin: auto;
  padding: 70px 0px 10px 0px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: $phone) {
    width: 98%;
    margin: 0px 1%;
  }

  @media (min-width: $x-large-display) {
    width: 500px;
  }

  .form {
    width: 90%;
    height: auto;
    margin: auto;
    padding: 10px;
    border-radius: 5px;
    background-color: $log-in-light;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    transition-duration: 0.5s;

    h1 {
      width: 100%;
      height: auto;
      color: $font-dark;
      margin: 5px 0px;
      text-align: center;
    }

    label {
      width: 100%;
      height: auto;
      color: $font-dark;
      border: 1px solid;
      margin: 10px 0px;
      border-color: transparent transparent $border-color-dark transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input,
    select {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      outline: none;
      padding: 0px 10px;
      background-color: $input-light;
      color: $font-dark;
    }

    button {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      margin: 20px 0px 10px 0px;
      cursor: pointer;
      color: $font-dark;
      background-color: $confirm-form-green-body;
      border: 1px solid $confirm-form-green-border;
      transition-duration: 0.5s;
    }

    button:hover {
      background-color: $confirm-form-green-border;
    }
  }
}
// light
</style>
