<template>
  <div :class="`current-patient-${this.$store.state.theme}`">
    <h2>
      Current Patient
      <button
        @click="DeleteCurrentPatient"
        :class="this.$store.state.current_patient ? 'available' : 'unavailable'"
      >
        Clear
      </button>
    </h2>
    <div class="patient-section">
      <p class="default_message" v-if="!this.$store.state.current_patient">
        🤷‍♂️ There are no patients in treatment mode 🤷‍♂️
      </p>

      <UserComponnet
        v-if="this.$store.state.current_patient"
        :user_data="this.$store.state.current_patient"
      />
    </div>
  </div>
</template>

<script>
import UserComponnet from "./UserComponnet.vue";
export default {
  date() {
    return {};
  },
  components: {
    UserComponnet,
  },
  methods: {
    // delete the current patient
    DeleteCurrentPatient() {
      // delete the current patient of the localStorage
      window.localStorage.removeItem("elkood_task_current_patient");

      // find the user
      let user = this.$store.state.users.find(
        (user) => user._id === this.$store.state.current_patient._id
      );

      // export the user of the users array
      this.$store.state.users = this.$store.state.users.filter((user) => {
        return user._id != this.$store.state.current_patient._id;
      });

      // update the user status
      user.status = "out";

      // push the user in to users array
      this.$store.state.users.push(user);

      // re svae users array in localStorage
      window.localStorage.setItem(
        "elkood_task_users",
        JSON.stringify(this.$store.state.users)
      );

      // empty the current patient
      this.$store.state.current_patient = "";
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels"; // dark

// dark
.current-patient-dark {
  width: 100%;
  height: 100%;

  h2 {
    width: 100%;
    height: auto;
    border-left: 10px solid $boold-blue;
    padding: 0px 5px;
    margin: 5px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .available {
      border: 1px solid $confirm-form-green-border;
      background-color: $confirm-form-green-body;
      color: $font-light;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 3px;
      transition-duration: 0.5s;
    }

    .available:hover {
      background-color: $confirm-form-green-border;
    }

    .unavailable {
      @extend .available;
      border: 1px solid $confirm-form-red-border;
      background-color: $confirm-form-red-body;
      pointer-events: none;
    }

    .unavailable:hover {
      background-color: $confirm-form-red-border;
    }
  }

  .patient-section {
    width: 100%;
    height: auto;
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    .default_message {
      width: 100%;
      height: auto;
      text-align: center;
    }
  }
}
// dark

// light
.current-patient-light {
  width: 100%;
  height: 100%;

  h2 {
    width: 100%;
    height: auto;
    border-left: 10px solid $boold-blue;
    padding: 0px 5px;
    margin: 5px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $font-dark;

    .available {
      border: 1px solid $confirm-form-green-border;
      background-color: $confirm-form-green-body;
      color: $font-dark;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 3px;
      transition-duration: 0.5s;
    }

    .available:hover {
      background-color: $confirm-form-green-border;
    }

    .unavailable {
      @extend .available;
      border: 1px solid $confirm-form-red-border;
      background-color: $confirm-form-red-body;
      pointer-events: none;
    }

    .unavailable:hover {
      background-color: $confirm-form-red-border;
    }
  }

  .patient-section {
    width: 100%;
    height: auto;
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;

    .default_message {
      width: 100%;
      height: auto;
      text-align: center;
      color: $font-dark;
    }
  }
}
// light
</style>
