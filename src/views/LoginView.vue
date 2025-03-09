<template>
  <div :class="`login-page-${this.$store.state.theme}`">
    <div class="form" v-if="!this.$store.state.current_user">
      <h1>Login page</h1>

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

      <button @click="LogIn">Log in</button>
    </div>

    <button v-else class="log_out" @click="this.$store.commit('LogOut')">
      Log out
    </button>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";

export default {
  data() {
    return {
      email_address: "",
      password: "",
      input_type: "password",
      icon_type: "eye",
    };
  },
  methods: {
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

    // compare the passwords method
    async compare_password(current_password, new_password) {
      return await bcrypt.compare(new_password, current_password);
    },

    // log in method find email and comparing the password
    async LogIn() {
      // check if the user typed the email and password
      if (this.email_address == "" || this.password == "") {
        this.SetMessgae("error", "Sorry, Email and password required");
      }

      // find the user by email
      const user = this.$store.state.users.find(
        (user) => user.email_address === this.email_address
      );

      // check if the user is exists
      if (!user) {
        // set a message
        return this.SetMessgae("error", "Sorry, Invalid email or password");
      }

      // compare the password
      const password_comparing = await this.compare_password(
        user.password,
        this.password
      );

      // check if password_comparing is false and return error
      if (!password_comparing) {
        // set a message
        return this.SetMessgae("error", "Sorry, Invalid email or password");
      }

      // save the registerd user ass a current user in  localStorage
      window.localStorage.setItem(
        "elkood_task_current_user",
        JSON.stringify({
          account_type: user.account_type,
          user_data: user,
        })
      );

      // set a message
      this.SetMessgae(
        "success",
        `loged in successfully, welcome back ${user.name} 👋🎉`
      );

      // emptying the input
      this.email_address = "";
      this.password = "";

      // send the user to profile page
      window.location = "/profile";
    },
  },
};
</script>

<style lang="scss">
@import "../sass/varibels";
// dark
.login-page-dark {
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
.login-page-light {
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
      border-color: transparent transparent $border-color-light transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    input {
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
        background-color: $input-light;
        color: $font-dark;
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
