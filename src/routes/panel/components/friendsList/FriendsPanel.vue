<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import FriendItem from './FriendItem.vue'
import axios from 'axios'
import { dataUsersList } from '../../data/users'

const UsersList = dataUsersList()
//Adding new friend:
const addFriendName = ref('')
const addFriend = () => {
  axios
    .post(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/friends/sendRequest`,
      {
        to: addFriendName.value,
        action: true
      },
      {
        headers: {
          Authorization: localStorage.getItem('jwt')
        }
      }
    )
    .then((res) => {
      if (res.status === 200) {
        UsersList.refreshFriendsList()
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<template>
  <div class="main-content">
    <div class="friends-section">
      <div class="friends-header">
        <h3>
          <Icon icon="fa6-solid:user-group" />
          Friends
        </h3>
        <div class="friends-options">
          <button class="header-icon">{{ $t('components.friendsList.online') }}</button>
          <button class="header-icon">{{ $t('components.friendsList.all') }}</button>
          <button class="header-icon">{{ $t('components.friendsList.pending') }}</button>
          <button class="header-icon">{{ $t('components.friendsList.blocked') }}</button>
          <button class="header-icon add-friend-icon">{{ $t('components.friendsList.addfriend') }}</button>
        </div>
      </div>
      <hr />
      <form class="find-friend" @submit.prevent="addFriend">
        <input type="text" id="addFriend" placeholder="Search" v-model="addFriendName" />
        <button type="submit">{{ $t('components.friendsList.sendrequest') }}</button>
      </form>
      <hr />
      <div class="friends-count">ONLINE -</div>
      <div class="friends-list">
        <FriendItem
          v-for="friend in UsersList.friends"
          imgUrl="../../../../public/img/JoltampIcon.png"
          :username="friend.username"
          :userId="friend.user_id"
          :key="friend.user_id"
          :displayname="friend.displayname"
          :description="friend.desc"
          :status="friend.status"
          :friendstatus="friend.friendstatus"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../../panel.scss';

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: $bgc2;
  padding: 7px;
  overflow: hidden;

  .friends-section {
    flex: 1;
    padding: 10px;
    background-color: $bgc3;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    hr {
      border: 1px solid #000000cc;
      margin: 5px 0 5px 0;
    }

    .friends-header {
      display: flex;
      align-items: center;

      h3 {
        color: #ffffff;
        margin: 7px;
      }

      .friends-options {
        display: flex;
        align-items: center;

        .header-icon {
          background: none;
          border: none;
          color: $fc3;
          font-size: 1rem;
          margin-left: 10px;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 5px;
        }

        .header-icon:hover {
          color: white;
          background-color: #ffffff22;
        }

        .add-friend-icon {
          background-color: green;
        }

        .add-friend-icon:hover {
          background-color: rgb(1, 151, 1);
        }
      }
    }

    .find-friend {
      padding: 7px;
      display: flex;

      input {
        background-color: #282828;
        color: white;
        padding: 10px;
        width: 100%;
        border-radius: 5px;
        border: none;
      }

      input:focus {
        outline: none;
      }

      button{
        background-color: rgb(1, 151, 1);
        color: white;
        padding: 10px;
        font-weight: bold;
      }
    }

    .friends-count {
      color: #ddd;
      margin: 5px;
      font-size: 13px;
    }

    .friends-list {
      padding: 8px;
      flex: 1;
      margin-bottom: 1rem;
      overflow-y: auto;
    }

    ::-webkit-scrollbar {
      width: 8px;
    }
  }
}
</style>
