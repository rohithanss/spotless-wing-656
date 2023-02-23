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
          <th>Date:</th>
          <td>{{ reg_date }}</td>
        </tr>
        <tr>
          <th>Training Type:</th>
          <td>{{ activity_type }}</td>
        </tr>

        <tr>
          <th>Fee(per session):</th>
          <td>Rs. {{ fee }}</td>
        </tr>
        <tr>
          <th>Time Slots:</th>
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
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'end',
        alignSelf: 'end',
      }"
    >
      <Button
        label="Close All Slots"
        class="p-button-danger"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
      />
      <Button
        class="p-button-warning"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
        :disabled="slot == null || isLoading"
      >
        Reserve Selected Slot</Button
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["id", "reg_date", "activity_type", "fee", "slots"]);

const isLoading = ref(false);

const selectedSlot = ref({ value: null, time: "Select Slot" });

const slot = computed(() => selectedSlot.value.value);

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
