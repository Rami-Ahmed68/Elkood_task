<template>
  <div
    :class="`appointment-${this.$store.state.theme}`"
    v-if="this.appointment_data"
  >
    <h3>
      <img :src="this.user.avatar" alt="user's avatar" />
      <router-link :to="`/user/${this.appointment_data.user_id}`">
        {{ this.appointment_data.name }} 📌
      </router-link>
    </h3>

    <div class="chips">
      <span>Type ⚠️ : {{ this.appointment_data.appointment_type }}</span>
      <span
        :class="
          this.appointment_data.appointment_date === this.today
            ? 'today-chip'
            : 'not-today-chip'
        "
        >{{
          this.appointment_data.appointment_date === this.today
            ? "Date is today"
            : "Date"
        }}
        📅 : {{ this.appointment_data.appointment_date }}</span
      >
      <span>created at 📅 : {{ this.appointment_data.created_at }}</span>
    </div>

    <div class="buttons">
      <button @click="Convert" class="convert">Convert</button>
      <button @click="Delete" class="delete">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      today: "",
    };
  },
  props: {
    appointment_data: Object,
  },
  async mounted() {
    this.Finduser();

    // generate a today  date
    this.today = await this.$store.dispatch("generateDate");
  },
  methods: {
    // delete method
    Delete() {
      // set the appointment_data's id in to store
      this.$store.state.appointment_id_for_delete = this.appointment_data._id;

      // change the confirm message status
      this.$store.commit("ChangeConfirmDeleteStatus");
    },

    // convert the user status of wating to current
    Convert() {
      // set the appointment_data's id in to store
      this.$store.state.appointment_id_for_delete = this.appointment_data._id;

      // change the confirm message status
      this.$store.commit("ChangeConfirmConvertStatus");
    },

    // find the user
    Finduser() {
      this.user = this.$store.state.users.find(
        (user) => user._id === this.appointment_data.user_id
      );

      console.log(this.user);
    },
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
    display: flex;
    justify-content: start;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin: 0px 5px;
    }

    width: 100%;
    height: auto;
    color: $font-light;
    border-bottom: 1px solid $border-color-dark;

    a {
      text-align: none;
      color: $font-light;
    }
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

    .today-chip {
      border: 1px solid $chips-form-blue-border;
      background-color: $chips-form-blue-body;
    }
  }

  .buttons {
    width: 100%;
    height: auto;

    .convert {
      padding: 5px 7px;
      font-size: $x-small;
      border-radius: 3px;
      margin-right: 5px;
      border: 1px solid $confirm-form-green-border;
      background-color: $confirm-form-green-body;
      color: $font-light;
      cursor: pointer;
      transition-duration: 0.5s;
    }

    .convert:hover {
      background-color: $confirm-form-green-border;
    }

    .delete {
      @extend .convert;
      border: 1px solid $confirm-form-red-border;
      background-color: $confirm-form-red-body;
    }

    .delete:hover {
      background-color: $confirm-form-red-border;
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
    display: flex;
    justify-content: start;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      border-radius: 3px;
      margin: 0px 5px;
    }

    width: 100%;
    height: auto;
    color: $font-dark;
    border-bottom: 1px solid $border-color-light;

    a {
      text-align: none;
      color: $font-dark;
    }
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

    .today-chip {
      border: 1px solid $chips-form-blue-border;
      background-color: $chips-form-blue-body;
    }
  }

  .buttons {
    width: 100%;
    height: auto;

    .convert {
      padding: 5px 7px;
      font-size: $x-small;
      border-radius: 3px;
      margin-right: 5px;
      border: 1px solid $confirm-form-green-border;
      background-color: $confirm-form-green-body;
      color: $font-dark;
      cursor: pointer;
      transition-duration: 0.5s;
    }

    .convert:hover {
      background-color: $confirm-form-green-border;
    }

    .delete {
      @extend .convert;
      border: 1px solid $confirm-form-red-border;
      background-color: $confirm-form-red-body;
    }

    .delete:hover {
      background-color: $confirm-form-red-border;
    }
  }
}
// light
</style>
