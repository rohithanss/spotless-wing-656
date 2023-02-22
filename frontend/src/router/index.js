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
      name: "training",

      component: () => import("../views/Trainings.vue"),
    },
    {
      path: "/accessories",
      name: "accessories",

      component: () => import("../views/Accessories.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",

      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
