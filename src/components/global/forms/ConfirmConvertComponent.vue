<template>
  <div
    :class="`confirm-convert-${this.$store.state.theme}-${this.$store.state.confirm_convert_status}`"
  >
    <h3>Convert the patient</h3>
    <p>
      Are you sure, the appointment will be converting the user of the wating
      status to current Treatment ?
    </p>

    <div class="buttons">
      <button class="convert" @click="convert">Convert</button>
      <button
        class="cancel"
        @click="this.$store.commit('ChangeConfirmConvertStatus')"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
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

    convert() {
      // find the appointment
      let appointment = this.$store.state.appointments.find((appointment) => {
        return appointment._id === this.$store.state.appointment_id_for_delete;
      });

      // check if the appointment is exists
      if (!appointment) {
        return this.SetMessgae(
          "error",
          "Sorry, invalid appointment not found."
        );
      }

      this.$store.state.appointments = this.$store.state.appointments.filter(
        (appointment) =>
          appointment._id !== this.$store.state.appointment_id_for_delete
      );

      // find the user
      let user = this.$store.state.users.find(
        (user) => user._id === appointment.user_id
      );

      // export the user of the users array
      this.$store.state.users = this.$store.state.users.filter((user) => {
        return user._id != appointment.user_id;
      });

      // convert the appointment's id of the user's appointments array
      user.appointments = user.appointments.filter((id) => {
        return id != this.$store.state.appointment_id_for_delete;
      });

      // update the user status
      user.status = "in";

      // push the user in to users array
      this.$store.state.users.push(user);

      // re svae users array in localStorage
      window.localStorage.setItem(
        "elkood_task_users",
        JSON.stringify(this.$store.state.users)
      );

      // re save the appointments in local storage
      window.localStorage.setItem(
        "elkood_task_appointments",
        JSON.stringify(this.$store.state.appointments)
      );

      // save the user ass a current patient
      window.localStorage.setItem(
        "elkood_task_current_patient",
        JSON.stringify(user)
      );

      // to close the confirm component by (changing the status)
      this.$store.commit("ChangeConfirmConvertStatus");

      // send the admin to current patient page
      window.location = "/dashboard/current-patient";
    },
  },
};
</script>

<style lang="scss">
@import "../../../sass/varibels";
// dark
.confirm-convert-dark-open {
  width: 50%;
  max-height: 200px;
  background-color: $confirm-form-dark;
  position: fixed;
  bottom: 10px;
  left: 25%;
  border-radius: 5px;
  transition-duration: 0.5s;
  padding: 10px;
  opacity: 1;

  @media (max-width: $phone) {
    width: 96%;
    left: 2%;
  }

  @media (min-width: $x-large-display) {
    width: 20%;
    left: 40%;
  }

  h3 {
    width: 100%;
    height: auto;
    border-bottom: 1px solid $border-color-dark;
    color: $font-light;
  }

  p {
    width: 100%;
    height: auto;
    color: $font-light;
    margin: 5px 0px;
    font-size: small;
  }

  .buttons {
    width: 100%;
    height: auto;
    margin-top: 10px;

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      outline: none;
      transition-duration: 0.5s;
      cursor: pointer;
      color: $font-light;
    }

    .convert {
      border-radius: 5px;
      outline: none;
      background-color: $confirm-form-green-body;
      border: 1px solid $confirm-form-green-border;
    }

    .convert:hover {
      background-color: $confirm-form-green-border;
    }

    .cancel {
      @extend .convert;
      background-color: $confirm-form-red-body;
      border: 1px solid $confirm-form-red-border;
    }

    .cancel:hover {
      background-color: $confirm-form-red-border;
    }
  }
}

.confirm-convert-dark-close {
  @extend .confirm-convert-dark-open;
  opacity: 0;
  bottom: -50%;
}
// dark

// light
.confirm-convert-light-open {
  width: 50%;
  max-height: 200px;
  background-color: $confirm-form-light;
  position: fixed;
  bottom: 10px;
  left: 25%;
  border-radius: 5px;
  transition-duration: 0.5s;
  padding: 10px;
  opacity: 1;

  @media (max-width: $phone) {
    width: 96%;
    left: 2%;
  }

  @media (min-width: $x-large-display) {
    width: 20%;
    left: 40%;
  }

  h3 {
    width: 100%;
    height: auto;
    border-bottom: 1px solid $border-color-light;
    color: $font-dark;
  }

  p {
    width: 100%;
    height: auto;
    color: $font-dark;
    margin: 5px 0px;
    font-size: small;
  }

  .buttons {
    width: 100%;
    height: auto;
    margin-top: 10px;

    button {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      border-radius: 5px;
      outline: none;
      transition-duration: 0.5s;
      cursor: pointer;
      color: $font-dark;
    }

    .convert {
      border-radius: 5px;
      outline: none;
      background-color: $confirm-form-green-body;
      border: 1px solid $confirm-form-green-border;
    }

    .convert:hover {
      background-color: $confirm-form-green-border;
    }

    .cancel {
      @extend .convert;
      background-color: $confirm-form-red-body;
      border: 1px solid $confirm-form-red-border;
    }

    .cancel:hover {
      background-color: $confirm-form-red-border;
    }
  }
}

.confirm-convert-light-close {
  @extend .confirm-convert-light-open;
  opacity: 0;
  bottom: -50%;
}
// light
</style>
