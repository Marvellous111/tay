<script lang="ts" setup>
import { Plus, X } from 'lucide-vue-next';
definePageMeta({
  layout: "default"
})

useSeoMeta({
  title: "Tay | Tasks"
})
const taskStore = useTaskStore()
const stateStore = useStateStore()
const task_list = ref([
  {
    "title": "Tame your day",
    "prompt": "Help me tame my day",
    "timeOfDay": "09:00",
    "weekday": "day of the week",
    "actions_taken": [
      [
        {
          "type": "ANSWER",
          "details": "Here is the answer"
        }
      ]
    ]
  },
  {
    "title": "Tame your day2",
    "prompt": "Help me tame my day2",
    "timeOfDay": "09:00",
    "weekday": "monday",
    "actions_taken": [
      [
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
          "details": "clear"
        },
        {
          "type": "ANSWER",
          "details": "Here is the answer"
        }
      ],
    ]
  },
  {
    "title": "Tame your day3",
    "prompt": "Help me tame my day3",
    "timeOfDay": "09:00",
    "weekday": "sunday",
    "actions_taken": [
      [
        {
          "type": "ANSWER",
          "details": "Here is the answer"
        }
      ]
    ]
  }
])
const shownTask = ref([])
const isTaskList = computed(() => task_list.value.length >= 1)
const isShowtaskToast = computed(() => stateStore.taskToast)
const isShownTaskList = ref(false)
const showTask = () => {
  stateStore.showTaskToast()
}

const showTaskSidebar = (task: any) => {
  console.log(isShownTaskList.value)
  shownTask.value = task
  isShownTaskList.value = true
  console.log(shownTask.value)
  console.log(isShownTaskList.value)
}

const closeShownTask = () => {
  shownTask.value = []
  isShownTaskList.value = false;
}

const getTasks = async () => {
  const { getTask } = useTaskQuery();

  await getTask("marvellous111")
}

onMounted(() => {
  getTasks()
})

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
        <div class="no-tasks" v-if="taskStore.tasks.length < 1">
          <span class="geist-medium">You have no active task, create a task</span>
          <button class="task-button" @click="showTask">
            <span class="geist-medium">Add tasks to the task list</span>
            <Plus :size="16" :stroke-width="1.5" absoluteStrokeWidth class="button-icon" />
          </button>
        </div>
        <div class="tasks-wrapper" v-if="taskStore.tasks.length >= 1">
          <div class="list-tasks" v-for="task in taskStore.tasks" @click="showTaskSidebar(task)">
            <div class="task-title">
              <span class="geist-medium">{{ task.title }}</span>
            </div>
            <div class="task-time-wrapper">
              <span class="geist-regular">{{ task.time }}</span>
            </div>
            <!-- <More :size="16" :stroke-width="1.5" absoluteStrokeWidth /> -->
          </div>
        </div>
      </div>
    </section>
    <section class="show-tasks" v-if="isShownTaskList == true">
      <section class="header">
        <span class="geist-medium">{{ shownTask.title }}</span>
        <button class="close-button" @click="closeShownTask">
          <X :size="28" :stroke-width="1.5" absoluteStrokeWidth />
        </button>
      </section>
      <section class="details">
        <section class="time-freq">
          <span class="geist-regular">Every {{ shownTask.weekday }} at {{ shownTask.time }}</span>
        </section>
        <section class="prompt-wrapper">
          <span class="geist-regular">{{ shownTask.prompt }}</span>
        </section>
      </section>
      <section class="actions-wrapper">
        <div class="tasks-actions" v-for="action in shownTask.actions_taken">
          <div class="bot">
            <div v-for="(part, partIndex) in action" :key="partIndex" class="part-wrapper">
              <div v-if="part.type === 'PLAN'" class="plan-part">
                <Steps />
              </div>
              <div v-if="part.type === 'CLARIFICATION'" class="clarification-part">
                <ClarificationValueConfirmation />
              </div>
              <div v-else-if="part.type === 'ANSWER'" class="answer-part">
                <span class="geist-regular">{{ part.details }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
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
  // flex-direction: column;
  column-gap: 30px;
  width: stretch;
  height: stretch;
  position: relative;
  .task-toast-wrapper {
    transition: 0.5s ease-in;
    position: absolute;
    width:stretch;
    height: stretch;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 15;
    background: rgba(128, 128, 128, 0.1);
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
    .tasks-wrapper {
      display: flex;
      flex-direction: column;
      transition: 0.3s ease-out;
      width: stretch;
      align-items: center;
      .list-tasks {
        cursor: pointer;
        width: stretch;
        animation: scaleFade 0.3s ease;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 28px;
        padding: 10px 5px;
        // border-bottom: 1px solid rgba(128, 128, 128, 0.5);
        border-radius: 7.5px;
        .task-time-wrapper {
          display: flex;
          align-items: center;
          column-gap: 10px;
        }
      }
      .list-tasks:active {
        background: rgba(230, 230, 230, 0.5);
      }
    }
  }
  .show-tasks {
    animation: slideIn 0.5s ease;
    margin-right: -70px;
    height: stretch;
    border-left: 1px solid rgba(128, 128, 128, 0.5);
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: start;
    padding: 10px 20px;
    width: 500px;
    background: #FFFFFF;
    .header {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 20px;
      }
      .close-button {
        height: 32px;
        width: 32px;
        border-radius: 50%;
        display: flex;
        align-content: center;
        justify-content: center;
        background: rgba(128, 128, 128, 0.1);
        outline: 0;
        border: 0;
      }
    }
    .details {
      display: flex;
      flex-direction: column;
      row-gap: 5px;
      width: stretch;
      .time-freq {
        display: flex;
        column-gap: 10px;
        width: stretch;
        span {
          font-size: 15px;
          letter-spacing: -0.5px;
        }
      }
      .prompt-wrapper {
        border-top: 1px solid rgba(128, 128, 128, 0.5);
        width: stretch;
        height: fit-content;
        padding: 5px 0px;
        display: flex;
        text-align: left;
      }
    }
    .actions-wrapper {
      border: 1px solid rgba(128, 128, 128, 0.5);
      border-radius: 10px;
      background: #FAFAFA;
      width: stretch;
      height: stretch;
      display: flex;
      row-gap: 15px;
      padding: 10px 15px;
    }
    .tasks-actions{
      display: flex;
      height: fit-content;
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
      }
    }
  }
} 
@keyframes slideIn {
  0% {
    transform: translateX(-300px);
    opacity: 0;
    transform: scale(0.98);
  }
  100% {
    transform: translateX(0px);
    opacity: 1;
    transform: scale(1);
  }
}

</style>