<script setup>
import { useRouter } from 'vue-router'
import  { dataUsersList} from '../../data/users'

const router = useRouter()
const UsersList = dataUsersList()

</script>

<template>
  <div class="user-profile">
    <img src="../../../../../public/img/JoltampIcon.png" alt="Avatar" class="user-avatar" />
    <div class="user-info">
      <h3>{{ UsersList.profile.displayname }}</h3>
    </div>
    <div class="user-status-icons">
      <button>
        <Icon icon="iconoir:microphone-solid" />
      </button>
      <button>
        <Icon icon="solar:headphones-round-bold" />
      </button>
      <button @click="router.push('/app/settings/myaccount')">
        <Icon icon="mdi:gear" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../../panel.scss';

.user-profile {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid #40444b;

  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .user-info {
    overflow: hidden;
  }

  .user-info h3 {
    color: #ffffff;
    font-size: 15px;
    margin: 0;
    margin-left: 0.5rem;
  }

  .user-status-icons {
    margin-left: auto;
    display: flex;

    button {
      background: none;
      border: none;
      color: $fc3;
      font-size: 1.25rem;
      margin-left: 0.5rem;
      cursor: pointer;
    }

    button:hover {
      color: white;
    }
  }
}
</style>
