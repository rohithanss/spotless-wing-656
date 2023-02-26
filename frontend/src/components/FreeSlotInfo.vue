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
        @click="
          ($event) => {
            closeAll($event);
          }
        "
        label="Close All Slots"
        class="p-button-danger"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
        :loading="isLoading2"
      />
      <Button
        class="p-button-warning"
        @click="doReserverSlot"
        :style="{ fontWeight: '600', width: '90%', justifyContent: 'center' }"
        :disabled="slot == null || isLoading"
        :loading="isLoading"
        label="Reserve Selected Slot"
      />
    </div>
  </div>
  <ConfirmPopup></ConfirmPopup>
</template>

<script setup>
import { ref, computed } from "vue";
import { reserveSlot, closeAllSlots } from "../scripts/api.js";
import { useToast } from "primevue/usetoast";

import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
const toast = useToast();

const props = defineProps(["id", "reg_date", "activity_type", "fee", "slots"]);

const emits = defineEmits(["reserveSlot", "deleteAll"]);

const isLoading = ref(false);
const isLoading2 = ref(false);

const selectedSlot = ref({ value: null, time: "Select Slot" });

const slot = computed(() => selectedSlot.value.value);

async function doReserverSlot() {
  if (slot.value != null) {
    let obj = {};
    obj[slot.value] = false;

    try {
      let res = await reserveSlot(props.id, obj);

      console.log(res);
      if (res.status == "success") {
        toast.add({
          severity: "success",
          summary: "Slot Reserved",
          detail: "Your slot availability changed successfully",
          life: 3000,
        });
        emits("reserveSlot", slot.value);
        selectedSlot.value = { value: null, time: "Select Slot" };
      } else {
        toast.add({
          severity: "error",
          summary: "Slot reserving failed",
          detail: "Something went wrong while updating slot",
          life: 3000,
        });
      }
    } catch (err) {
      toast.add({
        severity: "error",
        summary: "Slot reserving failed",
        detail: "Something went wrong while updating slot",
        life: 3000,
      });
      console.log(err);
    }
  }
}

async function closeAll(event) {
  let id = props.id;
  confirm.require({
    target: event.currentTarget,
    message: `Are you sure you want to close all slots?`,
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      //callback to execute when user confirms the action

      closeAllSlots(id)
        .then((res) => {
          if (res.status == "success") {
            toast.add({
              severity: "success",
              summary: "Slots Deleted",
              detail: "Your slots closed successfully",
              life: 3000,
            });
            emits("deleteAll", id);
          } else {
            toast.add({
              severity: "error",
              summary: "Slots Not Deleted",
              detail: "Something Went wrong while closing slots",
              life: 3000,
            });
          }
        })
        .catch((err) => {
          toast.add({
            severity: "error",
            summary: "Slots Not Deleted",
            detail: "Something Went wrong while closing slots",
            life: 3000,
          });
          console.log(err);
        });
    },
  });
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
