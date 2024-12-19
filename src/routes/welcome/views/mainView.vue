<script setup lang="ts">
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
    <div class="container">
      <div class="left">
        <h1>IMAGINE A PLACE...</h1>
        <p>
          ...where you can join communities, groups of friends, or people from around the world.
          JoltAMP makes conversations and meetings easy, fast, and always available when you need
          them. Just chat and have fun, wherever you are!
        </p>

        <div class="buttons">
          <RouterLink to="/download" class="btn">Download</RouterLink>
          <RouterLink to="/login" class="btn">Open Joltamp</RouterLink>
        </div>
      </div>
      <div class="right">
        <div class="img"></div>
      </div>
    </div>
    <div class="cards">
      <h1>Why us?</h1>
      <div class="cardsHolder">
        <div class="card">
          <h3 class="cardTitle">Speed</h3>
          <p class="cardContent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur fugiat ipsa
            tempore voluptas? Adipisci delectus deserunt, dicta esse fugiat harum impedit incidunt
            inventore laborum maxime minus nam natus numquam obcaecati possimus quaerat quas quod
            repellendus saepe, sit ullam, unde ut voluptate! Accusamus culpa deserunt doloremque, id
            ipsam rem tempore.
          </p>
        </div>
        <div class="card">
          <h3 class="cardTitle">Secure</h3>
          <p class="cardContent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur fugiat ipsa
            tempore voluptas? Adipisci delectus deserunt, dicta esse fugiat harum impedit incidunt
            inventore laborum maxime minus nam natus numquam obcaecati possimus quaerat quas quod
            repellendus saepe, sit ullam, unde ut voluptate! Accusamus culpa deserunt doloremque, id
            ipsam rem tempore.
          </p>
        </div>
        <div class="card">
          <h3 class="cardTitle">Easy</h3>
          <p class="cardContent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur fugiat ipsa
            tempore voluptas? Adipisci delectus deserunt, dicta esse fugiat harum impedit incidunt
            inventore laborum maxime minus nam natus numquam obcaecati possimus quaerat quas quod
            repellendus saepe, sit ullam, unde ut voluptate! Accusamus culpa deserunt doloremque, id
            ipsam rem tempore.
          </p>
        </div>
        <div class="card">
          <h3 class="cardTitle">Fun</h3>
          <p class="cardContent">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur fugiat ipsa
            tempore voluptas? Adipisci delectus deserunt, dicta esse fugiat harum impedit incidunt
            inventore laborum maxime minus nam natus numquam obcaecati possimus quaerat quas quod
            repellendus saepe, sit ullam, unde ut voluptate! Accusamus culpa deserunt doloremque, id
            ipsam rem tempore.
          </p>
        </div>
      </div>
    </div>
    <footer class="footer">
      <p>&copy; Copyright by JoltAMP.pl</p>
    </footer>
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
.socials {
  float: right;
  margin-left: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fffaff;
}
.socials > * {
  margin-right: 5px;
  transition-duration: 0.5s;
  color: #fffaff;
}
.socials > *:hover {
  transform: rotate(15deg) scale(1.2);
}
#icon1:hover {
  color: deeppink;
}
#icon2:hover {
  color: #0f0fc6;
}
#icon3:hover {
  color: red;
}
#icon4:hover {
  color: black;
}
* {
  color: #fffaff;
}

@media screen and (max-width: 1180px) {
  .body {
    padding: 10px !important;
  }
  .container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .left > p,
  .left > h1 {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    text-align: center;
  }
  .right > .img {
    display: none;
  }
  .left > .buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .left {
    width: 70dvw !important;
    margin-top: 50px;
  }
  .cardsHolder {
    display: grid;
    grid-template-columns: 1fr 1fr !important;
    grid-template-rows: 1fr 1fr !important;
  }
  .cards {
    text-align: center;
  }
}

.cardContent {
  width: 100%;
}

.footer {
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.cards {
  margin-top: 80px;
}

.cards > h1 {
  text-align: center;
}

.cardsHolder {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
}

.card {
  margin: 1dvw;
  background-color: #ffffff0f;
  padding: 25px;
  border-radius: 8px;
}

.cardTitle {
  font-size: 2em;
  text-align: center;
  margin-bottom: 5px;
  margin-top: 5px;
}

.container {
  display: flex;
}
.container > * {
  width: 50dvw;
}
.right > .img {
  background-image: url(../discord.png);
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto !important;
  background-color: transparent;
  aspect-ratio: 16/9;
  height: 45dvh;
  backdrop-filter: blur(10px);
}
.left {
  text-align: start;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.body {
  font-family: Arial, sans-serif;
  background-color: #272727;
  color: #fffaff;
  overflow-x: hidden;
  height: 100dvh;
  padding: 5dvw;
  padding-bottom: 2dvw;
}

.container {
  text-align: center;
  margin-top: 60px;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  line-height: 1.6;
}

.buttons {
  margin-top: 30px;
}

.btn {
  background-color: #fffaff;
  color: #272727;
  padding: 15px 25px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  margin: 10px;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #dedcdc;
}

.btn-primary {
  background-color: #498467;
  color: white;
}

.btn-primary:hover {
  background-color: #429e73;
}
</style>
