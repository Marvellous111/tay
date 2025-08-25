<script lang="ts" setup>
import { ArrowUp, AudioLines, ChevronDown } from 'lucide-vue-next';
import { sendQuery } from '~/composables/sendQuery';
import { useSession } from '../../../server/lib/auth-client';

// definePageMeta({
//   layout: 'default'
// })

useSeoMeta({
  title: "Tay | Chat"
})
const chatStore = useChatStore();
const stateStore = useStateStore();
const { send, isStreaming, error } = useSendQuery();

const gotten_session = useSession();
console.info(gotten_session.value)

const query_input = ref<string>('');
const username = ref<string>('marvellous111'); // Default username, could be from auth
const isWriting = computed(() => query_input.value.length >= 1);

const handleSend = async () => {
  if (query_input.value.length < 2) {
    console.log('Please type in a query');
    return;
  }
  try {
    stateStore.changeChatLoad()
    await send(query_input.value, username.value);
    query_input.value = ''; // Clear input after sending
    stateStore.changeChatLoad()
  } catch (err) {
    console.error('Error in client:', err);
    stateStore.changeChatLoad()
  }
};

const isRecognizing = ref(false);

// Web Speech API setup
// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// console.log(SpeechRecognition)
// const recognition = SpeechRecognition ? new SpeechRecognition() : null;

// if (recognition) {
//   recognition.continuous = false;
//   recognition.interimResults = false;
//   recognition.lang = 'en-US';
// }

const voiceSend = () => {
  // if (!recognition) {
  //   error.value = 'Speech Recognition API not supported in this browser';
  //   return;
  // }
  // console.log(isRecognizing.value)
  // if (isRecognizing.value) {
  //   recognition.stop();
  //   isRecognizing.value = false;
  // } else {
  //   recognition.start();
  //   isRecognizing.value = true;
  // }
};

// if (recognition) {
//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript.trim();
//     query_input.value = transcript;
//     isRecognizing.value = false;
//     if (transcript) {
//       send(transcript, username.value); // Fixed from sendQuery
//     }
//   };

//   recognition.onerror = (event) => {
//     console.error('Speech recognition error:', event.error);
//     error.value = `Speech recognition failed: ${event.error}`;
//     isRecognizing.value = false;
//   };

//   recognition.onend = () => {
//     isRecognizing.value = false;
//   };
// }

// Auto-resize textarea
const textarea = ref<HTMLTextAreaElement | null>(null);
const resizeTextArea = () => {
  if (textarea.value) {
    textarea.value.style.height = 'auto';
    textarea.value.style.height = `${textarea.value.scrollHeight}px`;
  }
};

const clear = () => {
  chatStore.clearAllConversations()
}

</script>

