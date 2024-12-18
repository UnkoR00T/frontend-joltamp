import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const dataMessageslist = defineStore('MessagesList', () => {
  const messages = ref<object[]>([]);
});
