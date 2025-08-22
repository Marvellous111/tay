// composables/sendQuery.ts
import { useChatStore } from '~/stores/chatstore';
import { ref } from 'vue';

export const useSendQuery = () => {
  const chatStore = useChatStore();
  const isStreaming = ref(false);
  const error = ref<string | null>(null);

  const send = async (query: string, username: string) => {
    try {
      isStreaming.value = true;
      error.value = null;

      chatStore.addUserMessage(username, query);
      chatStore.startBotResponse();

      // Use EventSource for SSE streaming
      // const eventSource = new EventSource('/api/query', {
      //   withCredentials: false, // If you need cookies/auth
      // });

      // Send the query to the server
      const response = await $fetch('/api/query', {
        method: 'POST',
        body: {
          query,
          username,
        },
      });

      // Handle incoming stream events
      // eventSource.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   if (data.error) {
      //     error.value = data.error;
      //     eventSource.close();
      //     isStreaming.value = false;
      //     return;
      //   }
      //   // Add the parsed chunk to the store
      //   chatStore.addBotResponsePart(data);
      // };

      // // Handle stream closure
      // eventSource.onclose = () => {
      //   isStreaming.value = false;
      //   eventSource.close();
      // };

      // // Handle errors
      // eventSource.onerror = () => {
      //   error.value = 'Streaming error occurred';
      //   isStreaming.value = false;
      //   eventSource.close();
      // };
      return response
    } catch (err) {
      error.value = 'Failed to send query';
      console.error('Error in sendQuery:', err);
      isStreaming.value = false;
    }
  };

  return { send, error, isStreaming };
};