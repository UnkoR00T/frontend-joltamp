<script setup>
import { useRouter } from 'vue-router'

import ProfileItem from '../elements/ProfileItem.vue'
import FriendComponent from './FriendComponent.vue'
import {dataUsersList} from '../../data/users'

const UsersList = dataUsersList();

const router = useRouter()

</script>

<template>
  <div class="sidebar">
    <div class="top-section">
      <form>
        <input type="text" :placeholder="$t('components.friendsSidebar.findfriendplaceholder')" />
        <button type="submit">
          <Icon icon="fa:search" />
        </button>
      </form>
    </div>
    <hr />
    <div class="sidebar-options">
      <button @click="router.push('/app/friends')"><i class="bi bi-person-add"></i> {{ $t('components.friendsSidebar.friends') }}</button>
      <button @click="router.push('/app/nitro')"><i class="bi bi-gem"></i> {{ $t('components.friendsSidebar.nitro') }}</button>
      <button @click="router.push('/app/shop')"><i class="bi bi-shop"></i> {{ $t('components.friendsSidebar.shop') }}</button>
    </div>
    <hr />
    <div class="friends-list">
      <FriendComponent
        v-for="friend in Object.values(UsersList.friends).filter(item => item.friendstatus === 2)"
        imgUrl='../../img/JoltampIcon.png'
        :key="friend.user_id"
        :userId="friend.user_id"
        :username="friend.displayname"
        :description="friend.desc"
        :status="friend.status"
      />
    </div>

    <ProfileItem />
  </div>
</template>

<style lang="scss" scoped>
@import './../../panel.scss';

.sidebar {
  width: 250px;
  background-color: $bgc2;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  transition: width 0.3s ease;

  hr {
    margin: 10px;
    border: 1px solid black;
  }

  .top-section {
    cursor: pointer;

    input {
      padding: 0.5rem;
      border-radius: 0.25rem;
      background-color: #40444b;
      border: none;
      color: #ffffff;
    }

    input:focus {
      outline: 1px solid $bgc3;
    }

    button {
      padding: 0.5rem;
      background-color: #7289da;
      border: none;
      border-radius: 0.25rem;
      color: white;
      cursor: pointer;
      transition: background-color 0.3s ease;
      font-weight: 400;
    }

    button:hover {
      background-color: #5865f2;
    }
  }

  .sidebar-options {
    button {
      cursor: pointer;
      width: 100%;
      height: 35px;
      padding: 1px 5px 1px 12px;
      margin-bottom: 4px;
      font-size: 100%;
      text-align: left;
      background-color: #00000000;
      color: $fc2;
      border: none;
      border-radius: 5px;

      &:hover {
        background-color: #ffffff22;
        color: $fc1;
      }
    }
  }

  .friends-list {
    height: 100%;
    overflow-y: scroll;
    padding: 2px;
  }
}
</style>
