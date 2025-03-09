import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ProfileView from "@/views/ProfileView.vue";
import InstallView from "@/views/InstallView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import AppointmentView from "@/views/AppointmentView.vue";
import DashBoardView from "@/views/DashBoardView.vue";
import UserView from "@/views/UserView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

// dashboard children
import UsersView from "@/views/dashboard/UsersView.vue";
import WaitingView from "@/views/dashboard/WaitingView.vue";
import CurrentPatientView from "@/views/dashboard/CurrentPatientView.vue";
import AppointmentsView from "@/views/dashboard/AppointmentsView.vue";
// dashboard children

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home 🏠",
      keywords: ["elkood", "task", "home"],
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    meta: {
      title: "Profile 🙎🏻‍♂️",
      keywords: ["elkood", "task", "profile"],
    },
  },
  {
    path: "/user/:id",
    name: "user",
    component: UserView,
    meta: {
      title: "User 🙎🏻‍♂️",
      keywords: ["elkood", "task", "user"],
    },
  },
  {
    path: "/appointment",
    name: "appointment",
    component: AppointmentView,
    meta: {
      title: "Book Appointment 📆🩺",
      keywords: ["elkood", "task", "appointment"],
    },
  },
  {
    path: "/install",
    name: "install",
    component: InstallView,
    meta: {
      title: "Install App 📥",
      keywords: ["elkood", "task", "install app"],
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      title: "Register 🔐",
      keywords: ["elkood", "task", "register"],
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      title: "Log in 🔓",
      keywords: ["elkood", "task", "log in"],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashBoardView,
    meta: {
      title: "Dashboard 🎛️",
      keywords: ["elkood", "task", "dashboard"],
    },
    children: [
      {
        path: "",
        name: "dash-board-users",
        component: UsersView,
        meta: {
          title: "Dashboard Users 👥",
          keywords: ["elkood", "task", "dash-board-users", "users", "dash"],
        },
      },
      {
        path: "patients-waiting",
        name: "dash-board-patients-waiting",
        component: WaitingView,
        meta: {
          title: "Dashboard Patients ⏳",
          keywords: ["elkood", "task", "dash-board-patients-waiting", "dash"],
        },
      },
      {
        path: "current-patient",
        name: "dash-board-current-patient",
        component: CurrentPatientView,
        meta: {
          title: "Dashboard Ccurrent patient 🤒",
          keywords: ["elkood", "task", "current-patient", "dash"],
        },
      },
      {
        path: "appointments",
        name: "dash-board-appointments",
        component: AppointmentsView,
        meta: {
          title: "Dashboard Appointments 📆🩺",
          keywords: ["elkood", "task", "dash-board-appointments", "dash"],
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found-page",
    component: NotFoundView,
    meta: {
      title: "Not Found 404 🤷‍♂️",
      keywords: ["not found", "404"],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;

  document
    .querySelector('meta[name="keywords"]')
    ?.setAttribute("content", to.meta.keywords.join(", "));

  next();
});

export default router;
