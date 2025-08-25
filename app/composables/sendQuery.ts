// composables/sendQuery.ts
import { useChatStore } from '~/stores/chatstore';
import { ref, onUnmounted } from 'vue';

export const useSendQuery = () => {
  const chatStore = useChatStore();
  const isStreaming = ref(false);
  const error = ref<string | null>(null);
  var eventSource: EventSource | null = null

  const send = async (query: string, username: string) => {
    try {
      isStreaming.value = true;
      error.value = null;

      chatStore.addUserMessage(username, query);
      chatStore.startBotResponse();

      console.log("HIT SEND QUERY")
      const response = await $fetch('https://tayend.onrender.com/postquery/', {
        method: 'POST',
        body: {
          query: query,
          username: username
        },
        headers: {
          'Content-Type': 'application/json'
        },
      });

      console.info(response)
      console.info("STARTING EVENTSOURCE")
      eventSource = new EventSource(`https://tayend.onrender.com/postquery/stream/${username}`);

      if (eventSource) {
        console.info("EVENTSOURCE INIT")
      }

      eventSource.onopen = () => {
        console.info('EventSource connected to:', eventSource.url);
      };

      //Handle incoming stream events --
      eventSource.onmessage = (event) => {
        console.info("EVENTSOURCE MESSAGE GOTTEN")
        try {
          console.info("EVENT GOTTEN")
          //const data = JSON.parse(event.data);
          console.info(event.data)

          console.info(event.data.split("::"))
          var iter_dict = {
            "type": "ANSWER",
            "details": event.data
          }

          if (event.data.startsWith("STEP_START::")) {
            iter_dict = {
              "type": "STEP",
              "category": "START",
              "details": event.data.split("::")[1]
            }
          } else if (event.data.startsWith("STEP_RESULT::")) {
            iter_dict = {
              "type": "STEP",
              "category": "RESULT",
              "details": event.data.split("::")[1].replace("$", "").replace("_", " ")
            } 
          } else if (event.data.startsWith("ANSWER::")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                const json_data = JSON.parse(json_str)
                console.log(json_data)
                iter_dict = {
                  "type": "ANSWER",
                  "details": json_data
                }
                console.info(iter_dict)
                console.info("new dict")
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }else if (event.data.startsWith("CLARIFICATION::")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                const json_data = JSON.parse(json_str)
                console.log(json_data)
                iter_dict = {
                  "type": "CLARIFICATION",
                  "details": json_data
                }
                console.info(iter_dict)
                console.info("new dict")
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }else if (event.data.startsWith("CLARIFICATION_END::")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                iter_dict = {
                  "type": "STEP",
                  "category": "RESULT",
                  "details": json_str
                }
                console.info(iter_dict)
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }
          
          if (event.data.includes("ERROR::")) {
            console.info("DATA ERROR OCCURRED FOR EVENTSOURCE")
            isStreaming.value = false;
            json_str = event.data.split("::")[1]
            try {
              iter_dict = {
                "type": "ERROR",
                "details": json_str
              }
              console.info(iter_dict)
              console.info("new dict")
              chatStore.addBotResponsePart(iter_dict);
            } catch(error) {
              console.info("ERROR IN PARSING JSON DATA")
            }
            eventSource?.close();
            return;
          }
          // Add the parsed chunk to the store
          console.info(iter_dict)
          chatStore.addBotResponsePart(iter_dict);
          if (event.data.includes("ANSWER::")) {
            console.info("DATA EVENTSOURCE DONE")
            eventSource?.close();
            isStreaming.value = false;
          }
        }catch (e) {
          error.value = 'Failed to parse JSON: ' + (e instanceof Error ? e.message : String(e));
          console.info("AN ERROR OCCURED PERHAPS IN PARSING")
          eventSource?.close();
          isStreaming.value = false;
        }
      };
      eventSource.onerror = (event) => {
        error.value = 'Connection to server lost';
        console.info(eventSource)
        console.info(eventSource.readyState)
        console.info(event)
        eventSource?.close();
        isStreaming.value = false;
      }; 
    } catch (err) {
      error.value = 'Failed to send query';
      console.error('Error in sendQuery:', err);
      isStreaming.value = false;
    } finally {
      isStreaming.value = false;
    }
  };

  const sendClarification = async (
    id: string, category: string, answer: string
  ) => {
    isStreaming.value = true;
    error.value = null;

    try {
      chatStore.startBotResponse();
      console.log("HIT CLARIFICATION QUERY")
      const response = await $fetch('https://tayend.onrender.com/postquery/clarifications/', {
        method: 'POST',
        body: {
          id: id,
          category: category,
          answer: answer
        },
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.info(response)
      console.info("STARTING EVENTSOURCE")
      eventSource = new EventSource(`https://tayend.onrender.com/postquery/clarifications/stream/${username}`);

      if (eventSource) {
        console.info("EVENTSOURCE INIT")
      }

      eventSource.onopen = () => {
        console.info('EventSource connected to:', eventSource.url);
      };

      //Handle incoming stream events --
      eventSource.onmessage = (event) => {
        console.info("EVENTSOURCE MESSAGE GOTTEN")
        try {
          console.info("EVENT GOTTEN")
          //const data = JSON.parse(event.data);
          console.info(event.data)

          console.info(event.data.split("::"))
          var iter_dict = {
            "type": "ANSWER",
            "details": event.data
          }

          if (event.data.startsWith("STEP_START")) {
            iter_dict = {
              "type": "STEP",
              "category": "START",
              "details": event.data.split("::")[1]
            }
          } else if (event.data.startsWith("STEP_RESULT")) {
            iter_dict = {
              "type": "STEP",
              "category": "RESULT",
              "details": event.data.split("::")[1].replace("$", "").replace("_", " ")
            } 
          } else if (event.data.startsWith("ANSWER")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                const json_data = JSON.parse(json_str)
                console.log(json_data)
                iter_dict = {
                  "type": "ANSWER",
                  "details": json_data
                }
                console.info(iter_dict)
                console.info("new dict")
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }else if (event.data.startsWith("CLARIFICATION")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                const json_data = JSON.parse(json_str)
                console.log(json_data)
                iter_dict = {
                  "type": "CLARIFICATION",
                  "details": json_data
                }
                console.info(iter_dict)
                console.info("new dict")
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }else if (event.data.startsWith("CLARIFICATION_END")) {
              const json_str = event.data.split("::")[1]
              console.log(json_str)
              try {
                iter_dict = {
                  "type": "STEP",
                  "category": "RESULT",
                  "details": json_str
                }
                console.info(iter_dict)
              } catch(error) {
                console.info("ERROR IN PARSING JSON DATA")
              }
            }
          
          if (event.data.includes("ERROR::")) {
            console.info("DATA ERROR OCCURRED FOR EVENTSOURCE")
            isStreaming.value = false;
            json_str = event.data.split("::")[1]
            try {
              iter_dict = {
                "type": "ERROR",
                "details": json_str
              }
              console.info(iter_dict)
              console.info("new dict")
              chatStore.addBotResponsePart(iter_dict);
            } catch(error) {
              console.info("ERROR IN PARSING JSON DATA")
            }
            eventSource?.close();
            return;
          }
          // Add the parsed chunk to the store
          console.info(iter_dict)
          chatStore.addBotResponsePart(iter_dict);
          if (event.data.includes("ANSWER::")) {
            console.info("DATA EVENTSOURCE DONE")
            eventSource?.close();
            isStreaming.value = false;
          }
        }catch (e) {
          error.value = 'Failed to parse JSON: ' + (e instanceof Error ? e.message : String(e));
          console.info("AN ERROR OCCURED PERHAPS IN PARSING")
          eventSource?.close();
          isStreaming.value = false;
        }
      };
      eventSource.onerror = (event) => {
        error.value = 'Connection to server lost';
        console.info(eventSource)
        console.info(eventSource.readyState)
        console.info(event)
        eventSource?.close();
        isStreaming.value = false;
      }; 
    }catch (err) {
      error.value = 'Failed to send query';
      console.error('Error in sendQuery:', err);
      isStreaming.value = false;
    } finally {
      isStreaming.value = false;
    }
  }

  onUnmounted(() => {
    if (eventSource) {
      eventSource.close();
      isStreaming.value = false;
    }
  });

  return { send, error, isStreaming, sendClarification };
};