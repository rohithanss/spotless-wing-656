<template>
  <nav>
    <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
      <RouterLink to="/">
        <!-- <img class="logo" src="./images/abc.png" alt=""
      /> -->
        <h2 style="color: var(--text-color)">
          <span style="color: var(--primary-color)">Broh</span> Fitness
        </h2>
      </RouterLink>
      <p
        :style="{ color: 'var(--text-color)' }"
        v-if="profile.role == 'trainer'"
      >
        For
        <span :style="{ color: 'var(--primary-color)', fontWeight: '600' }"
          >Trainers</span
        >
      </p>
    </div>
    <div class="navLinks" v-if="profile.status == false">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trainings">Live Trainings</RouterLink>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Create Account</RouterLink>
    </div>
    <div
      class="navLinks"
      v-if="profile.status == true && profile.role == 'trainer'"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/createslots">Create Slots</RouterLink>
      <RouterLink to="/slotstatus">Slots Status</RouterLink>
      <RouterLink
        to="/profile"
        :style="{ color: 'var(--text-color-secondary)', fontWeight: '700' }"
        >Profile({{ profile.name }})</RouterLink
      >

      <RouterLink to="#" :onclick="logout">Logout</RouterLink>
    </div>
    <div
      class="navLinks"
      v-if="profile.status == true && profile.role == 'user'"
    >
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trainings">Live Trainings</RouterLink>
      <RouterLink to="/courses">Courses</RouterLink>
      <RouterLink to="/mybookings">My Bookings</RouterLink>
      <RouterLink
        to="/profile"
        :style="{ color: 'var(--text-color-secondary)', fontWeight: '700' }"
      >
        Profile({{ profile.name }})</RouterLink
      >

      <RouterLink to="#" :onclick="logout">Logout</RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";

const props = defineProps(["profile"]);
const emits = defineEmits(["logout"]);
function logout() {
  // console.log("logging out");
  emits("logout");
}
</script>

<style scoped>
nav {
  display: flex;
  width: 100vw;
  padding: 10px 30px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-200);
  position: sticky;
  top: 0;
  z-index: 2;
}

.logo {
  height: 50px;
}
.navLinks {
  display: flex;
  align-items: center;
  gap: 15px;
}
a {
  color: var(--text-color);
  text-decoration: none;
  font-weight: 600;
}
a:hover {
  color: var(--primary-color);
}
.router-link-active {
  color: var(--primary-color);
}
</style>
