<template>
  <div class="main">
    <h1>Open Slots for Booking and Start Earning</h1>
    <form @submit.prevent="createSlot" class="create-slot-form">
      <div class="slot-date">
        <p>Select Date:</p>
        <Calendar v-model="slotDate" :showTime="false" />
      </div>
      <div class="slot-category">
        <p>Select Category:</p>
        <Dropdown
          v-model="category"
          :options="categoryOptions"
          optionLabel="name"
          placeholder="Select Category"
        />
      </div>
      <div class="slot-fee">
        <p>Session Fee:</p>
        <InputText type="number" v-model="fee" />
      </div>
      <div class="select-slots">
        <p :style="{ fontSize: '1.2rem' }">Select Slots timing:</p>
        <div>
          <div v-for="(time, key) in allSlots">
            <Checkbox v-model="slots" :value="key" />
            <p>{{ time }}</p>
          </div>
        </div>
      </div>
      <div
        class="slot-btn"
        :style="{
          width: '100%',
          display: 'flex',
          gridArea: 'slotBtn',
          justifyContent: 'space-evenly',
          marginTop: '20px',
        }"
      >
        <Button
          class="p-button-danger"
          :style="{ fontSize: '1.5rem', fontWeight: '600' }"
          @click="resetForm"
          label="Reset Form"
        />
        <Button
          class="p-button-success"
          :style="{ fontSize: '1.5rem', fontWeight: '600' }"
          type="submit"
          label="Open Slots"
          :loading="isLoading"
          :disabled="isLoading"
        />
      </div>
    </form>
    {{ date }}
    {{ category }}
    {{ slots }}
    {{ fee }}
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const slots = ref([]);
const slotDate = ref(new Date());
const category = ref("");
const fee = ref(0);
const isLoading = ref(false);

const date = computed(() => {
  let day = slotDate.value.getDate();
  let month = slotDate.value.getMonth() + 1;
  let year = slotDate.value.getFullYear();
  return (
    "" +
    year +
    (month < 10 ? "0" + month : month) +
    (day < 10 ? "0" + day : day)
  );
});

const categoryOptions = ref([
  { name: "Gym", value: "Gym" },
  { name: "Yoga", value: "Yoga" },
  { name: "Diet", value: "Diet" },
  { name: "Fat Loss", value: "Fat Loss" },
  { name: "Weight Gain", value: "Weight Gain" },
]);

async function createSlot() {
  //create slot
  console.log("creating slots");
}

function resetForm() {
  slots.value = [];
  slotDate.value = new Date();
  category.value = "";
  fee.value = 0;
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
  gap: 30px;
}

.create-slot-form {
  width: 80%;
  display: grid;
  grid-template-areas:
    "date category fee"
    "selectSlots selectSlots selectSlots"
    "slotBtn slotBtn slotBtn";
  gap: 20px;
  margin: 20px 0;
}

.slot-date {
  grid-area: date;
}
.slot-category {
  grid-area: category;
}
.slot-fee {
  grid-area: fee;
}
.create-slot-form .select-slots {
  width: 100%;
  grid-area: selectSlots;
  gap: 20px;
  flex-direction: column;
}
.select-slots > div {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
}
.select-slots > div > div {
  display: flex;
  align-items: center;
  gap: 20px;
}
.create-slot-form > div {
  display: flex;
  align-items: center;
  gap: 5px;
}
.create-slot-form > div p {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}
</style>
