<template>
  <div class="body">
    <ul>
      <li v-for="(language, index) in languages" :key="index">
        <button @click="()=> {$i18n.locale = language;}">{{ language }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const loadLanguages = async (): Promise<string[]> => {
  const modules = import.meta.glob('../../../../translates/*.json');
  const languages: string[] = [];

  for (const path in modules) {
    const locale = path.match(/\/translates\/(.*)\.json$/)?.[1];
    if (locale) {
      languages.push(locale);
    }
  }

  return languages;
};

const languages = ref<string[]>([]);

onMounted(async () => {
  languages.value = await loadLanguages();
});
</script>

<style lang="scss" scoped>
.body{
  overflow: hidden;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  ul {
    list-style-type: none;

    li{
      button {
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #f1f1f1;
        cursor: pointer;
        min-width: 100px;

        &:hover {
          background-color: #ddd;
        }
      }
    }
  }
}
</style>
