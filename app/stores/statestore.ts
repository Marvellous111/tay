import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore(
  'statestore',
  () => {
    const taskToast = ref<boolean>(false)

    function showTaskToast() {
      taskToast.value = !taskToast.value
    }

    return { 
      taskToast, showTaskToast
    }
  },
)