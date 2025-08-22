<script lang="ts" setup>
import { Plus } from 'lucide-vue-next';
definePageMeta({
  layout: "default"
})

useSeoMeta({
  title: "Tay | Tasks"
})

const stateStore = useStateStore()
const task_list = ref([])
const isTaskList = computed(() => task_list.length >= 1)
const isShowtaskToast = computed(() => stateStore.taskToast)
const showTask = () => {
  stateStore.showTaskToast()
}

</script>

<template>
  <div class="taskbar-page">
    <section class="tasks-section">
      <div class="header">
        <span class="geist-medium task-head">Tasks</span>
        <button class="create-button" @click="showTask">
          <span class="geist-medium">Create task</span>
          <Plus :size="16" :stroke-width="1.5" absoluteStrokeWidth class="button-icon" />
        </button>
      </div>
      <div class="task-list">
        <div class="no-tasks">
          <span class="geist-medium">You have no active task, create a task</span>
          <button v-if="isTaskList == false" class="task-button" @click="showTask">
            <span class="geist-medium">Add tasks to the task list</span>
            <Plus :size="16" :stroke-width="1.5" absoluteStrokeWidth class="button-icon" />
          </button>
        </div>
      </div>
    </section>
    <section class="task-toast-wrapper" v-if="isShowtaskToast == true">
      <TaskToast />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.taskbar-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 15px;
  width: stretch;
  height: stretch;
  position: relative;
  .task-toast-wrapper {
    transition: 0.2s ease-in;
    position: absolute;
    width:stretch;
    height: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
    background: rgba(18, 18, 18, 0.6);
  }
  .task-button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    border: 0;
    outline: 0;
    border-radius: 30px;
    background: #121212;
    span {
      font-size: 14px;
      color: #FFFFFF;
    }
    .button-icon {
      color: #FFFFFF;
    }
  }
  .tasks-section {
    display: flex;
    flex-direction: column;
    row-gap: 10px;
  }
  .header {
    display: flex;
    width: stretch;
    justify-content: space-between;
    align-items: center;
    .create-button {
      padding: 7.5px 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      column-gap: 10px;
      border: 0;
      outline: 0;
      border-radius: 30px;
      background: rgba(158, 158, 158, 0.1);
      span {
        font-size: 14px;
        color: #121212;
      }
      .button-icon {
        color: #121212;
      }
    }
    .task-head {
      font-size: 20px;
      letter-spacing: -0.5px;
    }
  }
  .task-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: fit-content;
    padding: 15px;
    border-radius: 15px;
    border: 1px solid rgba(128, 128, 128, 0.5);
    background: #FFFFFF;
    .no-tasks {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 20px;
      margin-top: 25px;
      margin-bottom: 30px;
      button {
        padding: 10px 20px;
      }
    }
  }
} 
</style>