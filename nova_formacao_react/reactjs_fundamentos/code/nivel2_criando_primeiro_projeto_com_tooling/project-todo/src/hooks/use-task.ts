import React from 'react'
import useLocalStorage from 'use-local-storage'
import { delay } from '../helpers/utils'
import { TASKS_KEY, type Task, TaskState } from '../models/task'

export default function useTask() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])

  const [isUpdatingTask, setIsUpdatingTask] = React.useState(false)
  const [isDeletingTask, setIsDeletingTask] = React.useState(false)

  const RADIX_36 = 36
  const RANDOM_ID_SUBSTRING_START = 2
  const RANDOM_ID_SUBSTRING_END = 9

  const TIMEDELAYUPDATE = 1000

  function prepareTask() {
    setTasks([
      ...tasks,
      {
        id: Math.random()
          .toString(RADIX_36)
          .substring(RANDOM_ID_SUBSTRING_START, RANDOM_ID_SUBSTRING_END),
        title: '',
        state: TaskState.Creating,
      },
    ])
  }

  async function updateTask(id: string, payload: { title: Task['title'] }) {
    setIsUpdatingTask(true)

    await delay(TIMEDELAYUPDATE)

    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, state: TaskState.Created, ...payload }
          : task
      )
    )

    setIsUpdatingTask(false)
  }

  function updateTaskStatus(id: string, concluded: boolean) {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              concluded,
            }
          : task
      )
    )
  }

  async function deleteTask(id: string) {
    setIsDeletingTask(true)

    await delay(TIMEDELAYUPDATE)

    setTasks(tasks.filter((task) => task.id !== id))

    setIsDeletingTask(false)
  }

  return {
    prepareTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  }
}
