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
    <h1>Free Slots</h1>
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
      class="free-slots"
      :style="{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '20px',
      }"
    >
      <FreeSlotInfo
        v-show="data.length > 0"
        v-for="{ id, activity_type, fees, slots, reg_date } in data"
        :id="id"
        :activity_type="activity_type"
        :fee="fees"
        :slots="slots"
        :reg_date="reg_date"
        :key="id"
        @reserveSlot="
          (slot) => {
            updateSlotData(id, slot);
          }
        "
        @deleteAll="
          (id) => {
            deleteAllSlot(id);
          }
        "
      />

      <h1 v-show="data.length < 1" :style="{ color: 'red' }">
        No Slots Available for Selected Criteria
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import FreeSlotInfo from "./FreeSlotInfo.vue";

import { getFreeSlots } from "../scripts/api.js";

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

const data2 = ref([]);

watchEffect(async () => {
  const res = await getFreeSlots(reg_date.value, activity_type.value);
  data2.value = await res.data;
});

const data = computed(() => {
  data2.value.forEach((el, i) => {
    let slots = slotsObj(data2.value[i], allSlots);
    data2.value[i]["slots"] = slots;
  });
  return data2.value;
});

function updateSlotData(id, slot) {
  data2.value.forEach((el, i) => {
    if (el.id == id) {
      console.log(el);
      data2.value[i][slot] = false;
    }
  });
}

function deleteAllSlot(id) {
  let idx;
  data2.value.forEach((el, i) => {
    if (el.id == id) {
      idx = i;
    }
  });
  data.value.splice(idx, 1);
}

function slotsObj(data, allSlots) {
  let slotsArr = [];

  for (let k in data) {
    if (allSlots[k] != undefined && data[k]) {
      let obj = {};
      obj["time"] = allSlots[k];
      obj["value"] = k;
      slotsArr.push(obj);
    }
  }

  return slotsArr;
}

const allSlots = {
  six: "06:00 AM",
  seven: "07:00 AM",
  eight: "08:00 AM",
  nine: "06:00 AM",
  ten: "10:00 AM",
  eleven: "11:00 AM",
  twelve: "12:00 PM",
  one: "01:00 PM",
  two: "02:00 PM",
  three: "3:00 PM",
  four: "04:00 PM",
  five: "05:00 PM",
  six_eve: "06:00 PM",
  seven_eve: "07:00 PM",
  eight_eve: "08:00 PM",
};

data.value.forEach((el, i) => {
  let slots = slotsObj(data.value[i], allSlots);
  data.value[i]["slots"] = slots;
});
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
