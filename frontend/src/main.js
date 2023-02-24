import { createApp } from "vue";
import PrimeVue from "primevue/config";
import App from "./App.vue";
import "./assets/main.css";

import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

import "primevue/resources/themes/saga-blue/theme.css";
// import "primevue/resources/themes/nova-vue/theme.css";
// import "primevue/resources/themes/saga-green/theme.css";
// import "primevue/resources/themes/soho-light/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import router from "./router";

import Toast from "primevue/toast";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Toolbar from "primevue/toolbar";
import Carousel from "primevue/carousel";
import Galleria from "primevue/galleria";
import Checkbox from "primevue/checkbox";
import MultiSelect from "primevue/multiselect";
import Calendar from "primevue/calendar";
import ConfirmPopup from "primevue/confirmpopup";

const app = createApp(App);

app.component("Toast", Toast);
app.component("Button", Button);
app.component("InputText", InputText);
app.component("Textarea", Textarea);
app.component("Password", Password);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("Dialog", Dialog);
app.component("Dropdown", Dropdown);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Toolbar", Toolbar);
app.component("Carousel", Carousel);
app.component("Galleria", Galleria);
app.component("Checkbox", Checkbox);
app.component("MultiSelect", MultiSelect);
app.component("Calendar", Calendar);
app.component("ConfirmPopup", ConfirmPopup);

// app.provide("backendURL", "https://flash-typer.onrender.com");
app.provide("backendURL", "http://localhost:8000");

app.use(ConfirmationService);
app.use(ToastService);
app.use(router);
app.use(PrimeVue);
app.mount("#app");
