<template>
  <div class="main">
    <h1 :style="{ color: 'var(--text-color)' }">
      Choose the time and dates fits you
    </h1>
    <div class="filterSection">
      <div>
        <p>Select Date:</p>
        <Calendar v-model="searchDate" :showTime="false" />
      </div>
      <div>
        <p>Sort By Fees:</p>
        <Dropdown
          v-model="sort"
          :options="sortOptions"
          optionLabel="name"
          placeholder="Sort By Fee"
        />
      </div>
      <div>
        <p>Filter By Trainer Type:</p>
        <MultiSelect
          :style="{ width: '150px' }"
          v-model="selectedTrainerTypes"
          :options="trainerTypes"
          optionLabel="type"
          placeholder="Select Trainer Type"
        />
      </div>
    </div>
    <div
      :style="{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        margin: '20px 0',
      }"
    >
      <TrainingInfo
        v-for="{
          id,
          trainer_id,
          name,
          email,
          activity_type,
          slots,
          fees,
          reg_date,
        } in data"
        :trainer_id="trainer_id"
        :name="name"
        :email="email"
        :activity_type="activity_type"
        :fee="fees"
        :slots="slots"
        :reg_date="reg_date"
        :key="id"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";

import TrainingInfo from "../components/TrainingInfo.vue";
import { getAllTrainings } from "../scripts/api.js";

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

const sort = ref({});
const sortOptions = [
  { name: "High to Low", value: "desc" },
  { name: "Low to High", value: "asc" },
];

const activity_type = computed(() => {
  return selectedTrainerTypes.value.map((el) => el.value);
});

const data2 = ref([]);

watchEffect(async () => {
  const res = await getAllTrainings(
    reg_date.value,
    activity_type.value,
    sort.value.value
  );
  data2.value = await res.data;
});

const data = computed(() => {
  data2.value.forEach((el, i) => {
    let slots = slotsObj(data2.value[i], allSlots);
    data2.value[i]["slots"] = slots;
  });
  return data2.value;
});

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
</script>

<style scoped>
.main {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
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
