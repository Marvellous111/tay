import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore(
  'statestore',
  () => {
    const authToast = ref<boolean>(false);
    const authToastType = ref<String>('SIGNIN');

    function changeAuthToast() {
      authToast.value = !authToast.value
    }

    function changeAuthToastType(args: String) {
      if (authToast.value) {
        authToastType.value = args
      }else {
        authToast.value = !authToast.value
        authToastType.value = args
      }
    }
    
    const isChatLoad = ref(false)

    function changeChatLoad() {
      isChatLoad.value = !isChatLoad.value
    }

    const taskToast = ref<boolean>(false)

    const tasks = ref([])

    function showTaskToast() {
      taskToast.value = !taskToast.value
    }

    function addTask(task_arg: any) { //For now it will be any, later we will fix to accomodate
      tasks.value.push(task_args)
    }

    const getTasks  = computed(() => tasks.value)

    return { 
      authToast, isChatLoad, changeChatLoad,
      taskToast, showTaskToast,
      tasks, addTask, getTasks,
      authToastType, changeAuthToastType, changeAuthToast
    }
  },
)