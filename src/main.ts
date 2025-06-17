import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import noNB from './i18n/nb-NO.json';
import { definePreset } from '@primevue/themes';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';

const Preset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{teal.50}',
      100: '{teal.100}',
      200: '{teal.200}',
      300: '{teal.300}',
      400: '{teal.400}',
      500: '{teal.500}',
      600: '{teal.600}',
      700: '{teal.700}',
      800: '{teal.800}',
      900: '{teal.900}',
      950: '{teal.950}',
    },
  },
});

const i18n = createI18n({
  locale: 'nb-NO',
  fallbackLocale: 'en',
  messages: {
    'nb-NO': noNB,
  },
});

const pinia = createPinia();

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Preset,
    },
  })
  .use(pinia)
  .use(i18n)
  .mount('#app');
