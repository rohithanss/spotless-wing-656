<script setup>
import { ref, inject } from "vue";
import { RouterLink, RouterView } from "vue-router";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

const isLoggedIn = inject("isLoggedIn");
const url = inject("backendURL");
const prof = ref({ status: false });
async function abc() {
  prof.value = await isLoggedIn(url);
  console.log(prof.value);
}
abc();

async function logout() {
  let token = localStorage.getItem("token");
  localStorage.removeItem("token");
  window.location = "/";
  return;
  try {
    let res = await axios.post(
      `${url}/user/logout`,
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    res = await res.data;
    prof.value = { status: false };
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
</script>

<template>
  <Toast />
  <NavBar :profile="prof" @logout="logout" />
  <RouterView :profile="prof" />
  <Footer />
</template>

<style scoped></style>
