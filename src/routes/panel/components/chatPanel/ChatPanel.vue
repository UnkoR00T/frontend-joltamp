<script setup lang="ts">
import MessageContent from './MessageContent.vue'
import MessageInput from './MessageInput.vue'
import { dataUsersList } from '../../data/users.ts'

import axios from 'axios'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'

// DefineStore variables
const UsersList = dataUsersList()

const route = useRoute()

const messages = ref<any[]>([])

const lastMessage = ref<any>()
const oldestMessage = ref<any>(0)

// Functions:

//Scroll handle

const handleScroll = (event: any) => {
  const target = event.target
  const scrollPosition = Math.ceil(target.scrollTop * -1)
  const maxScrollPosition = target.scrollHeight - target.clientHeight

  // Sprawdzenie, czy doscrollowano do samego dołu
  if (scrollPosition >= maxScrollPosition) {
    loadMessages()
  }
}

//Loading messages to "messages" - wrong order, not splited
const loadMessages = () => {
  axios
      .post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/`,
          {
            latest: oldestMessage.value.SentAtTime,
            target: route.params.id
          },
          {
            headers: {
              Authorization: localStorage.getItem('jwt')
            }
          }
      )
      .then((response) => {
        if (response.data) {
          if (response.data[0]) oldestMessage.value = response.data[0]
          messages.value = messages.value.concat(response.data.reverse())
          groupMessages()
        }
      })
}

//Function checks time differences between previous message and current message, returns true/false
const checkTimeDifferences = (previousMessage: any, currentMessage: any) => {
  const maxMessageDelay = 30000

  return !!(
      previousMessage &&
      previousMessage.SentBy == currentMessage.SentBy &&
      previousMessage.SentAt == currentMessage.SentAt &&
      currentMessage.SentAtTime - previousMessage.SentAtTime < maxMessageDelay
  )
}

// Group messages depends on last message
const groupMessages = () => {
  lastMessage.value = {}

  messages.value.reverse()
  messages.value.forEach((x, index) => {

    UsersList.findUser(x.SentBy).then((user:any) => {
      messages.value[messages.value.length -1 - index].displayname = user.displayname
    })

    if (checkTimeDifferences(lastMessage.value, x) && !x.Reply) {
      messages.value[index].combineMessage = false
    } else {
      lastMessage.value = x
      messages.value[index].combineMessage = true
    }
  })
  messages.value.reverse()
}

//Show sent date
function timeAgo(timestamp: number) {
  // Ensure timestamp is a valid number
  if (isNaN(timestamp)) {
    return 'Invalid timestamp';
  }

  const now = Date.now(); // Current timestamp
  const diffInMs = now - timestamp;
  const diffInSec = diffInMs / 1000;
  const diffInMin = diffInSec / 60;
  const diffInHours = diffInMin / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;

  const formatWithDateAndTime = () => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}/${month}/${day} at ${hours}:${minutes}`;
  };

  const formatWithTime = (timeAgo: string) => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${timeAgo} at ${hours}:${minutes}`;
  };

  if (diffInDays < 1) {
    // Less than 24 hours ago
    if (diffInHours < 1) {
      if (diffInMin < 1) return `Now`;
      else {
        return `${Math.floor(diffInMin)} minutes ago`;
      }
    } else {
      return `${Math.floor(diffInHours)} hours ago`;
    }
  } else if (diffInDays < 2) {
    // Yesterday
    return formatWithTime('yesterday');
  } else if (diffInWeeks < 1) {
    // Less than 1 week ago
    return formatWithTime(`${Math.floor(diffInDays)} days ago`);
  } else {
    // More than 1 week ago
    return formatWithDateAndTime();
  }
}



// Catching changes in route.params.id
watch(
    () => route.params.id,
    async (newId, oldId) => {
      if (newId !== oldId) {
        messages.value = []; // Reset messages when route id changes
        oldestMessage.value = {};
        await loadMessages();
      }
    }
)

//Add message to ref 'message'
const addMessage = (message: any, sendStatus: number) => {
  messages.value.unshift({
    ...message, sendStatus: sendStatus, displayname: UsersList.profile.displayname,
    combineMessage: !checkTimeDifferences(lastMessage.value, message)
  });
  lastMessage.value = message;
}






//Edit message content inside ref 'message'
const changeMessageContent = (changedMessage: any) => {
  const messageToChange= messages.value.find(
    (message) => message.MessageId === changedMessage.MessageId
  );
  messageToChange.Content = changedMessage.Content;
  messageToChange.Edited = true;
}

//Before Mound
onBeforeMount(() => {
  loadMessages();

  setInterval(() => {
    // Trigger a re-render every minute
    messages.value = [...messages.value]
  }, 60000);
})

//Context menu
const showContextMenu = ref(false)
const mousePosition = ref<{ x: number; y: number }>({ x: 0, y: 0 })
const contextMenuMessageId = ref<String>("");

const openContextMenu = async(event: any, targetid: String) => {
  contextMenuMessageId.value = targetid;
  showContextMenu.value = true;

  await nextTick();

  const contextmenu = document.getElementById('context-menu');
  const menuWidth = contextmenu?.clientWidth ?? 0;
  const menuHeight:number = contextmenu?.clientHeight ?? 0;

  // Coursor position
  mousePosition.value = { x: event.clientX, y: event.clientY };
  // Make sure that context menu is not outside the screen
  const contextMenuMargin:number = 10;

  if (mousePosition.value.x + menuWidth > window.innerWidth) mousePosition.value.x = window.innerWidth - menuWidth - contextMenuMargin;
  if (mousePosition.value.y + menuHeight > window.innerHeight) mousePosition.value.y = window.innerHeight - menuHeight - contextMenuMargin;
  if (mousePosition.value.x < 0) mousePosition.value.x = contextMenuMargin;
  if (mousePosition.value.y < 0) mousePosition.value.y = contextMenuMargin;

  // Making context menu visible
  //showContextMenu.value = true;
}

const ifMyMessage = (messageId: String) => {
  const messageData = messages.value.find((message) => message.MessageId === messageId)
  return !!(messageData && messageData.SentBy === localStorage.getItem('userId'));
}

//hide context menu
function closeContextMenu() {
  showContextMenu.value = false
}

onMounted(() => {
  document.addEventListener('click', closeContextMenu)
})

onUnmounted(() => {
  document.removeEventListener('click', closeContextMenu)
})

//input element

const replyMessageData = ref<any>()
const editMessageData = ref<any>()
const isInputFocused = ref(false)

function addReaction() {
  console.log('add reaction')
}

function replyMessage(replyMessageId:String) {
  const backupReplyMessageData = replyMessageData.value
  replyMessageData.value = messages.value.find(
      (message) => message.MessageId === replyMessageId
  );

  if(backupReplyMessageData && backupReplyMessageData === replyMessageData.value){
    replyMessageData.value.MessageTimesRepeatCount ++;
  }
  else{
    replyMessageData.value.MessageTimesRepeatCount = 0;
  }

  isInputFocused.value = true
  //console.log(editMessageData.value)
}

const editMessage = (editMessageId:String) => {
  const backupEditMessageData = editMessageData.value
  editMessageData.value = messages.value.find(
      (message) => message.MessageId === editMessageId
  );

  if(backupEditMessageData && backupEditMessageData === editMessageData.value){
    editMessageData.value.MessageTimesRepeatCount ++;
  }
  else{
    editMessageData.value.MessageTimesRepeatCount = 0;
  }
  //console.log(editMessageData.value.MessageTimesRepeatCount);
}

const deleteMessage = (deleteMessageId:String) => {
  const messageToDelete:any = messages.value.find((message) => message.MessageId === deleteMessageId)

  axios
      .post(
          `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/delete`,
          {
            target: route.params.id,
            sentat: messageToDelete.SentAt,
            sentattime: messageToDelete.SentAtTime,
            message: deleteMessageId
          },
          {
            headers: {
              Authorization: localStorage.getItem('jwt')
            }
          }
      )
      .then((res) => {
        if (res.status == 200) {
          messages.value = messages.value.filter((message) => message.MessageId !== deleteMessageId)
          groupMessages()
        }
      })
      .catch((err)=>{
        console.error(err)
      })
}
</script>
<template>
  <div class="main-content">
    <div class="chat-section">
      <div class="chat-header">
        <h3>Chat with {{  }}</h3>
        <div class="chat-header-icons">
          <button class="header-icon">
            <Icon icon="mingcute:phone-call-fill" />
          </button>
          <button class="header-icon">
            <Icon icon="heroicons:video-camera-20-solid" />
          </button>
          <button class="header-icon">
            <i class="bi bi-pin-fill"></i>
          </button>
          <button class="header-icon">
            <Icon icon="solar:mailbox-bold" />
          </button>
          <button class="header-icon">
            <Icon icon="bxs:help-circle" />
          </button>
        </div>
      </div>
      <hr />
      <div class="chat-window" @scroll="handleScroll" @contextmenu.prevent="">
        <MessageContent
            v-for="message in messages"
            :key="message.MessageId"
            :id="message.MessageId"
            :sendStatus="message.sendStatus"
            :reply="message.ReplyBody"
            imgUrl="https://via.placeholder.com/40"
            :nickname="message.displayname"
            :sentDate="timeAgo(message.SentAtTime)"
            :content="message.Content"
            :combineMessage="message.combineMessage"
            :edited="message.Edited"
            @contextmenu.prevent="openContextMenu($event, message.MessageId)"
        />

        <!-- Menu kontekstowe -->
        <div
            class="context-menu"
            id="context-menu"
            v-if="showContextMenu"
            :style="{ top: `${mousePosition.y}px`, left: `${mousePosition.x}px` }"
        >
          <ul>
            <li @click="addReaction">Add reaction</li>
            <li @click="replyMessage(contextMenuMessageId)">Reply</li>
            <li v-if="ifMyMessage(contextMenuMessageId)" @click="editMessage(contextMenuMessageId)">Edit Message</li>
            <li v-if="ifMyMessage(contextMenuMessageId)" @click="deleteMessage(contextMenuMessageId)">Delete Message</li>
          </ul>
        </div>
      </div>
      <MessageInput
        :addMessage="addMessage"
        :changeMessageContent="changeMessageContent"
        :editMessage="editMessageData"
        :replyMessage="replyMessageData"
        :isFocused="isInputFocused"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './../../panel.scss';

* {
  box-sizing: border-box;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: $bgc2;
  padding: 7px;
  overflow: hidden;

  .chat-section {
    flex: 1;
    padding: 10px;
    background-color: $bgc3;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    hr {
      border: 1px solid black;
    }

    .chat-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        color: #ffffff;
        margin-bottom: 1rem;
      }

      .chat-header-icons {
        display: flex;
        align-items: center;

        .header-icon {
          background: none;
          border: none;
          color: $fc3;
          font-size: 1.5rem;
          margin-left: 0.75rem;
          cursor: pointer;
        }

        .header-icon:hover {
          color: white;
        }
      }
    }

    .chat-window {
      flex: 1;
      margin-bottom: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column-reverse;
    }
    ::-webkit-scrollbar {
      width: 8px;
    }
  }
}

.context-menu {
  position: absolute;
  background-color: #333;
  border: 1px solid #555;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 10px;
  z-index: 1000;
  width: 200px;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      color: white;
      padding: 8px 12px;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        background-color: #444;
      }
    }
  }
}
</style>