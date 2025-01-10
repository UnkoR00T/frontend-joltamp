<script lang="ts" setup>
import { onMounted, type Ref, ref } from 'vue'
import axios from 'axios'
import MessagesChart from '../charts/messagesChart.vue'
import RegisterChart from '../charts/registerChart.vue'
import WsChart from '../charts/wsChart.vue'

const statusInt = ref(0)
const messagesData: Ref<
  { Day: string; MessagesCount: number; RegisterCount: number; WebsocketConnectionCount: number }[]
> = ref([])

axios
  .get('https://joltamp.pl/api/v0/')
  .then((response) => {
    statusInt.value = response.status
  })
  .catch((error) => {
    console.error(error)
    statusInt.value = 404
  })
onMounted(() => {
  // Fetch messages data
  axios
    .get('https://joltamp.pl/api/v0/analytics/15', {
      headers: {
        Authorization: 'f22e5601-0ed0-4a7e-95a4-b2cfc68c4500',
      },
    })
    .then((response) => {
      messagesData.value = response.data.reverse()
    })
    .catch((error) => {
      console.error(error)
    })
})
</script>
<template>
  <header>
    <div class="navbar">
      <RouterLink to="/" class="logo">JoltAMP</RouterLink>
      <div class="navbar-buttons">
        <RouterLink to="/download" class="navabr-btn-opt">Download</RouterLink>
        <RouterLink to="/status" class="navabr-btn-opt">Status</RouterLink>
      </div>
    </div>
  </header>

  <div class="body">
    <div class="status">
      <div class="icons">
        <div class="icon" id="unknown" v-if="statusInt == 0"></div>
        <div class="icon" id="correct" v-else-if="statusInt == 200"></div>
        <div class="icon" id="incorrect" v-else></div>
      </div>
      <div class="info">
        <div class="infoText">
          <h2>
            Status: <span v-if="statusInt == 0">Unknown</span
            ><span v-else-if="statusInt == 200">Working</span><span v-else>Down</span>
          </h2>
          <p v-if="statusInt == 0">We are asking server for that info, wait.</p>
          <p v-if="statusInt == 200">All services working as usual.</p>
          <p v-else>We have some down time, sorry.</p>
        </div>
      </div>
    </div>
    <div class="analytics">
      <div class="messages analyticsBox">
        <div class="left analyticsContent">
          <h2>Messages in last 15 days</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam nam pariatur sit
            tenetur. Dolorum eaque enim ipsa maxime nisi numquam obcaecati repudiandae soluta
            suscipit voluptate.
          </p>
        </div>
        <div class="right chart">
          <MessagesChart :data="messagesData" />
        </div>
      </div>
      <div class="registers analyticsBox">
        <div class="left">
          <RegisterChart :data="messagesData" />
        </div>
        <div class="right analyticsContent">
          <h2>Registered users in last 15 days</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At dolorem dolores facere
            illum magni, nesciunt vitae. Accusantium aut cupiditate eveniet facilis iusto, omnis
            quod sapiente.
          </p>
        </div>
      </div>
      <div class="websockets analyticsBox last" id="last">
        <div class="left analyticsContent">
          <h2>Connections in last 15 days</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci doloremque
            exercitationem explicabo fuga minus necessitatibus officiis placeat praesentium sunt
            unde! Consequuntur dolorem possimus tempore unde?
          </p>
        </div>
        <div class="right chart">
          <WsChart :data="messagesData" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

.navbar-buttons {
  padding-right: 5dvw;
}

.navabr-btn-opt {
  padding: 15px;
  text-decoration: none;
  color: #fffaff;
}

.navabr-btn-opt:hover {
  background: #386a52;
  transition: 0.5s;
  border-radius: 3px;
}
header {
  font-family: Arial, sans-serif;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #498467;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  padding-left: 5dvw;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #fffaff;
  text-decoration: none;
}


h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  line-height: 1.6;
}
@media screen and (max-width: 1540px) {
  .body {
    padding: 10px !important;
  }
  .body {
    flex-direction: column-reverse !important;
    align-items: center;
    text-align: center;
    padding-top: 90px !important;
  }
}

.body {
  height: 100dvh;
  overflow-y: scroll;
  margin-top: 50px;
  padding: 5dvw;
  font-family: Arial, sans-serif;
  background-color: #272727;
  color: #fffaff;
  text-align: left;
}

h2{
  margin: 0;
}
.left h2, .right h2 {
  margin-bottom: 10px;
  text-align: left;
}

.right p{
  margin: 0;
}

.left, .right {
  display: block;
}

.analyticsBox > .left {
  align-items: flex-start;
}

.analyticsBox > .right {
  align-items: flex-start;
}

p{
  margin: 0;
}

.analyticsContent {
  width: 20dvw;
}
.analytics {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  gap: 50px;
}
.analyticsBox {
  height: 370px;
  display: flex;  flex-direction: row;
  justify-content: center;
  gap: 50px;
}
.analyticsBox > div {
  max-width: 40dvw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.reverse {
  flex-direction: row-reverse;
}
.analyticsBox > .right {
  align-items: flex-start;
}
.icons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

#unknown {
  background-color: dimgray;
}
#correct {
  background-color: #88AD91;
}
#incorrect {
  background-color: #C23C3C;
}
.status {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  gap: 25px;
}

#last{
  margin-bottom: 165px;
}

.chart{
  width: 600px;
}
</style>
