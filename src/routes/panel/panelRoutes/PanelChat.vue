<script setup lang="ts">
import ChatPanel from './../components/chatPanel/ChatPanel.vue'
import SidebarComponent from './../components/friendsSidebar/SidebarComponent.vue'
import ServersList from './../components/serverList/ServersList.vue'


</script>
<template>
  <div class="body">
    <ServersList />
    <SidebarComponent />

    <ChatPanel />
  </div>
</template>

<style scoped>
@import './../panel.scss';
</style>
