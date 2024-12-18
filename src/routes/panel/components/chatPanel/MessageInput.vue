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
        <textarea
          @input="adjustHeight"
          @keydown="handleKeyDown"
          :style="{ height: `${messageInput.height}px` }"
          type="text"
          placeholder="Type a message..."
          v-model="messageInput.content"
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
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const messageInput = ref({ content: "", height: 30, maxLines: 10, lineHeight: 20, minLineHeight: 30 });
const messageToSend = ref()

const route = useRoute()
const OptionMessageId = ref(0)

const props = defineProps({
  addMessage: {
    type: Function,
    required: true
  },
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
  (newValue) => {
    if (newValue) {
      OptionMessageId.value = 1;
      messageInput.value.content = props.editMessage.Content
    }
  }
);

watch(
  () => props.replyMessage,
  (newValue) => {
    if (newValue) {
      OptionMessageId.value = 2;
    }
  },
  { deep: true }
);

const adjustHeight = () => {
  // Obliczanie liczby linii na podstawie zawartości
  const currentLines = messageInput.value.content.split("\n").length;

  // Ustawienie wysokości na podstawie liczby linii
  if (currentLines > 1) {
    messageInput.value.height = Math.min(messageInput.value.lineHeight * currentLines, messageInput.value.lineHeight * messageInput.value.maxLines);
  } else {
    messageInput.value.height = messageInput.value.minLineHeight; // minimalna wysokość
  }
}
//Handle key down
const handleKeyDown = (event) => {
  if (event.key === "Enter" && event.shiftKey) {

  } else if (event.key === "Enter") {
    messageToSend.value = messageInput.value.content;
    messageInput.value.content = '';
    messageInput.value.height = messageInput.value.minLineHeight;
    sendMessage();
  }
}

//Sending message
const sendMessage = () => {
  // Sprawdzanie, czy wiadomość nie jest pusta
  if (messageToSend.value && messageToSend.value.trim().length > 0) {
    // Normalne wysyłanie wiadomości (z możliwością odpowiedzi)
    if (OptionMessageId.value === 0 || (OptionMessageId.value === 2 && messageToSend.value)) {
      axios.post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/send`,
        {
          target: route.params.id,
          content: messageToSend.value,
          ...(OptionMessageId.value ? { reply: props.replyMessage.MessageId } : {})
        }, {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        }
      )
        .then(res => {
          if (res.status === 200) {
            props.addMessage(res.data, 0)
            closeOptionPanel()
          }
        })
        .catch((err) => {
          console.log(err)
          props.addMessage(res.data, 2)
        })
    }
    // Edytowanie wiadomości
    else if (OptionMessageId.value === 1 && messageToSend.value) {
      const changedMessage = { ...props.editMessage, Content: messageToSend.value };
      axios.post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/messages/edit`,
        {
          target: route.params.id,
          sentat: changedMessage.SentAt,
          sentattime: changedMessage.SentAtTime,
          message: changedMessage.MessageId,
          content: messageToSend.value,
        }, {
          headers: {
            Authorization: localStorage.getItem('jwt')
          }
        }
      ).then((res) => {
        if (res.status === 200) {
          props.changeMessageContent(changedMessage)
          closeOptionPanel()
        }
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}

// Zamykanie panelu opcji
const closeOptionPanel = () => {
  OptionMessageId.value = 0
  messageInput.value.content = '';
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

    textarea {
      resize: none;
      flex: 1;
      padding: 0.5rem;
      border: none;
      border-radius: 0.25rem;
      background-color: #2f3136;
      color: white;
    }

    button[type="submit"] {
      max-height: 30px;
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
