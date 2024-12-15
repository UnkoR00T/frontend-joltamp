import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const dataUsersList = defineStore('UsersList', () => {
  const profile = ref({});
  const friends = ref([]);
  const users = ref<object[]>([]);

  let refreshingProfile: Promise<void> | null = null;
  let refreshingFriends: Promise<void> | null = null;
  let refreshingUser: Promise<void> | null = null;

  async function refreshProfileInfo() {
    if (refreshingProfile) {
      // Jeśli zapytanie już trwa, użyj tej samej obietnicy
      return refreshingProfile;
    }

    try {
      refreshingProfile = axios.post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/users/getSelfInfo`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          }
        }

      ).then((res) => {
        if (res.status === 200) {
          profile.value = res.data;
        }
      });
      await refreshingProfile; // Czekaj na zakończenie zapytania
    } catch (err) {
      console.error("Błąd podczas odświeżania informacji o profilu:", err);
    } finally {
      refreshingProfile = null; // Po zakończeniu wyzeruj obietnicę
    }
  }

  async function refreshFriendsList() {
    if (refreshingFriends) {
      // Jeśli zapytanie już trwa, użyj tej samej obietnicy
      return refreshingFriends;
    }

    try {
      refreshingFriends = axios.post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/friends/`,
        null,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          friends.value = res.data;
        }
      });
      await refreshingFriends; // Czekaj na zakończenie zapytania
    } catch (err) {
      console.error("Błąd podczas odświeżania listy znajomych:", err);
    } finally {
      refreshingFriends = null; // Po zakończeniu wyzeruj obietnicę
    }
  }
//To find unknown user
  async function refreshUser(uuid: string) {
    if (refreshingUser) {
      return refreshingUser;
    }

    try {
      refreshingUser = axios.get(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/users/getInfo/${uuid}`
      ).then((res) => {
        if (res.status === 200) {
          users.value.push(res.data);
        }
      });
      await refreshingUser; // Czekaj na zakończenie zapytania
    } catch (err) {
      console.error("Błąd podczas odświeżania informacji o profilu:", err);
    } finally {
      refreshingUser = null;
    }
  }


  // Funkcja do znajdowania użytkownika
  async function findUser(uuid: string) {
    // Jeśli profile lub friends nie są załadowane, odśwież je
    if (!profile.value || Object.keys(profile.value).length === 0) {
      await refreshProfileInfo();
    }
    if (!friends.value || friends.value.length === 0) {
      await refreshFriendsList();
    }

    // Sprawdź, czy użytkownik jest aktualnie zalogowany
    if (localStorage.getItem("userId") === uuid) {
      return profile.value;
    }
    if (friends.value[uuid]){
      return friends.value[uuid];
    }

    return null;
  }

  // Eksport funkcji i danych
  return {
    findUser,
    refreshProfileInfo,
    refreshFriendsList,
    refreshUser,
    profile,
    friends,
    users,
  };
});
