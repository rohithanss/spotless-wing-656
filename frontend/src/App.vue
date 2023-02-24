<script setup>
import { ref, inject } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

// const isLoggedIn = inject("isLoggedIn");

import { isLoggedIn, logout } from "./scripts/api.js";

const url = inject("backendURL");
const prof = ref({ status: false });
async function abc() {
  try {
    prof.value = await isLoggedIn();
    console.log(prof.value);
  } catch {
    prof.value = { status: false };
  }
}

async function doLogout() {
  try {
    await logout();
  } catch {
    console.log("err while logging out");
  }
}
abc();
</script>

<template>
  <Toast />
  <NavBar :profile="prof" @logout="doLogout" />
  <RouterView :profile="prof" />
  <Footer />
</template>

<style scoped></style>
