import { createApp } from 'vue';
import config from 'devextreme/core/config';
import App from './App.vue';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

createApp(App).mount('#app');
