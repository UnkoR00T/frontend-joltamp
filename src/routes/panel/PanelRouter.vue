<script setup lang="ts">
import { RouterView } from 'vue-router'
import { dataUsersList} from './data/users.ts'
import { dataWebSocket} from './data/websocket.ts'

const UsersList = dataUsersList();
const Websocket = dataWebSocket();
//LOAD ALL MUST HAVE DATA IN STORAGES
UsersList.refreshFriendsList()
UsersList.refreshProfileInfo()
//Websocket.wsConnect()

</script>

<template>
  <RouterView />
</template>//Websocket.wsConnect()

<style scoped></style>
