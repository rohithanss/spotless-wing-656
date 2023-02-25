<script setup>
import { ref, inject } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { useToast } from "primevue/usetoast";
import { computed } from "@vue/reactivity";

import { signup } from "../scripts/api.js";

let submitted = ref(false);
const isLoading = ref(false);
const password = ref("");
const email1 = ref("");
const name = ref("");
const mobile = ref(null);
const role = computed(() => {
  return trainer.value == true ? "trainer" : "user";
});
const trainer = ref(false);

const rules = {
  password: { required, minLengthValue: minLength(8) },
  email1: { required, email },
  name: { required },
  mobile: { required },
};

const toast = useToast();
const v$ = useVuelidate(rules, { password, email1, name, mobile });

async function doSignup(isValid) {
  submitted.value = true;

  if (isValid) {
    isLoading.value = true;
    try {
      let res = await signup(
        name.value,
        email1.value,
        mobile.value,
        password.value,
        role.value
      );

      console.log(await res);

      if (res.status == "success") {
        toast.add({
          severity: "success",
          summary: "Signup Successful",
          detail: "Your account created successfully",
          life: 3000,
        });
        setTimeout(() => {
          window.location = "/login";
        }, 3000);
      } else if (res.status == "fail") {
        toast.add({
          severity: "error ",
          summary: "User already exists",
          detail: "Try logging in",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "warn",
          summary: "Signup Failed",
          detail: "Something went wrong while creating account",
          life: 3000,
        });
      }
    } catch (err) {
      toast.add({
        severity: "warn",
        summary: "Signup Failed",
        detail: "Something went wrong while creating account",
        life: 3000,
      });
    } finally {
      isLoading.value = false;
    }
  }
}
</script>
<template>
  <div id="container">
    <h1>Join Broh Fitness</h1>
    <form
      class="login-form"
      @submit.prevent="
        () => {
          doSignup(!v$.$invalid);
        }
      "
    >
      <InputText
        name=""
        id=""
        v-model="name"
        class="p-inputtext-sm"
        placeholder="Full Name"
        :class="{ 'p-invalid': v$.name.$invalid && submitted }"
      />
      <InputText
        type="email"
        name=""
        id=""
        v-model="email1"
        class="p-inputtext-sm"
        :class="{ 'p-invalid': v$.email1.$invalid && submitted }"
        placeholder="Email"
      />
      <InputMask
        v-model="mobile"
        class="p-inputtext-sm"
        mask="9999999999"
        :class="{ 'p-invalid': v$.mobile.$invalid && submitted }"
        placeholder="Mobile Number"
      />
      <Password
        type="password"
        id="password"
        v-model="password"
        class="p-inputtext-sm"
        :class="{ 'p-invalid': v$.password.$invalid && submitted }"
        placeholder="Password"
        :feedback="false"
        :toggle-mask="true"
      />
      <p
        :style="{ fontSize: '1rem', marginTop: '-10px', color: 'red' }"
        class="passwordWarning"
        :class="{ showWarning: v$.password.$invalid && submitted }"
      >
        Password length should at least 8
      </p>
      <div :style="{ display: 'flex', alignItems: 'center', gap: '10px' }">
        <Checkbox
          v-model="trainer"
          :binary="true"
          aria-labelledby="Register as Trainer"
        />
        <p>Register as Trainer</p>
      </div>
      <Button type="submit" label="Register" :loading="isLoading" />
    </form>
    <RouterLink to="/login">
      <Button class="p-button-secondary" label="Go to Login Page" />
    </RouterLink>
  </div>
</template>

<style scoped>
#container {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 30px auto;
  border-radius: var(--border-radius);
  background-color: var(--surface-100);
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: var(--text-color);
}

.login-form {
  display: flex;
  flex-direction: column;
  width: 60%;
  gap: 1.2rem;
}
div > p {
  font-size: 1rem;
}
a {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 1rem;
}
#container > a {
  width: 60%;
  text-decoration: none;
}
#container > a button {
  width: 100%;
}
a:hover {
  text-decoration: underline;
}
::v-deep(.p-password input) {
  width: 100%;
}

.passwordWarning {
  display: none;
}
.showWarning {
  display: block;
}
</style>
