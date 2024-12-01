<template>
  <div class="chat-container">
    <div class="option-panel" v-if="OptionMessageId !== 0">
      <div class="option-panel-message" v-if="OptionMessageId === 1">
        <span class="option-text">Edit message: </span>
        <span class="option-user">{{ editMessage.Content }}</span>
        <Icon
          @click="closeOptionPanel"
          class="x-icon"
          icon="lets-icons:close-round-fill"
        />
      </div>
      <div class="option-panel-message" v-if="OptionMessageId === 2">
        <span class="option-text">Replying to</span>
        <span class="option-user">{{ replyMessage.Content }}</span>
        <Icon
          @click="closeOptionPanel"
          class="x-icon"
          icon="lets-icons:close-round-fill"
        />
      </div>
    </div>

    <div class="chat-input">
      <button type="button" class="file-button">
        <i class="bi bi-file-earmark-text"></i>
      </button>

      <form @submit.prevent="sendMessage">
        <input
          type="text"
          placeholder="Type a message..."
          v-model="messageContent"
        />
        <button type="submit"><Icon icon="fa:send" /></button>
      </form>
      <button type="button" class="gif-button">
        <Icon icon="basil:present-solid" />
      </button>
      <button type="button" class="emoji-button">
        <Icon icon="line-md:emoji-smile-filled" />
      </button>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'
import { watch } from 'vue';
import { useRoute } from 'vue-router'


const route = useRoute()
const messageContent = ref("")

const OptionMessageId = ref(0)

const props = defineProps({
  //Returns message to add to ref 'message'
  addMessage: {
    type: Function,
    required: true
  },
  //Returns mesasge to change in ref 'message'
  changeMessageContent: {
    type: Function,
    required: true
  },
  editMessage: {
    type: Object,
    required: false
  },
  replyMessage: {
    type: Object,
    required: false
  },
  isFocused: {
    type: Boolean,
    required: false
  }
})

watch(
  () => ({
    id: props.editMessage?.MessageId,
    version: props.editMessage?.MessageTimesRepeatCount
  }),
  (newValue, oldValue) => {
    if (newValue) {
      OptionMessageId.value = 1;
      messageContent.value = props.editMessage.Content
    }
  }
);

watch(
    () => props.replyMessage,
    (newValue, oldValue) => {
      if (newValue) {
        OptionMessageId.value = 2;
      }
    },
  { deep: true }
);


const sendMessage = () => {
  //Normal sending message additional might send a reply
  if (OptionMessageId.value === 0 || OptionMessageId.value === 2 &&  messageContent.value){
    axios.post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/send`,
        {
          target: route.params.id,
          content: messageContent.value,
          ...(OptionMessageId.value ? {reply: props.replyMessage.MessageId} : {})
        }, {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        }
    )
    .then(res => {
      if (res.status === 200) {
        props.addMessage(res.data)
        closeOptionPanel()
      }
    })
    .catch((err) => {
      console.log(err)
    })

  }
  //Editing message
  else if(OptionMessageId.value === 1 &&  messageContent.value){
    const changedMessage = {... props.editMessage, Content: messageContent.value};
    axios.post(
     `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/edit`,
      {
      target: route.params.id,
      sentat: changedMessage.SentAt,
      sentattime: changedMessage.SentAtTime,
      message: changedMessage.MessageId,
      content: changedMessage.Content
      },{
       headers: {
         Authorization: localStorage.getItem('jwt')
       }
      }
    )
    .then(res => {
      if (res.status === 200) {
        props.changeMessageContent(changedMessage)
        closeOptionPanel()
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


//Close panel on the top of chat
const closeOptionPanel = () => {
  OptionMessageId.value = 0
  messageContent.value = '';
}
</script>

<style lang="scss" scoped>
@import "./../../panel.scss";

.chat-container {
  .option-panel {
    background-color: #282828;
    color: #ccc;
    border-radius: 10px 10px 0 0;
    font-size: 15px;

    .option-panel-message {
      display: flex;
      padding: 6px;
      padding-left: 15px;
      align-items: center;

      .option-text {
        font-size: 14px;
      }

      .option-user {
        margin-left: 10px;
        font-size: 14px;
      }

      .x-icon {
        margin-left: auto;
        margin-right: 10px;
        font-size: 20px;

        &:hover {
          color: white;
          cursor: pointer;
        }
      }
    }
  }

  .chat-input {
    display: flex;
    align-items: center;

    .file-button,
    .gif-button,
    .emoji-button {
      background: none;
      border: none;
      color: $fc3;
      font-size: 1.5rem;
      cursor: pointer;
      margin: 0 0.625rem;
    }

    .file-button:hover,
    .gif-button:hover,
    .emoji-button:hover {
      color: white;
    }

    form {
      width: 100%;
      display: flex;
    }

    input {
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      background-color: #2f3136;
      color: white;
    }

    button[type="submit"] {
      padding: 0.5rem;
      background-color: #7289da;
      border: none;
      border-radius: 0.25rem;
      margin-left: 0.625rem;
      color: white;

      &:hover {
        color: white;
        background-color: #5865f2;
      }
    }
  }
}
</style>