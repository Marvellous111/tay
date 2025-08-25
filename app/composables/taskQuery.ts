import { useStateStore } from '~/stores/statestore'
import { useTaskStore } from '~/stores/taskstore'
import { ref } from 'vue'

export const useTaskQuery = () => {
  const taskStore = useTaskStore()
  const postTask = async (
    title: string,
    prompt: string,
    username: string,
    weekday: string,
    timeOfDay: string
  ) => {
    try {
      const made_body = {
        title: title,
        prompt: prompt,
        username: username,
        weekday: weekday,
        time: timeOfDay
      }
      const task_response = await $fetch('/api/task', {
        method: 'POST',
        body: made_body,
      })
      if (taskStore.tasks.length > 0) {
        taskStore.removeTasks()
      }
      for (const value in task_response["message"]){
        taskStore.addTask(task_response["message"][value])
      }
      console.log(task_response)
    }catch(error) {
      console.error('An error occured in postTask composable')
      console.error(error)
    }
  }
  const getTask = async(
    username: string
  ) => {
    const new_body= {
      username: username
    }
    try {
      const response = await $fetch(`/api/gettask`, {
        method: 'POST',
        body: new_body
      })
      if (taskStore.tasks.length > 0) {
        taskStore.removeTasks()
      }
      for (const value in response["message"]) {
        taskStore.addTask(response["message"][value])
      }

      console.log(taskStore.tasks)
    } catch(error) {
      console.log(error)
    }
  }
  return { postTask, getTask }
}