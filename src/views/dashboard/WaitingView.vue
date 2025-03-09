<template>
  <div :class="`waiting-page-${this.$store.state.theme}`">
    <h2>
      Patients waiting <span>{{ this.wating_users.length }}</span>
    </h2>

    <div class="section">
      <p class="default_message" v-if="this.wating_users.length == 0">
        🤷‍♂️ There are no patients waiting 🤷‍♂️
      </p>
      <AppointmentComponnet
        v-for="(appointment, index) in this.wating_users"
        :key="index"
        :appointment_data="appointment"
      />
    </div>
  </div>
</template>

<script>
import AppointmentComponnet from "@/components/dashboard/AppointmentComponnet.vue";

export default {
  data() {
    return {
      wating_users: [],
    };
  },
  components: {
    AppointmentComponnet,
  },
  mounted() {
    // call get today appointments
    this.getTodayAppointments();
  },
  methods: {
    // get today appointments and users
    async getTodayAppointments() {
      // generating date
      const today = await this.$store.dispatch("generateDate");

      // filter the appointments and return it if him date i equequal today date
      this.wating_users = this.$store.state.appointments.filter(
        (appointment) => {
          return appointment.appointment_date === today;
        }
      );

      console.log(this.wating_users);
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.waiting-page-dark {
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

    span {
      font-size: $small;
    }
  }

  .section {
    width: 100%;
    min-height: 100px;
    margin: 10px 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
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
.waiting-page-light {
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

    span {
      font-size: $small;
    }
  }

  .section {
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
