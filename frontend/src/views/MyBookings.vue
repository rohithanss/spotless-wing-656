<template>
  <div class="main">
    <h1>My Bookings Page</h1>
    <MyBookingInfo />
  </div>
</template>

<script setup>
import MyBookingInfo from "../components/MyBookingInfo.vue";
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
