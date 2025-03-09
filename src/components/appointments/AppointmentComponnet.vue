<template>
  <div
    :class="`appointment-${this.$store.state.theme}`"
    v-if="this.appointment_data"
  >
    <h3>{{ this.appointment_data.name }} 📌</h3>

    <div class="chips">
      <span>Type ⚠️ : {{ this.appointment_data.appointment_type }}</span>
      <span>Date 📅 : {{ this.appointment_data.appointment_date }}</span>
      <span>created at 📅 : {{ this.appointment_data.created_at }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    appointment_data: Object,
  },
};
</script>

<style lang="scss">
@import "../../sass/varibels";

// dark
.appointment-dark {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background-color: $card-dark;
  margin: 5px 0px;
  padding: 5px;

  h3 {
    width: 100%;
    height: auto;
    color: $font-light;
    border-bottom: 1px solid $border-color-dark;
  }

  .chips {
    width: 100%;
    height: auto;
    margin: 10px 0px;
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
}
// dark

// light
.appointment-light {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background-color: $card-light;
  margin: 5px 0px;
  padding: 5px;

  h3 {
    width: 100%;
    height: auto;
    color: $font-dark;
    border-bottom: 1px solid $border-color-dark;
  }

  .chips {
    width: 100%;
    height: auto;
    margin: 10px 0px;
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
}
// light
</style>
