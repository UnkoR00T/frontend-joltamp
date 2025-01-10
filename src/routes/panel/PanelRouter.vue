<script setup lang="ts">
import { RouterView } from 'vue-router'
import { dataUsersList} from './data/users.ts'

const UsersList = dataUsersList();
//LOAD ALL MUST HAVE DATA IN STORAGES
UsersList.refreshFriendsList()
UsersList.refreshProfileInfo()
//Websocket.wsConnect()

</script>

<template>
  <RouterView />
</template>

<style scoped></style>
