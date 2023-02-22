<template>
  <nav>
    <div>
      <RouterLink to="/">
        <img class="logo" src="BrohFitness.png" alt=""
      /></RouterLink>
    </div>
    <div class="navLinks">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trainings">Live Trainings</RouterLink>
      <RouterLink to="/accessories">Courses</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
      <RouterLink to="/signup">Create Account</RouterLink>
    </div>
    <!-- <div class="navLinks">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trainings">Create Slots</RouterLink>
      <RouterLink to="/accessories">Slots Status</RouterLink>
      <RouterLink to="/login">Logout</RouterLink>
    </div> -->
    <!-- <div class="navLinks">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/trainings">Live Trainings</RouterLink>
      <RouterLink to="/accessories">Courses</RouterLink>
      <RouterLink to="/trainings">My Bookings</RouterLink>
      <RouterLink to="/login">Logout</RouterLink>
    </div> -->
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
nav {
  display: flex;
  width: 100vw;
  padding: 10px 30px;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-200);
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
