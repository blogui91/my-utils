import './style.css';
import '@blogui91/agnostic-ui';

import { createApp } from 'vue';

import App from './App.vue';

// window.customElements.define('app-form-fields', FormField);

const app = createApp(App);

app.mount('#app')


