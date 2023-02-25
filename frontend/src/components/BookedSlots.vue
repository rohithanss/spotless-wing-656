<template>
  <div
    :style="{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
    }"
  >
    <h1>Booked Slots</h1>
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
      class="booked-slots"
      :style="{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }"
    >
      <BookedSlotInfo
        v-for="{
          id,
          type,
          fees,
          slot,
          booked_date,
          user: { name, email },
          booking_status,
          customer_id,

          zoom_link,
        } in data"
        :id="id"
        :traineeEmail="email"
        :traineeId="customer_id"
        :traineeName="name"
        :activity_type="type"
        :fee="fees"
        :slot="slot"
        :reg_date="booked_date"
        :zoomLink="zoom_link"
        :booking_status="booking_status"
        @update-details="
          (id, newZoomValue, newStatusValue) => {
            updateDetails(id, newZoomValue, newStatusValue);
          }
        "
      />
      <h1 v-if="data.length == 0" :style="{ color: 'red' }">
        No Data Available
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import BookedSlotInfo from "./BookedSlotInfo.vue";
import { getBookedSlots } from "../scripts/api.js";

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
  let day = searchDate.value?.getDate();
  let month = searchDate.value?.getMonth() + 1;
  let year = searchDate.value?.getFullYear();
  return (
    "" +
      year +
      (month < 10 ? "0" + month : month) +
      (day < 10 ? "0" + day : day) || "abc"
  );
});

const activity_type = computed(() => {
  return selectedTrainerTypes.value.map((el) => el.value);
});

const data = ref([]);

watchEffect(async () => {
  const res = await getBookedSlots(reg_date.value, activity_type.value);

  data.value = await res.data;
});

function updateDetails(id, newZoomValue, newStatusValue) {
  data.value.forEach((el, i) => {
    if (el.id == id) {
      data.value[i]["zoom_link"] = newZoomValue;
      data.value[i]["booking_status"] = newStatusValue;
    }
  });
}
</script>

<style scoped>
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
