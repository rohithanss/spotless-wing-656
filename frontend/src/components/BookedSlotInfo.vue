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
          <th>Trainee:</th>
          <td>{{ traineeName }}</td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{{ activity_type }}</td>
        </tr>
        <tr>
          <th>Trainee Email:</th>
          <td>{{ traineeEmail }}</td>
        </tr>
        <tr>
          <th>Fee(per session):</th>
          <td>Rs. {{ fee }}</td>
        </tr>
        <tr>
          <th>Slot:</th>
          <td>{{ allSlots[slot] }} - {{ reg_date }}</td>
        </tr>
        <tr>
          <th>Zoom Link:</th>
          <td :style="{ display: 'flex' }">
            <InputText
              type="text"
              v-model="zoomLinkValue"
              :disabled="editLink"
            />
            <i
              @click="
                () => {
                  editLink = !editLink;
                }
              "
              class="pi pi-pencil"
              :style="{
                border: '1px solid #c92d2d',
                borderRadius: '5px',
                padding: '7px',
                fontSize: '1.4rem',
                cursor: 'pointer',
                marginLeft: '10px',
                color: '#c92d2d',
              }"
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
        class="p-button-info"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
      >
        Update Link
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps([
  "traineeName",
  "traineeEmail",
  "traineeId",
  "activity_type",
  "fee",
  "email",
  "slot",
  "reg_date",
  "zoomLink",
]);

const zoomLinkValue = ref(props.zoomLink);
const editLink = ref(true);

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
th {
  text-align: left;
  padding: 5px 10px;
}
</style>
