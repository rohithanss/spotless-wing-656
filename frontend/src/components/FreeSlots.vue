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
        <Calendar v-model="searchDate" :showTime="false" />
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
        v-for="{ id, activity_type, fee, slots, reg_date } in data"
        :id="id"
        :activity_type="activity_type"
        :fee="fee"
        :slots="slots"
        :reg_date="reg_date"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FreeSlotInfo from "./FreeSlotInfo.vue";

const trainerTypes = ref([
  { type: "Gym", value: "Gym" },
  { type: "Yoga", value: "Yoga" },
  { type: "Diet", value: "Diet" },
  { type: "Fat Loss", value: "Fat Loss" },
  { type: "Weight Gain", value: "Weight Gain" },
]);

const selectedTrainerTypes = ref([...trainerTypes.value]);

const searchDate = ref(new Date());

const date = computed(() => {
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

const data = ref([
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Yoga",
    fee: 1000,
    six: true,
    seven: true,
    six_eve: true,
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Fat Loss",
    fee: 1000,
    six: true,
    seven: true,
    six_eve: true,
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Gym",
    fee: 1500,

    ten: true,
    eleven: true,
    four: true,
    five: true,
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Diet",
    fee: 500,

    eight: true,
    twelve: true,
    three: true,
    seven_eve: true,
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Weight Gain",
    fee: 500,

    eight: true,
    twelve: true,
    three: true,
    seven_eve: true,
  },
]);

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
