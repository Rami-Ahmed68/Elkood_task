<template>
  <div :class="`register-${this.$store.state.theme}`">
    <div class="form" v-if="!this.$store.state.current_user">
      <h1>Register</h1>

      <!-- name section -->
      <label for="name"
        >Name * <span>{{ this.name.length }}</span></label
      >

      <input
        id="name"
        type="text"
        placeholder="✍ Type you'r name here"
        v-model="this.name"
      />
      <!-- name section -->

      <!-- phone number section -->
      <label for="phone_number"
        >Phone Number 📞 * <span>{{ this.phone_number.length }}</span></label
      >
      <input
        id="phone_number"
        type="number"
        placeholder="✍ Type you'r phone number here"
        v-model="this.phone_number"
      />
      <!-- phone number section -->

      <!-- email address section -->
      <label for="email_address"
        >Email Address 📧 * <span>{{ this.email_address.length }}</span></label
      >
      <input
        id="email_address"
        type="text"
        placeholder="✍ Type you'r email address here"
        v-model="this.email_address"
      />
      <!-- email address section -->

      <!-- password section -->
      <label for="password"
        >Password 🔑 * <span>{{ this.password.length }}</span></label
      >

      <div class="password-cont">
        <icon :icon="this.icon_type" @click="show_password" />
        <input
          id="password"
          :type="this.input_type"
          placeholder="✍ Type you'r password here"
          v-model="this.password"
        />
      </div>
      <!-- password section -->

      <!-- blood groupm section -->
      <label for="blood_groupm">Blood Groupm 🩸 *</label>

      <select name="" id="blood_groupm" v-model="this.blood_groupm">
        <option
          v-for="(blood, index) in this.$store.state.data.Blood_groupm"
          :key="index"
          :value="blood"
        >
          {{ blood }}
        </option>
      </select>
      <!-- blood groupm section -->

      <!-- gender section -->
      <label for="gender">Gender ⚧ *</label>

      <select name="" id="gender" v-model="this.gender">
        <option
          v-for="(gender, index) in this.$store.state.data.gender"
          :key="index"
          :value="gender.value"
        >
          {{ gender.title }}
        </option>
      </select>
      <!-- gender section -->

      <button @click="Register">Register</button>
    </div>

    <button v-else class="log_out" @click="this.$store.commit('LogOut')">
      Log out
    </button>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      name: "",
      phone_number: "",
      email_address: "",
      password: "",
      blood_groupm: "O+",
      gender: "Male",
      input_type: "password",
      icon_type: "eye",
    };
  },
  methods: {
    // show | hidde the password by chaging the input type
    show_password() {
      // change the input type
      this.input_type = this.input_type == "password" ? "text" : "password";

      // change the icon type
      this.icon_type = this.icon_type == "eye" ? "eye-slash" : "eye";
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

    // hashing password method
    async hash_password(password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.VUE_APP_SaltRounds)
      );

      return hashedPassword;
    },

    // validate email type
    validation_email() {
      const regex = /\w+\d@(\w+|\d)?gmail.(com|org|store)/gi;

      // check if the typed email is false
      if (!regex.test(this.email_address)) {
        return false;
      } else {
        return true;
      }
    },

    // register method
    async Register() {
      // check if the user added the all data or not
      if (
        this.name == "" ||
        this.phone_number == "" ||
        this.email_address == "" ||
        this.password == "" ||
        this.blood_groupm == "" ||
        this.gender == ""
      ) {
        // set a message
        this.SetMessgae(
          "error",
          "Sorry, all data must be filled in to complete the registration process."
        );
      }

      // check if the email is alrady used
      if (
        this.$store.state.users.find(
          (user) => user.email_address === this.email_address
        )
      ) {
        // set a message
        return this.SetMessgae(
          "error",
          "Sorry, the email is already in use. Try logging in."
        );
      }

      // check of the validation_email result type
      if (!(await this.validation_email())) {
        // return and set a message
        return this.SetMessgae("error", "Sorry, invalid email format .");
      }

      // generate a Unique id
      const _id = uuidv4();

      // create and save the new user in data data base (localStorage) ^_-
      let user = {
        _id: _id,
        account_type: "user",
        status: "out",
        name: this.name,
        phone_number: this.phone_number,
        avatar:
          this.gender == "Male"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-3jLxfzm1RxHzXrF_oguAtAD8OcUG6_hKg&s"
            : "https://cdn-icons-png.flaticon.com/512/65/65581.png",
        email_address: this.email_address,
        password: await this.hash_password(this.password),
        blood_groupm: this.blood_groupm,
        gender: this.gender,
        appointments: [],
        joind_at: await this.$store.dispatch("generateDate"),
      };

      // add the created use to the users  method in store
      this.$store.state.users.push(user);

      // save the users's array in data base localStorage
      window.localStorage.setItem(
        "elkood_task_users",
        JSON.stringify(this.$store.state.users)
      );

      // save the registerd user ass a current user in  localStorage
      window.localStorage.setItem(
        "elkood_task_current_user",
        JSON.stringify({
          account_type: "user",
          user_data: user,
        })
      );

      // set a message
      this.SetMessgae("success", "Registerd successfully 🥳");

      // emptying the input's data
      this.name = "";
      this.phone_number = "";
      this.email_address = "";
      this.password = "";

      // send the user t home page
      window.location = "/profile";
    },
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";
// dark
.register-dark {
  width: 80%;
  height: 100%;
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

    .password-cont {
      @extend input;
      position: relative;
      padding: 0px;

      input {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 0px 10px;
        background-color: $input-dark;
        color: $font-light;
      }

      svg {
        position: absolute;
        right: 2px;
        top: 2px;
        border-radius: 3px;
        padding: 10px;
        background-color: $boold-blue;
        cursor: pointer;
        color: $font-light;
        transition-duration: 0.5s;
      }

      svg:hover {
        background-color: $boold-blue;
      }
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

  .log_out {
    padding: 10px 15px;
    border-radius: 5px;
    outline: none;
    color: $font-light;
    border: 1px solid $error-message-border;
    background-color: $error-message-body;
    cursor: pointer;
    transition-duration: 0.5s;
  }

  .log_out:hover {
    background-color: $error-message-border;
  }
}
// dark

// light
.register-light {
  width: 80%;
  height: 100%;
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
      border-color: transparent transparent $border-color-light transparent;
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

    .password-cont {
      @extend input;
      position: relative;
      padding: 0px;

      input {
        width: 100%;
        height: 40px;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 0px 10px;
        color: $font-dark;
      }

      svg {
        position: absolute;
        right: 2px;
        top: 2px;
        border-radius: 3px;
        padding: 10px;
        background-color: $button-blue-one;
        cursor: pointer;
        color: $font-dark;
        transition-duration: 0.5s;
      }

      svg:hover {
        background-color: $button-blue-tow;
      }
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

  .log_out {
    padding: 10px 15px;
    border-radius: 5px;
    outline: none;
    color: $font-dark;
    border: 1px solid $error-message-border;
    background-color: $error-message-body;
    cursor: pointer;
    transition-duration: 0.5s;
  }

  .log_out:hover {
    background-color: $error-message-border;
  }
}
// light
</style>
