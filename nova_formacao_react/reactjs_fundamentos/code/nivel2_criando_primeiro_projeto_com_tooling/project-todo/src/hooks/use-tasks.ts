import React from 'react'
import useLocalStorage from 'use-local-storage'
import { delay } from '../helpers/utils'
import { TASKS_KEY, type Task, TaskState } from '../models/task'

export default function useTasks() {
  const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, [])
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [isLoadingTasks, setIsLoadingTasks] = React.useState(true) // intuito de já iniciar com aspecto de carregando

  const TIMEDELAYLOADING = 2000

  const fetchTasks = React.useCallback(async () => {
    if (isLoadingTasks) {
      await delay(TIMEDELAYLOADING)
      setIsLoadingTasks(false)
    }

    setTasks(tasksData)
  }, [isLoadingTasks, tasksData])

  React.useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  return {
    tasks,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created)
      .length,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    isLoadingTasks,
  }
}
