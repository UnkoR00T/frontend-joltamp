<script setup lang="ts">
import SidebarComponent from './../components/friendsSidebar/SidebarComponent.vue'
import ServersList from './../components/serverList/ServersList.vue'
import FriendsPanel from '../components/friendsList/FriendsPanel.vue'

</script>
<template>
  <div class="body">
    <ServersList />
    <SidebarComponent />

    <FriendsPanel />
  </div>
</template>

<style scoped>
@import './../panel.scss';
</style>
