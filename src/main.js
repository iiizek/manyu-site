import "@/assets/main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createHead } from "@unhead/vue";
import { GesturePlugin } from "@vueuse/gesture";
import { MotionPlugin } from "@vueuse/motion";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(createHead());
app.use(MotionPlugin);
app.use(GesturePlugin);
app.use(router);

app.mount("#app");
