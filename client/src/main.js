import { createApp } from 'vue'
import WaarneemApp from '../src/components/WaarneemApp.vue'
import store from '../store.js';
import 'mdb-vue-ui-kit/css/mdb.min.css';
const app = createApp(WaarneemApp);
import 'vuetify/dist/vuetify.css'; // Import Vuetify CSS
import vuetify from '../plugin/vuetify'; // Import Vuetify instance
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
app.use(ElementPlus); // Use Element UI
app.use(vuetify); // Use Vuetify instance
app.use(store);
app.mount('#app');