<script setup lang="ts">
import { useRouter } from 'vue-router'

import LogoutButton from '../buttons/LogoutButton.vue'

const router = useRouter()
</script>
<template>
  <div class="body">
    <div class="settings-list">
      <ul class="main-list">
        <li>
          <button class="go-back" @click="router.push('/app/friends')">
            <Icon icon="material-symbols:arrow-back" /> {{ $t('components.settingsPanel.goback') }}
          </button>
        </li>
        <hr />
        <li>
          <form class="find-setting">
            <input type="text" placeholder="Search" />
          </form>
        </li>
        <hr />
        <li>
          <ul>
            <span class="class-name">{{ $t('components.settingsPanel.usersettings') }}</span>
            <li @click="router.push('myaccount')">{{ $t('components.settingsPanel.settingsmyaccount.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsdevices.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsfriendrequests.title') }}</li>
          </ul>
        </li>
        <hr />
        <li>
          <ul>
            <span class="class-name">{{ $t('components.settingsPanel.paymentsettings') }}</span>

            <li>{{ $t('components.settingsPanel.settingsnitro.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsgiftinventory.title') }}</li>
          </ul>
        </li>
        <hr />
        <li>
          <ul>
            <span class="class-name">{{ $t('components.settingsPanel.appsettings') }}</span>

            <li>{{ $t('components.settingsPanel.settingsappearance.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsvoiceandvideo.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingschat.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsnotifications.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingskeybinds.title') }}</li>
            <li @click="router.push('languages')">{{ $t('components.settingsPanel.settingslanguage.title') }}</li>
            <li>{{ $t('components.settingsPanel.settingsadvanced.title') }}</li>
          </ul>
        </li>
        <hr />
        <li>
          <ul>
            <span class="class-name">{{ $t('components.settingsPanel.activitysettings') }}</span>

            <li>{{ $t('components.settingsPanel.settingsactivityandprivacy.title') }}</li>
          </ul>
        </li>
        <hr />
        <li>
          <ul>
            <span class="class-name">{{ $t('components.settingsPanel.othersettings') }}</span>

            <li>{{ $t('components.settingsPanel.settingswhatsnew.title') }}</li>
          </ul>
        </li>
        <hr />
        <li>
          <ul>
            <li><LogoutButton /></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="main-content"><RouterView /></div>
  </div>
</template>

<style lang="scss" scoped>
@import './../panel.scss';

.go-back {
  padding: 10px;
  width: 100%;
  background-color: $bgc2;
  color: $fc2;
  border: none;
  margin-top: 20px;
  font-size: 17px;
}
.go-back:hover {
  color: white;
  background-color: $bgc3;
}

.find-setting {
  padding: 7px;

  input {
    background-color: #282828;
    color: white;
    padding: 10px;
    width: 100%;
    border-radius: 5px;
    border: none;
  }
  input:focus {
    outline: none;
  }
}

.settings-list {
  background-color: $bgc2;
  overflow-y: auto;
  width: 40%;
  padding-right: 10px;

  .main-list {
    width: fit-content;
    list-style-type: none;
    display: block;
    margin-left: auto;
    margin-bottom: 100px;
    margin-right: 10px;
    padding-right: 6px;

    hr {
      border: 1px solid rgb(68, 68, 68);
      margin: 5px 0;
    }
    li {
      ul {
        list-style-type: none;

        .class-name {
          color: $fc3;
          font-size: 11px;
          font-weight: 700;
          display: block;
          margin: 5px 0 10px 10px;
        }

        li {
          font-family: 'Inter' sans-serif;
          margin-bottom: 2px;
          padding: 7px;
          color: $fc2;

          &:hover {
            background-color: #ffffff11;
            cursor: pointer;
          }
        }
      }
    }
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
}

.main-content {
  background-color: $bgc3;
  width: 60%;
}
</style>
