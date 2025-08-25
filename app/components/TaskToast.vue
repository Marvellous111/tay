<script lang="ts" setup>
import { X } from 'lucide-vue-next';

const stateStore = useStateStore();

const title = ref("");
const prompt = ref("");
const weekday = ref("");
const timeOfDay = ref("");

const closeToast = () => {
  stateStore.showTaskToast()
}

const isLoading = ref(false);

const createTask = async () => {
  try {
    isLoading.value = true
    const { postTask } = useTaskQuery();

    const sendtask = await postTask(title.value, prompt.value, "marvellous111", weekday.value, timeOfDay.value) 
    
    isLoading.value = false
    console.log(sendtask)
    closeToast()
  } catch(error) {
    isLoading.value = false
    console.log(error)
  }

}

</script>

<template>
  <div class="tasktoast" ref="taskToast">
    <div class="header">
      <span class="geist-medium create-task-text">Create a task</span>
      <button class="close-button" @click="closeToast">
        <X :size="16" :stroke-width="1.5" absoluteStrokeWidth />
      </button>
    </div>
    <div class="input-wrapper">
      <label class="geist-medium">Task title</label>
      <input type="text" class="geist-regular" v-model="title" />
    </div>
    <div class="input-wrapper">
      <label class="geist-medium">Task prompt</label>
      <textarea type="text" class="geist-regular" no-resize v-model="prompt"></textarea>
    </div>
    <div class="input-wrapper">
      <label class="geist-medium">Time of day (0:00 - 24:00)</label>
      <input type="time" class="geist-regular" v-model="timeOfDay" />
    </div>
    <div class="input-wrapper">
      <label class="geist-medium">Day of the week - Sunday(0) - Saturday(6)</label>
      <input type="text" class="geist-regular" v-model="weekday" />
    </div>
    <div class="button-wrapper">
      <button class="send-button" @click="createTask" :disabled="isLoading">
        <span class="geist-medium" v-if="isLoading == false" >Create task</span>
        <Loader v-if="isLoading" />
      </button>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.tasktoast {
  // border: 1px solid rgba(128, 128, 128, 0.5);
  background: #FFFFFF;
  width: 400px;
  height: fit-content;
  padding: 20px 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  align-items: center;
  justify-content: center;
  @include responsive(mobile) {}
  .header {
    display: flex;
    width: stretch;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    .create-task-text {
      width: fit-content;
      font-size: 18px;
    }
    button {
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 50%;
      border: 0;
      outline: 0;
      background: rgba(128, 128, 128, 0.2);
    }
  }
  .input-wrapper {
    width: stretch;
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    label {
      font-size: 13px;
      letter-spacing: -0.1px;
    }
    input {
      border: 1px solid rgba(128, 128, 128, 0.5);
      border-radius: 5px;
      outline: 0;
      width: stretch;
      padding: 2.5px 5px;
      height: 20px;
      font-size: 15px;
    }
    textarea {
      resize: none;
      border: 1px solid rgba(128, 128, 128, 0.5);
      height: 100px;
      width: stretch;
      border-radius: 5px;
      padding: 2.5px 5px;
      outline: 0;
      font-size: 15px;
    }
  }
  .button-wrapper {
    width: stretch;
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 5px;
    button{
      border: 0px;
      outline: 0;
      background: #121212;
      height: 32px;
      min-width: 150px;
      width: fit-content;
      border-radius: 20px;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.3s ease;
      span {
        font-size: 15px;
        color: #FFFFFF;
      }
    }
  }
}
</style>