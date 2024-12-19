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
      <div class="download-container">
        <div class="left">
          <div class="img"></div>
        </div>

        <div class="right">
          <h2>JoltAMP</h2>
          <hr />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. At consectetur fugiat ipsa
            tempore voluptas? Adipisci delectus deserunt, dicta esse fugiat harum impedit incidunt
            inventore laborum maxime minus nam natus numquam obcaecati possimus quaerat quas quod
            repellendus saepe, sit ullam, unde ut voluptate! Accusamus culpa deserunt doloremque, id
            ipsam rem tempore.
          </p>

          <select class="btn-download">
            <option selected disabled>Download</option>
            <option><a href="">.exe [Windows]</a></option>
            <option><a href="">.dmg [macOS Apple Silicon]</a></option>
            <option><a href="">.dmg [macOS Intel]</a></option>
            <option><a href="">.tar.gz [Linux 64-bit x86]</a></option>
            <option><a href="">.tar.gz [Linux ARM64]</a></option>
          </select>
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
  .download-container {
    flex-direction: column-reverse !important;
    align-items: center;
    text-align: center;
    margin-top: 10px !important;
  }

  p{
    text-align: center !important;
  }
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
  margin-top: 30px;
  position: relative;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  line-height: 1.6;
}

.download-container {
  display: flex;
  justify-content: space-around !important;
  border-radius: 5px;
}

.left > .img {
  background-image: url(../discord.png);
  background-size: cover;
  background-repeat: no-repeat;
  background-color: transparent;
  aspect-ratio: 16/9;
  height: 45dvh;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
}

.right {
  width: 60%;
  padding: 20px;
}

.right > h2 {
  text-align: center !important;
  margin-bottom: 0;
}

.right > p {
  text-align: left;
  margin-top: 10px;
}

.btn-download {
  border-radius: 5px;
  background: #498467;
  color: #fffaff;
  text-decoration: none;
  padding: 15px;
  border: none;
  font-size: 16px;
  justify-content: center;
  align-self: flex-end;
  text-align: center;
  margin-top: 60px;
}

.btn-download:hover {
  background: #3E6D57;
  transition: .6s;
}
</style>

