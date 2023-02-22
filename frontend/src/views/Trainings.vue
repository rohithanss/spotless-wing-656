<template>
  <div class="main">
    <h1>Choose the time and dates fits you</h1>
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
    {{ sort }}
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const trainerTypes = ref([
  { type: "Gym", value: "gym" },
  { type: "Yoga", value: "yoga" },
  { type: "Gym", value: "gym" },
  { type: "Yoga", value: "yoga" },
  { type: "Gym", value: "gym" },
  { type: "Yoga", value: "yoga" },
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

const sort = ref();
const sortOptions = [
  { name: "High to Low", value: "desc" },
  { name: "Low to High", value: "asc" },
];
</script>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.filterSection {
  width: 80%;
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
}
</style>
