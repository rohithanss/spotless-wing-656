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
              class="pi"
              :class="[editLink ? 'pi-pencil' : 'pi-times']"
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'end',
        gap: '50px',
      }"
    >
      <Dropdown
        v-model="bookingStatusValue"
        :options="statuses"
        optionLabel="status"
        placeholder="Select Time Slot"
        :style="{ width: '90%' }"
      />

      <Button
        class="p-button-info"
        :disabled="isLoading || !isChange"
        :loading="isLoading"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
        @click="
          () => {
            updateSlotDetails();
          }
        "
        label=" Update Slot"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";

import { updatedBookedSlots } from "../scripts/api.js";

const props = defineProps([
  "id",
  "traineeName",
  "traineeEmail",
  "traineeId",
  "activity_type",
  "fee",
  "email",
  "slot",
  "reg_date",
  "zoomLink",
  "booking_status",
]);

const emits = defineEmits(["updateDetails"]);

const toast = useToast();

const statuses = ref([
  {
    status: "Pending",
    value: "pending",
  },
  { status: "Completed", value: "completed" },
]);

const zoomLinkValue = ref(props.zoomLink);
const bookingStatusValue = ref({
  value: props.booking_status,
  status: props.booking_status == "pending" ? "Pending" : "Completed",
});

const editLink = ref(true);

const isChange = ref(false);
const isLoading = ref(false);

watch(
  [bookingStatusValue, zoomLinkValue],
  ([newBookingStatusValue, newZoomLinkValue]) => {
    isChange.value = true;
    if (
      newZoomLinkValue == props.zoomLink &&
      newBookingStatusValue.value == props.booking_status
    ) {
      isChange.value = false;
    }
  }
);

async function updateSlotDetails() {
  if (zoomLinkValue.value.trim() == "") {
    toast.add({
      severity: "warn",
      summary: "Zoom Link Invalid",
      detail: "Zoom link field can not empty",
      life: 3000,
    });
  } else {
    isLoading.value = true;
    try {
      let res = await updatedBookedSlots(
        props.id,
        zoomLinkValue.value,
        bookingStatusValue.value.value
      );

      console.log(res);

      if (res.status == "success") {
        toast.add({
          severity: "success",
          summary: "Slot details",
          detail: "Slot details updated Successfully",
          life: 3000,
        });
        emits(
          "updateDetails",
          props.id,
          zoomLinkValue.value,
          bookingStatusValue.value.value
        );
        isChange.value = false;
        editLink.value = true;
      } else {
        toast.add({
          severity: "warn",
          summary: "Slot not updated",
          detail: "Something went wrong while updating slot details",
          life: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.add({
        severity: "warn",
        summary: "Slot not updated",
        detail: "Something went wrong while updating slot details",
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
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

const allSlots = {
  six: "06:00 AM",
  seven: "07:00 AM",
  eight: "08:00 AM",
  nine: "09:00 AM",
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
