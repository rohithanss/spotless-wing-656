<template>
  <div class="main">
    <h1>My Bookings Page</h1>
    <div class="filterSection">
      <div>
        <p>Select Date:</p>
        <Calendar
          v-model="searchDate"
          :showTime="false"
          :showButtonBar="true"
        />
      </div>

      <div>
        <p>Filter By Training Type:</p>
        <MultiSelect
          :style="{ width: '150px' }"
          v-model="selectedTrainerTypes"
          :options="trainerTypes"
          optionLabel="type"
          placeholder="Select Type"
        />
      </div>
    </div>
    <div
      :style="{
        width: '100%',
      }"
    >
      <MyBookingInfo
        v-for="{
          id,
          slot,
          type,
          zoom_link,
          booked_date,
          booking_status,
          fees,
          user: { email, name },
        } in data"
        :key="id"
        :trainerEmail="email"
        :trainerName="name"
        :slot="slot"
        :reg_date="booked_date"
        :zoomLink="zoom_link"
        :activity_type="type"
        :status="booking_status"
        :fee="fees"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

import MyBookingInfo from "../components/MyBookingInfo.vue";

import { getMyBookings } from "../scripts/api.js";

const trainerTypes = ref([
  { type: "Gym", value: "Gym" },
  { type: "Yoga", value: "Yoga" },
  { type: "Diet", value: "Diet" },
  { type: "Fat Loss", value: "Fat Loss" },
  { type: "Weight Gain", value: "Weight Gain" },
]);

const selectedTrainerTypes = ref([...trainerTypes.value]);

const searchDate = ref(null);

const reg_date = computed(() => {
  if (searchDate.value == null) return "nodate";
  let day = searchDate.value.getDate();
  let month = searchDate.value.getMonth() + 1;
  let year = searchDate.value.getFullYear();
  return (
    "" +
    year +
    (month < 10 ? "0" + month : month) +
    (day < 10 ? "0" + day : day)
  );
});

const activity_type = computed(() => {
  return selectedTrainerTypes.value.map((el) => el.value);
});

const data = ref([]);

watchEffect(async () => {
  const res = await getMyBookings(reg_date.value, activity_type.value);
  data.value = await res.data;
});
</script>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  margin: 30px 0;
}

.filterSection {
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.filterSection > div {
  display: flex;
  align-items: center;
  gap: 5px;
}
.filterSection > div p {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}
</style>
