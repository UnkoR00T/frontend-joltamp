<script setup lang="ts">
import ServersList from './../components/serverList/ServersList.vue'
import ServerChannelPanel from '../components/serverChannels/ServerChannelPanel.vue'

</script>
<template>
  <div class="body">
    <ServersList />

    <ServerChannelPanel />
    <ChatPanel />
  </div>
</template>

<style scoped>
@import './../panel.scss';
</style>
