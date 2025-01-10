<script setup lang="ts">
interface User {
  show: boolean;
  user: {
    friendstatus: number;
    createdat: string;
    user_id: string;
    username: string;
    badges: string[] | null;
    displayname: string;
    bannercolor: string;
    backgroundcolor: string;
    status: number;
    desc: string;
    [key: string]: any;
  }
}

const props = defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="profile" :style="{backgroundColor: user.user.backgroundcolor ? user.user.backgroundcolor : '#2f3136'}">
    <div class="banner" :style="{backgroundColor: props.user.user.bannercolor}">

    </div>
    <div class="avatar">
      <div class="avatarDummy" style="height: 100px; width: 100px; border-radius: 50%;">
        <img src='../../img/JoltampIcon.png' alt="">
      </div>
      <div class="statusIcon">
        <Icon v-if="user.user.status == 0" style="color: silver" icon="mage:stop-circle-fill" class="icon" />
        <Icon v-if="user.user.status == 1" style="color: green" icon="el:ok-sign" class="icon" />
        <Icon v-if="user.user.status == 2" style="color: red" icon="oi:circle-x" class="icon" />
        <Icon
          v-if="user.user.status == 3"
          style="color: orange"
          icon="line-md:moon-filled-alt-loop"
          class="icon"
        />
      </div>
    </div>
    <div class="content">
      <div class="displayname"><h1>{{ props.user.user.displayname }}</h1></div>
      <div class="username"><p>{{ props.user.user.username }}</p></div>
      <div class="desc">{{ props.user.user.desc }}</div>
      <RouterLink :to=" props.user.user.user_id" class="btn-profile">
        {{ $t('components.chatPanel.profilesendmessage') }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
*{
  color: white;
}
.btn-profile{
  margin-top: 15px;
  width: 100%;
  height: 30px;
  text-decoration: none;
  text-align: center;
  line-height: 30px;
  display: block;
  background-color: #38393e;
  border-radius: 0.5rem;
  color: white;
}
img{
  height: 100px;
  width: 100px;
}
.icon{
  height: 30px;
  width: 30px;
}
.statusIcon{
  transform: translate(70px, -30px);
  height: 35px;
  width: 35px;
  background: #2f3136;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.profile{
  border-radius: 1rem;
  width: 350px;
  height: 350px;
}
.avatar{
  transform: translateY(-50px) translateX(15px);
  height: 100px;
  width: 100px;
  padding: 5px;
  border-radius: 50%;
  background-color: #2f3136;
}
.content{
  padding: 15px;
  transform: translateY(-60px);
}
.banner{
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  height: 80px;
  overflow: hidden;
}
h1, p{
  margin: 0;
  padding: 0;
}
.desc{
  background-color: #38393e;
  padding: 10px;
  border-radius: 0.5rem;
  overflow-wrap: break-word;
}
</style>