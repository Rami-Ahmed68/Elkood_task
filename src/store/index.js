import { createStore } from "vuex";

export default createStore({
  state: {
    theme: window.localStorage.getItem("task_theme") || "dark",
    menu_status: "close",
    message_status: "close",
    scroll_status: "close",
    sid_bar_status: "close",
    confirm_delete_status: "close",
    confirm_convert_status: "close",
    appointment_id_for_delete: "",
    message: {
      type: "success",
      message: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid soluta
      alias earum quis totam! Fuga odit laudantium vero natus ea?`,
    },
    links_path: [
      { title: "Home", path: "/", condition: ["user", "admin"] },
      {
        title: "Log in",
        path: "/login",
        condition: [],
      },
      {
        title: "Register",
        path: "/register",
        condition: [],
      },
      {
        title: "install",
        path: "/install",
        condition: ["user", "admin"],
      },
      {
        title: "Profile",
        path: "/profile",
        condition: ["user", "admin"],
      },
      {
        title: "DashBoard",
        path: "/dashboard",
        condition: ["admin"],
      },
    ],
    dash_board_links_path: [
      { title: "Home", path: "/" },
      { title: "Users", path: "/dashboard" },
      { title: "Current patient", path: "/dashboard/current-patient" },
      { title: "Patients waiting", path: "/dashboard/patients-waiting" },
      { title: "All Appointment", path: "/dashboard/appointments" },
    ],
    data: {
      cont_one: {
        title: "D.Diaa El Din El Hamou",
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vitae non `,
      },
      cards: [
        {
          title: "Emergency cases",
          image:
            "https://images.pexels.com/photos/287237/pexels-photo-287237.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vitae non tempora qua sit amet consectetur adipisicing elit. Voluptas vitae non tempora qua sit amet consectetur adipisicing elit. Voluptas vitae non tempora qua",
        },
        {
          title: "Teeth whitening",
          image:
            "https://images.pexels.com/photos/3779705/pexels-photo-3779705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vitae non tem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vitae non tempora cum tenetur neque",
        },
        {
          title: "Cosmetic dentistry",
          image:
            "https://images.pexels.com/photos/3845766/pexels-photo-3845766.jpeg?auto=compress&cs=tinysrgb&w=600",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas vitae non tempora ",
        },
        {
          title: "Maxillofacial surgery",
          image:
            "https://images.pexels.com/photos/5355837/pexels-photo-5355837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          description:
            "Lorem ipscum tenetur possimus, itaque necessitatibus. Ipsa quasi tenetur possimus, itaque necessitatibus. Ipsa quasi tenetur possimus, itaque necessitatibus. Ipsa quasi tenetur possimus, itaque necessitatibus. Ipsa quasi tenetur possimus, itaque necessitatibus. Ipsa quasi ",
        },
      ],
      time_cards: [
        {
          day: "Saturday",
          description:
            "Lorem ipsum dolosectetur adipisicing elit. Volupt non tempora qua",
        },
        {
          day: "Sunday",
          description:
            "Lorem ipsuipsum dolor sluptas vitae non tempora cum tenetur neque",
        },
        {
          day: "Monday",
          description:
            "Lorem ipsum dolor sig elit. Voluptas vitae non tempora ",
        },
        {
          day: "Tuesday",
          description:
            "Lorem ipsnecessitatibus.u quasi ipsnecessitatibus. Ipsa quasi ",
        },
        {
          day: "Wednesday",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptasmpora ",
        },
        {
          day: "Thursday",
          description:
            "Lorem ipscum tenetur necessitatibus. Ipsa quasi tenetur ",
        },
      ],
      Blood_groupm: ["AB-", "B-", "AB+", "A-", "O-", "B+", "A+", "O+"],
      gender: [
        { title: "Male 🧑🏻", value: "Male" },
        { title: "Female 👩🏻", value: "Female" },
      ],
      appointment_type: [
        { title: "Pre Emptive", value: "pre-emptive" },
        { title: "Direct", value: "direct" },
        { title: "Emergency 🚨", value: "emergency" },
      ],
    },
    admin: {
      name: "Elkoo Task Admin",
      email_address: "elkood@gmail.com",
      phone_number: 12313123,
      password: "elkood1234567",
      gender: "Male",
    },
    current_user:
      JSON.parse(window.localStorage.getItem("elkood_task_current_user")) || "",
    users: JSON.parse(window.localStorage.getItem("elkood_task_users")) || [],
    appointments:
      JSON.parse(window.localStorage.getItem("elkood_task_appointments")) || [],
    current_user_appointments: [],
    current_patient:
      JSON.parse(window.localStorage.getItem("elkood_task_current_patient")) ||
      "",
  },
  getters: {},
  mutations: {
    // change the theme
    ChangeTheme(state) {
      state.theme = state.theme == "dark" ? "light" : "dark";

      // sav ethe new theme in localStorage
      window.localStorage.setItem("task_theme", state.theme);
    },

    // chnage the menu status open | close
    ChangeMenuStatus(state) {
      state.menu_status = state.menu_status == "close" ? "open" : "close";
    },

    // change the message status open | close
    ChangeMessageStatus(state) {
      state.message_status = state.message_status == "open" ? "close" : "open";
    },

    // close the message
    CloseMessage(state) {
      state.message_status = "close";
    },

    // change the message status to close after 5s
    CloseMessageAfter5s(state) {
      setTimeout(() => {
        state.message_status = "close";
      }, 5000);
    },

    // change sid bar status
    ChangeSidBarStatus(state) {
      state.sid_bar_status = state.sid_bar_status == "close" ? "open" : "close";
    },

    // change the confirm delete status
    ChangeConfirmDeleteStatus(state) {
      // change confirm convert form
      state.confirm_convert_status = "close";

      // change confirm delete form
      state.confirm_delete_status =
        state.confirm_delete_status == "close" ? "open" : "close";
    },

    // change the confirm convert status
    ChangeConfirmConvertStatus(state) {
      // change confirm convert form
      state.confirm_convert_status =
        state.confirm_convert_status == "close" ? "open" : "close";

      // change confirm delete form
      state.confirm_delete_status = "close";
    },

    // log out method (delete the current user from localStorage)
    LogOut() {
      // delete the current user of the localstorage
      window.localStorage.removeItem("elkood_task_current_user");

      // send the user to home page
      window.location = "/"; // I used the localtion here to reload the page and move to the home page
    },
  },
  actions: {
    // generating date method
    generateDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0"); // الأشهر تبدأ من 0
      const year = today.getFullYear();

      return `${day}-${month}-${year}`;
    },
  },
  modules: {},
});