<template>
  <div class="chat-container">
    <div class="chat-wrapper">
      <div
        v-for="(message, msgIndex) in chatStore.getCurrentConversation"
        :key="msgIndex"
        :class="message.type === 'user' ? 'user' : 'bot'"
        class="query-response"
      >
        <div class="user" v-if="message.type === 'user'">
          <span class="geist-medium">{{ message.query }}</span>
        </div>
        <div v-if="stateStore.isChatLoad">
          <LoadingMessage />
        </div>
        <div class="bot" v-if="message.type === 'bot'">
          <div v-for="(part, partIndex) in message.answer" :key="partIndex" class="part-wrapper">
            <div v-if="part.type === 'STEP'" class="plan-part">
              <StepsStart :details="part.details" :category="part.category" />
            </div>
            <div v-if="part.type === 'CLARIFICATION'" class="clarification-part">
              <ClarificationValueConfirmation v-if="part.details['category'] === 'Value Confirmation'"  />
              <ClarificationInput v-if="part.details['category'] === 'Input'" />
              <ClarificationAction v-if="part.details['category'] === 'Action'" />
            </div>
            <div v-if="part.type === 'ANSWER'" class="answer-part geist-medium">
              {{ part.details.final_output["summary"] }}
            </div>
            <div v-if="part.type === 'ERROR'" class="error-part geist-medium">
              {{ part.details }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="input-field">
      <textarea class="input-area geist-regular" ref="textarea" @input="resizeTextArea" placeholder="Type your message here..." v-model="query_input"></textarea>
      <section class="model-send-section">
        <div class="connected-apps" @click="clear">
          <span class="geist-medium">Connected apps</span>
          <ChevronDown
            :size="16"
            :stroke-width="1.5"
            absoluteStrokeWidth
          />
        </div>
        <button class="send-button black" :class="{ 'black': !isRecognizing, 'active-voice': isRecognizing }" @click="voiceSend" v-if="isWriting == false">
          <AudioLines
            :size="24"
            absoluteStrokeWidth
            class="button-icon" />
        </button>
        <button class="send-button black" @click="handleSend" v-if="isWriting" :disabled="isStreaming || query_input.length < 2">
          <ArrowUp v-if="stateStore.isChatLoad == false"
            :size="24"
            absoluteStrokeWidth
            class="button-icon"
          />
          <Loader v-if="stateStore.isChatLoad == true" />
        </button>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.black {
  background: #121212;
  .button-icon {
    color: #FFFFFF;
  }
}
.active-voice {
  background: rgba(128, 128, 128, 0.3);
  .button-icon {
    color: #121212;
  }
}
.chat-container {
  width: stretch;
  height: stretch;
  position: relative;
  flex-direction: column;
  align-content: start;
  justify-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px 20px 20px 20px;
  // background: #FFFFFF;
  .chat-wrapper {
    //margin: 0 auto;
    z-index: 7;
    // border: 1px solid black;
    width: 80%;
    min-height: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow: hidden;
    position: relative;
    padding-bottom: 20%;
    .query-response {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 20px;
      height:fit-content;
      width:stretch;
      z-index: 0;
      .user {
        align-self: flex-end;
        display: flex;
        align-items: center;
        justify-content: left;
        text-align: left;
        padding: 10px;
        width: fit-content;
        max-width: 400px;
        height: fit-content;
        border-radius: 15px 15px 0px 15px;
        transition: 0.2s ease-in;
        background: #FFFFFF;
        border: 1px solid rgba(128, 128, 128, 0.5);
        span {
          display: flex;
          width: stretch;
          max-width: 400px;
          height: auto;
          font-size: 15px;
        }
      }
      .bot {
        display: flex;
        flex-direction: column;
        row-gap: 7.5px;
        align-items: start;
        align-self: flex-start;
        .part-wrapper {
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          justify-content: left;
          align-items: start;
        }
        .load-message {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .input-field {
    z-index: 10;
    width: 60%;
    position: fixed;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    min-height: 18%;
    max-height: auto;
    height: 40px;
    padding: 7.5px 7.5px 7.5px 7.5px;
    border-radius: 25px;
    background-color: #FFFFFF;
    border: 1px solid rgba(128, 128, 128, 0.5);
    textarea {
      display: flex;
      border-radius: 17.5px;
      width: stretch;
      background: inherit;
      height: 60%;
      resize: none;
      outline: 0;
      padding: 15px 15px 0px 15px;
      font-size: 16px;
      //font-weight: normal;
      border: 0;
      color: #121212;
      transition: height 0.3s;
    }
    textarea::placeholder {
      color: rgba(18, 18, 18, 0.6);
      font-family: "geist-light";
    }
    .model-send-section {
      display: flex;
      //border: 1px solid black;
      width: stretch;
      height: 40%;
      justify-content: space-between;
      align-items: center;
      padding-left: 17.5px;
      //margin-top: 5px;
      .connected-apps {
        cursor: pointer;
        display: flex;
        align-items: center;
        column-gap: 7.5px;
        border: 1px solid black;
        border-radius: 15px;
        height: 28px;
        width: fit-content;
        padding: 0px 10px;
      }
      .send-button {
        outline: 0;
        border: 0;
        width: 38px;
        height: 38px;
        align-self: flex-end;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        .button-icon {
          transition: 0.2s ease-out;
        }
        transition: 0.1s ease-out;
      }
      .send-button:active {
        transform: scale(0.9);
        background: rgba(128, 128, 128, 0.7);
        .button-icon {
          color: #121212;
        }
      }
    }
  }
}
</style>