import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import { Icon } from '@iconify/vue';
import App from './App.vue';
import router from './router.ts';

// Funkcja do dynamicznego importowania języków
const loadLanguages = async (): Promise<Record<string, any>> => {
  const modules = import.meta.glob('./translates/*.json'); // Dynamiczny import wszystkich plików JSON
  const messages: Record<string, any> = {};

  for (const path in modules) {
    const locale = path.match(/\/translates\/(.*)\.json$/)?.[1]; // Wyciąganie klucza języka (np. 'pl_pl', 'en_en')
    if (locale) {
      //@ts-ignore
      messages[locale] = (await modules[path]()).default; // Dynamiczny import treści
    }
  }

  return messages;
};

// Funkcja asynchroniczna do inicjalizacji aplikacji
const initApp = async () => {
  const messages = await loadLanguages(); // Ładowanie tłumaczeń

  // Tworzenie instancji i18n
  const i18n = createI18n({
    locale: 'en_en', // Domyślny język
    fallbackLocale: 'en_en', // Język zapasowy
    messages,
  });

  // Tworzenie aplikacji Vue
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(i18n);

  app.component('Icon', Icon);

  app.mount('#app');
};

// Inicjalizacja aplikacji
initApp();

