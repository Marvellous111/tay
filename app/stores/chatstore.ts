import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useChatStore = defineStore(
  'chatstore', 
  () => {
    const totalChatList = ref<Array<Array<{ type: string; username?: string; query?: string; answer?: Array<{ type: string; details: string | Record<string, any> }> }>>>([]);
    const activeConversationIndex = ref<number | null>(null);

    const chats = ref([])
    /*
    In a chat we can have something like this:
    [{
      "username": "marvellous111",
      "type": "user",
      "query": "Send an email about cats to marvellous90@gmail.com"
    },
    {
      "type":"bot"
      "answer": [
        {
          "type": "PLAN",
          "details": {
            "step_status": "STEP_START",
            "step_number": "0",
            "step_task": "Write a simple poem about love and stars"
          }
        },
        {
          "type": "CLARIFICATION",
          "details": {clarificationdetails based on type of clarification}
        },
        {
          "type": "ANSWER",
          "details": "Here is the answer"
        }
      ]
    }],
    We then pass the list into the total chat box, so it will contain a lot of lists
    */
    const getChats = computed(() => chats.value);
    const getCurrentConversation = computed(() => {
      if (activeConversationIndex.value !== null && totalChatList.value[activeConversationIndex.value]) {
        console.log(totalChatList.value[activeConversationIndex.value])
        return totalChatList.value[activeConversationIndex.value];
      }
      return [];
    });
    const getAllConversations = computed(() => totalChatList.value);
    function startNewConversation() {
      totalChatList.value.push([]);
      activeConversationIndex.value = totalChatList.value.length - 1;
    }
    function setActiveConversation(index: number) {
      if (index >= 0 && index < totalChatList.value.length) {
        activeConversationIndex.value = index;
      } else {
        throw new Error('Invalid conversation index');
      }
    }
    function addUserMessage(username: string, query: string) {
      if (activeConversationIndex.value === null) {
        startNewConversation();
      }
      const userMessage = {
        type: 'user',
        username,
        query
      };
      totalChatList.value[activeConversationIndex.value].push(userMessage);
      console.log(totalChatList.value[activeConversationIndex.value])
    }
    function startBotResponse() {
      if (activeConversationIndex.value === null) {
        throw new Error('No active conversation. Call startNewConversation() first.');
      }
      const botMessage = {
        type: 'bot',
        answer: []
      };
      totalChatList.value[activeConversationIndex.value].push(botMessage);
      console.log(totalChatList.value)
    }
    function addBotResponsePart(part: { type: string; details: string | Record<string, any> }) {
      if (activeConversationIndex.value === null) {
        throw new Error('No active conversation.');
      }
      const currentConversation = totalChatList.value[activeConversationIndex.value];
      if (currentConversation.length === 0 || currentConversation[currentConversation.length - 1].type !== 'bot') {
        throw new Error('No active bot response. Call startBotResponse() first.');
      }
      const currentBotMessage = currentConversation[currentConversation.length - 1];
      currentBotMessage.answer.push(part);
    }
    function clearAllConversations() {
      totalChatList.value = [];
      activeConversationIndex.value = null;
    }
    function deleteConversation(index: number) {
      if (index >= 0 && index < totalChatList.value.length) {
        totalChatList.value.splice(index, 1);
        if (activeConversationIndex.value === index) {
          activeConversationIndex.value = totalChatList.value.length > 0 ? totalChatList.value.length - 1 : null;
        } else if (activeConversationIndex.value !== null && activeConversationIndex.value > index) {
          activeConversationIndex.value -= 1;
        }
      }
    }
    // const getChats = computed(() => chats.value)
    return {
      totalChatList,
      getCurrentConversation,
      getAllConversations,
      activeConversationIndex,
      startNewConversation,
      setActiveConversation,
      addUserMessage,
      startBotResponse,
      addBotResponsePart,
      clearAllConversations,
      deleteConversation
    }
  }, 
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
      pick: ['totalChatList', 'activeConversationIndex']
    },
  }
)