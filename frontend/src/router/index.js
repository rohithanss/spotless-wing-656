import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",

      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/signup",
      name: "signup",

      component: () => import("../views/SignupView.vue"),
    },
    {
      path: "/trainings",
      name: "trainings",

      component: () => import("../views/Trainings.vue"),
    },
    {
      path: "/mybookings",
      name: "mybookings",

      component: () => import("../views/MyBookings.vue"),
    },
    {
      path: "/createslots",
      name: "createslots",

      component: () => import("../views/CreateSlots.vue"),
    },
    {
      path: "/mybookings",
      name: "mybookings",

      component: () => import("../views/MyBookings.vue"),
    },
    {
      path: "/slotstatus",
      name: "slotstatus",

      component: () => import("../views/SlotsStatus.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",

      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
