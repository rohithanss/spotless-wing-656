<template>
  <div
    :style="{
      width: '70%',
      'box-shadow': 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      padding: '20px',
      borderRadius: '5px',
    }"
  >
    <div
      :style="{
        backgroundColor: backgroundColor,
        color: 'white',
        fontWeight: '700',
        fontSize: '2rem',
        height: '13rem',
        width: '13rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      <p>{{ activity_type }}</p>
    </div>

    <div :style="{ width: '50%' }">
      <table>
        <tr>
          <th>Trainer:</th>
          <td>{{ name }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ activity_type }}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>{{ email }}</td>
        </tr>
        <tr>
          <th>Fee(per session):</th>
          <td>Rs. {{ fee }}</td>
        </tr>
        <tr>
          <th>Time Slot:</th>
          <td>
            <Dropdown
              v-model="selectedSlot"
              :options="slots"
              optionLabel="time"
              placeholder="Select Time Slot"
            />
          </td>
        </tr>
      </table>
    </div>
    <div
      :style="{
        flexGrow: '1',
        height: '100%',
        display: 'flex',
        justifyContent: 'right',
        alignSelf: 'end',
      }"
    >
      <Button
        class="p-button-success"
        :style="{
          fontSize: '1.2rem',
          fontWeight: '600',
          width: '80%',
          justifyContent: 'center',
        }"
        :loading="isLoading"
        :disabled="isLoading || slot == null"
        @click="
          () => {
            bookSlot();
          }
        "
      >
        Book Now
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";

import { bookTraining } from "../scripts/api.js";

const emits = defineEmits(["updateTraining"]);

const props = defineProps([
  "id",
  "trainer_id",
  "name",
  "activity_type",
  "fee",
  "email",
  "slots",
  "reg_date",
]);
const toast = useToast();

const isLoading = ref(false);

const selectedSlot = ref({ value: null, time: "Select Slot" });

const slot = computed(() => selectedSlot.value.value);

async function bookSlot() {
  isLoading.value = true;
  try {
    let res = await bookTraining(
      props.trainer_id,
      props.reg_date,
      { slot: false },
      props.activity_type,
      props.fee
    );

    if (res.status == "success") {
      toast.add({
        severity: "success",
        summary: "Slot Booked",
        detail: "Your slot booked successfully",
        life: 3000,
      });

      setTimeout(() => {
        window.location = "/mybookings";
      }, 2500);
    } else {
      toast.add({
        severity: "error",
        summary: "Slot not booked",
        detail: "Something went wrong, refresh and try again",
        life: 3000,
      });
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: "Slot not booked",
      detail: "Something went wrong, refresh and try again",
      life: 3000,
    });
  } finally {
    isLoading.value = false;
    selectedSlot.value = { value: null, time: "Select Slot" };
  }
}

const backgroundColor =
  props.activity_type == "Gym"
    ? "black"
    : props.activity_type == "Yoga"
    ? "#2196F3"
    : props.activity_type == "Diet"
    ? "#27865F"
    : props.activity_type == "Fat Loss"
    ? "#C92D2D"
    : props.activity_type == "Weight Gain"
    ? "#0272A2"
    : "black";
</script>

<style scoped>
th {
  text-align: left;
  padding: 5px 10px;
}
</style>
