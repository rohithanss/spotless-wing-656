<template>
  <div class="main">
    <FreeSlots />
    <hr :style="{ width: '80%' }" />
    <BookedSlots />
  </div>
</template>

<script setup>
import BookedSlots from "../components/BookedSlots.vue";
import FreeSlots from "../components/FreeSlots.vue";
</script>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
</style>
