<template>
  <div :class="`appointments-${this.$store.state.theme}`">
    <h2>
      Appointments List <span>{{ this.$store.state.appointments.length }}</span>
    </h2>

    <div class="section">
      <p
        class="default_message"
        v-if="this.$store.state.appointments.length == 0"
      >
        🤷‍♂️ There are no appointments 🤷‍♂️
      </p>

      <AppointmentComponnet
        v-for="(appointment, index) in this.$store.state.appointments"
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
    return {};
  },
  components: {
    AppointmentComponnet,
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.appointments-dark {
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
.appointments-light {
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
    min-height: 100px;
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
