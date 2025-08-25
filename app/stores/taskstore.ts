import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useTaskStore = defineStore(
  'taskstore',
  () => {
    const tasks = ref([])
    function addTask(task_arg: any) {
      console.log(tasks)
      tasks.value.push(task_arg)
    }
    function removeTasks() {
      tasks.value = []
    }
    return {
      tasks, addTask, removeTasks
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.sessionStorage(),
    }
  }
)