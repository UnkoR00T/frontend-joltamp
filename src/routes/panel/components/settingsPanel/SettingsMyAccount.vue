<script setup lang="ts">
import { dataProfileInfo } from '../../data/profile'

const userInfo:any = dataProfileInfo()

userInfo.refreshUserInfo()
</script>
<template>
  <div class="settings">
    <div class="account-view">
      <div class="baner" style="background-color: black">
        <img class="profile-img" src="https://via.placeholder.com/40" alt="" />
      </div>
      <div class="profile">
        <div class="profilename">{{ userInfo.profile.displayname }}</div>
        <table class="main-table">
          <tr>
            <td>{{ userInfo.profile.displayname }}</td>
            <td></td>
          </tr>
          <tr>
            <td>{{ userInfo.profile.username }}</td>
            <td></td>
          </tr>
          <tr>
            <td>{{ userInfo.profile.email }}</td>
            <td></td>
          </tr>
          <tr>
            <td>{{ userInfo.profile.createdat }}</td>
            <td></td>
          </tr>
          <details>
            <summary>SHOW MORE</summary>
            <table>
              <tr>
                <td>{{ userInfo.profile.createdat }}</td>
                <td>teststs</td>
              </tr>
              <tr>
                <td>test1</td>
                <td>teststs</td>
              </tr>
            </table>
          </details>
        </table>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './../../panel.scss';
@import './Settings.scss';

.account-view {
  background-color: $bgc1;
  border-radius: 10px;
  overflow: hidden;

  .baner {
    width: 100%;
    height: 80px;
    position: relative;

    .profile-img {
      height: 80px;
      border-radius: 50%;
      aspect-ratio: 1/1;
      border: 8px solid $bgc1;
      box-sizing: content-box;
      position: absolute;
      top: 50px;
      left: 25px;
    }
  }

  .profile {
    padding: 0 20px 20px 20px;
    position: relative;
    color: white;

    .main-table {
      margin-top: 100px;

      details {
        summary {
          list-style: none;
          cursor: pointer;
          margin-left: 10px;
          margin: 10px 0 3px 10px;
          font-family: 'Roboto';
          font-weight: 700;
          font-size: 12px;
        }
        table {
        }
      }
    }
  }
}
</style>
