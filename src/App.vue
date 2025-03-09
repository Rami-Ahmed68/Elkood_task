<template>
  <div :class="`app-${this.$store.state.theme}`">
    <NavComponent v-if="!$route.path.includes('/dashboard')" />
    <transition name="slide">
      <router-view />
    </transition>

    <MessageComponent />
    <IconComponent
      v-if="
        this.$route.name != 'login' &&
        this.$route.name != 'register' &&
        this.$route.name != 'appointment' &&
        !$route.path.includes('dashboard') &&
        this.$store.state.current_user.account_type != 'admin' &&
        this.$store.state.current_user
      "
    />
    <ScrollToToComponent />
    <ConfirmDeleteComponent />
    <ConfirmConvertComponent />
  </div>
</template>

<script>
import NavComponent from "@/components/global/NavComponnet";
import MessageComponent from "./components/global/MessageComponent.vue";
import IconComponent from "./components/global/IconComponent.vue";
import ScrollToToComponent from "./components/global/ScrollToToComponent.vue";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import ConfirmDeleteComponent from "./components/global/forms/ConfirmDeleteComponent.vue";
import ConfirmConvertComponent from "./components/global/forms/ConfirmConvertComponent.vue";

export default {
  data() {
    return {};
  },
  components: {
    NavComponent,
    MessageComponent,
    IconComponent,
    ScrollToToComponent,
    ConfirmDeleteComponent,
    ConfirmConvertComponent,
  },
  mounted() {
    // window.localStorage.removeItem("elkood_task_users");
    // check if there is a admin in store
    if (this.$store.state.users.length == 0) {
      // call to add admin method
      this.addAdmin();
    }

    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // scroll method
    handleScroll() {
      this.$store.state.scroll_status = window.scrollY > 200 ? "open" : "close";
    },

    // hashing password method
    async hash_password(password) {
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.VUE_APP_SaltRounds)
      );

      return hashedPassword;
    },

    // add admin method
    async addAdmin() {
      // generate a Unique id
      const _id = uuidv4();

      // setting up admin's data and push in to users array
      this.$store.state.users.push({
        _id: _id,
        name: "Elkoo Task Admin",
        account_type: "admin",
        phone_number: this.$store.state.phone_number,
        email_address: this.$store.state.admin.email_address,
        password: await this.hash_password(this.$store.state.admin.password),
        gender: this.$store.state.admin.gender,
        avatar:
          this.$store.state.admin.gender == "Male"
            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ-3jLxfzm1RxHzXrF_oguAtAD8OcUG6_hKg&s"
            : "https://cdn-icons-png.flaticon.com/512/65/65581.png",
        joind_at: await this.$store.dispatch("generateDate"),
      });

      // add a new admin just for testing ass an admin
      window.localStorage.setItem(
        "elkood_task_users",
        JSON.stringify(this.$store.state.users)
      );
    },
  },
};
</script>

<style lang="scss">
@import "./sass/varibels";

// dark
.app-dark {
  background-color: $dark-theme;
  width: 100%;
  min-height: 100vh;
  transition-duration: 0.4s;
}
// dark

// light
.app-light {
  background-color: $light-theme;
  width: 100%;
  min-height: 100vh;
  transition-duration: 0.4s;
}
// light

.slide-enter-active {
  animation: slideIn 0.4s ease-out;
}

.slide-leave-active {
  animation: slideOut 0.4s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateY(40px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-60px);
    opacity: 0;
  }
}
</style>
