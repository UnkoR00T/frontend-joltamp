<script setup lang="ts">
import { dataUsersList } from '../../data/users';
import { ref } from 'vue';
import axios from 'axios';

const UsersList = dataUsersList();

const setStatus = (status: number) => {
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/users/setStatus`,
      {
        status: status
      },
      {
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        UsersList.refreshProfileInfo()
        console.log(UsersList.profile)
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

const selfInfo = ref<{
  email: string;
  username: string;
  displayname: string;
  bannercolor: string;
  backgroundcolor: string;
  desc: string;
}>({
  email: "",
  username: "",
  displayname: "",
  bannercolor: "",
  backgroundcolor: "",
  desc: "",
});

const changeSelfInfo = (type: string, newValue: string) => {
  if (['displayname', 'username', 'email'].includes(type) && newValue.trim() === '') {
    console.log('Invalid type');
    return;
  }
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/users/changeSelfInfo`,
      {
        type: type,
        newValue: newValue,
      },
      {
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        UsersList.refreshProfileInfo();
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Reset the field value after successful update
}
/*
const fileInput = ref<HTMLInputElement | null>(null);
const setProfile = () => {
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/users/changeSelfInfo`,
      fileInput.value,
      {
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        UsersList.refreshProfileInfo();
        UsersList.getProfile(UsersList.profile.user_id)
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

 */
</script>

<template>
  <div class="settings">
    <div class="account-view">
      <div class="baner" style="background-color: black">
        <img class="profile-img" src="https://via.placeholder.com/40" alt="" />
      </div>
      <div class="profile">
        <!--<div class="profilename">{{ UsersList.profile.displayname }}</div>-->
        <table class="main-table">
          <tr>
            <td>Display Name:</td>
            <td>{{ UsersList.profile.displayname }}</td>
          </tr>
          <tr>
            <td>User Name:</td>
            <td>{{ UsersList.profile.username }}</td>
          </tr>
          <tr>
            <td>Description:</td>
            <td>{{ UsersList.profile.desc }}</td>
          </tr>
          <tr>
            <td>Email:</td>
            <td>{{ UsersList.profile.email }}</td>
          </tr>
          <tr>
            <td>Create data:</td>
            <td>{{ UsersList.profile.createdat }}</td>
          </tr>
          <tr>
            <td>Status:</td>
            <td>

              <Icon v-if="UsersList.profile.status === 0" style="color: silver" icon="mage:stop-circle-fill" class="icon" />
              <Icon v-if="UsersList.profile.status === 1" style="color: green" icon="el:ok-sign" class="icon" />
              <Icon v-if="UsersList.profile.status === 2" style="color: red" icon="oi:circle-x" class="icon" />
              <Icon
                v-if="UsersList.profile.status === 3"
                style="color: orange"
                icon="line-md:moon-filled-alt-loop"
                class="icon"
              />

            </td>
          </tr>
          <details>
            <summary>SHOW MORE</summary>
            <table>
              <tr>
                <td>Baner Color:</td>
                <td>
                  <div style="height: 15px; width: 30px;" :style="{backgroundColor: UsersList.profile.bannercolor}"></div>
                </td>
              </tr>
              <tr>
                <td>Background color:</td>
                <td>
                  <div style="height: 15px; width: 30px;" :style="{backgroundColor: UsersList.profile.backgroundcolor}"></div>
                </td>
              </tr>
              <tr>
                <td>Badges:</td>
                <td>{{ UsersList.profile.badges }}</td>
              </tr>
              <tr>
                <td>Badges:</td>
                <td>{{ UsersList.profile.badges }}</td>
              </tr>
            </table>
          </details>
        </table>
      </div>
    </div>

    <div class="profile-options">

      <div class="setStatus">
        <span class="options-title">Set status:</span>
        <div class="setStatus-buttons">
          <button @click="setStatus(0)">Invisible</button>
          <button @click="setStatus(1)">Active</button>
          <button @click="setStatus(2)">Do not disturb</button>
          <button @click="setStatus(3)">Idle</button>
        </div>
      </div>

      <div class="options-all">
        <span class="options-title">Change description:</span>
        <form @submit.prevent="changeSelfInfo('desc', selfInfo.desc)">
          <input type="text" v-model="selfInfo.desc" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>

      <div class="options-all">
        <span class="options-title">Change displayname:</span>
        <form @submit.prevent="changeSelfInfo('displayname', selfInfo.displayname)">
          <input type="text" v-model="selfInfo.displayname" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>

      <!--<div class="options-all">
        <span class="options-title">Change username:</span>
        <form @submit.prevent="changeSelfInfo('username', selfInfo.username)">
          <input type="text" v-model="selfInfo.username" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>-->

      <div class="options-all">
        <span class="options-title">Change bannercolor:</span>
        <form @submit.prevent="changeSelfInfo('bannercolor', selfInfo.bannercolor)">
          <input type="color" v-model="selfInfo.bannercolor" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>

      <div class="options-all">
        <span class="options-title">Change background color:</span>
        <form @submit.prevent="changeSelfInfo('backgroundcolor', selfInfo.backgroundcolor)">
          <input type="color" v-model="selfInfo.backgroundcolor" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>

      <div class="options-all">
        <span class="options-title">Change email:</span>
        <form @submit.prevent="changeSelfInfo('email', selfInfo.email)">
          <input type="email" v-model="selfInfo.email" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>

      <!--<div class="options-all">
        <span class="options-title">Change avatar:</span>
        <form @submit.prevent="setProfile()">
          <input type="file" ref="fileInput" />
          <button type="submit"><Icon class="icon" icon="material-symbols:save" /></button>
        </form>
      </div>-->

    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './../../panel.scss';
@import './Settings.scss';

.account-view {
  background-color: $bgc1;
  border-radius: 10px;
  overflow: hidden;

  .baner {
    width: 100%;
    height: 80px;
    position: relative;

    .profile-img {
      height: 80px;
      border-radius: 50%;
      aspect-ratio: 1/1;
      border: 8px solid $bgc1;
      box-sizing: content-box;
      position: absolute;
      top: 50px;
      left: 25px;
    }
  }

  .profile {
    padding: 0 20px 20px 20px;
    position: relative;
    color: white;

    .main-table {
      margin-top: 100px;

      td{
        padding: 5px;
      }

      details {
        summary {
          list-style: none;
          cursor: pointer;
          margin-left: 10px;
          margin: 10px 0 3px 10px;
          font-family: 'Roboto';
          font-weight: 700;
          font-size: 12px;
        }

      }
    }
  }
}

.profile-options{
  color: white;
  padding: 10px 20px;
  background-color: $bgc1;
  border-radius: 10px;
  margin-top: 20px;

  .options-title{
    font-size: 18px;
    font-weight: 700;
    margin-left: 10px;
  }

  .setStatus{

    .setStatus-buttons{
      display: flex;
      justify-content: space-around;

      button{
        padding: 8px 15px;
        align-items: center;
        background-color: #3a3a3a;
        border: 1px solid #5a5a5a;
        border-radius: 6px;
        color: #ffffff;
        font-size: 18px;
        cursor: pointer;
        outline: none;
        transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

        &:hover{
          background-color: #505050;
          border-color: #ffffff;
        }

        &:active{
          background-color: #2a2a2a;
          box-shadow: none;
        }
      }
    }
  }

  .options-all{


    input{
      margin-bottom: 15px;
      width: calc(100% - 50px);
      padding: 10px 15px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
      background-color: #3a3a3a;
      border: 1px solid #5a5a5a;
      border-radius: 6px;
      outline: none;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover{
        border-color: #ffffff;
      }
      &:focus{
        border-color: #dddddd;
        box-shadow: 0 4px 8px rgba(255, 255, 255, 0.4);
      }
      &::placeholder{
        color: #bfbfbf;
        font-style: italic;
      }
    }

    button{
      margin-left: 10px;
      width: 40px;
      height: 40px;
      align-items: center;
      background-color: #3a3a3a;
      border: 1px solid #5a5a5a;
      border-radius: 50%;
      color: #ffffff;
      font-size: 18px;
      cursor: pointer;
      outline: none;
      transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;

      &:hover{
        background-color: #505050;
        border-color: #ffffff;
      }
      &:focus{
        border-color: #dddddd;
        box-shadow: 0 4px 8px rgba(255, 255, 255, 0.4);
      }
      &:active{
        background-color: #2a2a2a;
        box-shadow: none;
      }
    }
  }
}
</style>