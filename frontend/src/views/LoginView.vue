<script setup>
import { ref, inject } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import { useToast } from "primevue/usetoast";

import { login } from "../scripts/api.js";

let submitted = ref(false);
const isLoading = ref(false);
const password = ref("");
const email1 = ref("");
const rules = {
  password: { required },
  email1: { required, email },
};

const toast = useToast();
const v$ = useVuelidate(rules, { password, email1 });

async function doLogin(isValid) {
  submitted.value = true;
  if (isValid) {
    try {
      let res = await login(email1.value, password.value);

      console.log(res);
      if (res.status == "success") {
        toast.add({
          severity: "success",
          summary: "Log in",
          detail: "Logged in Successful",
          life: 3000,
        });
        localStorage.setItem("token", res.token);
        window.location = "/";
      } else if (res.status == "fail") {
        toast.add({
          severity: "error",
          summary: "Wrong Credentials",
          detail: "Please enter credentials carefully.",
          life: 3000,
        });
      } else {
        toast.add({
          severity: "warning",
          summary: "Something went wrong while logging in",
          detail: "Message Content",
          life: 3000,
        });
      }
    } catch (err) {
      toast.add({
        severity: "warning",
        summary: "Something went wrong while logging in",
        detail: "Message Content",
        life: 3000,
      });
    }
  } else {
    toast.add({
      severity: "error",
      summary: "Info Message",
      detail: "Message Content",
      life: 3000,
    });
  }
}
</script>
<template>
  <div id="container">
    <h1>Login at Broh</h1>
    <form class="login-form" @submit.prevent="doLogin(!v$.$invalid)">
      <InputText
        type="email"
        name=""
        id=""
        v-model="email1"
        class="p-inputtext-sm"
        :class="{ 'p-invalid': v$.email1.$invalid && submitted }"
        placeholder="Email"
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
      <RouterLink to="/forgetpassword"> Forget Password? </RouterLink>

      <Button
        type="submit"
        label="Log in"
        :loading="isLoading"
        :disabled="v$.$invalid"
      />
    </form>
    <RouterLink to="/signup">
      <Button class="p-button-secondary" label="New User? Create Account" />
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
  margin: 40px auto;
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
a {
  color: var(--primary-color);
  font-weight: 500;
  text-decoration: none;
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
</style>
