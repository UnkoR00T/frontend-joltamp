import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {ref} from "vue";

export const dataUsersList = defineStore('UsersList', () => {
  const profile = ref({})
  const friends = ref([])
  const users = ref([])



  async function refreshProfileInfo() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/users/getInfo/${localStorage.getItem("userId")}`,
      )
      .then((res) => {
        if (res.status == 200) {
          profile.value = res.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function refreshFriendsList() {

    return new Promise((resolve) => {


      axios
        .post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/friends/`,
          null,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            friends.value = res.data;
            //console.log(friends.value);
            resolve();
          }
        })
        .catch((err) => {
          console.log(err)
          resolve();
        })



    });

  }


  async function getFriendsList() {
    if (!friends.value || friends.value.length === 0) {
      await refreshFriendsList();
    }
  }

  async function test() {
    return new Promise((resolve) => {


      setTimeout(() => {
        resolve();
      }, 1);



    });
  }

  async function findUser(uuid: string) {
    await test(); // Teraz będzie czekać na zakończenie test()
    //console.log(profile.value);
    //console.log(localStorage.getItem("userId"), " ", uuid)
    //console.log(typeof localStorage.getItem("userId"), " ", typeof uuid)
    if (!profile.value) {
      await refreshProfileInfo();
    }
    if (!friends.value) {
      await refreshFriendsList();
    }

    if(localStorage.getItem("userId") === uuid) {
      //console.log(profile.value.displayname)
    }
    else if (friends.value[uuid] !== undefined) {
      //console.log(friends.value[uuid].displayname)
    }

    if(localStorage.getItem("userId") === uuid) {
      return profile.value;
    }
    else if (friends.value[uuid] !== undefined) {
      return friends.value[uuid];
    }
  }
  return {findUser, getFriendsList, refreshProfileInfo, test, refreshFriendsList, profile, friends, users};
})
