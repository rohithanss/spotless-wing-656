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
          activity_type,
          fee,
          slot,
          reg_date,
          traineeEmail,
          traineeId,
          traineeName,
          zoomLink,
        } in data"
        :id="id"
        :traineeEmail="traineeEmail"
        :traineeId="traineeId"
        :traineeName="traineeName"
        :activity_type="activity_type"
        :fee="fee"
        :slot="slot"
        :reg_date="reg_date"
        :zoomLink="zoomLink"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import BookedSlotInfo from "./BookedSlotInfo.vue";

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
    traineeId: "1",
    traineeName: "Rohit Hans",
    traineeEmail: "rhans@icloud.com",
    slot: "seven",
    zoomLink: "",
    reg_date: "2023-02-23",
    activity_type: "Yoga",
    fee: 1000,
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Fat Loss",
    fee: 1000,
    traineeId: "1",
    traineeName: "Rohit Hans",
    traineeEmail: "rhans@icloud.com",
    slot: "one",
    zoomLink: "",
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Gym",
    fee: 1500,

    traineeId: "1",
    traineeName: "Rohit Hans",
    traineeEmail: "rhans@icloud.com",
    slot: "ten",
    zoomLink: "",
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Diet",
    fee: 500,

    traineeId: "1",
    traineeName: "Rohit Hans",
    traineeEmail: "rhans@icloud.com",
    slot: "eight",
    zoomLink: "",
  },
  {
    id: "1",
    reg_date: "2023-02-23",
    activity_type: "Weight Gain",
    fee: 500,

    traineeId: "1",
    traineeName: "Rohit Hans",
    traineeEmail: "rhans@icloud.com",
    slot: "six",
    zoomLink: "",
  },
]);
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
