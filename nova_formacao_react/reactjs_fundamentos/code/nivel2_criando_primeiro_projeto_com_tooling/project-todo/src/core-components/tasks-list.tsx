import PlusIcon from '../assets/icons/plus_regular.svg?react'
import Button from '../components/button'
import useTask from '../hooks/use-task'
import useTasks from '../hooks/use-tasks'
import { type Task, TaskState } from '../models/task'
import TaskItem from './task-item'

export default function TasksList() {
  const { tasks, isLoadingTasks } = useTasks()
  const { prepareTask } = useTask()

  function handleNewTask() {
    prepareTask()
  }

  return (
    <>
      <section>
        <Button
          className="w-full"
          disabled={
            tasks.some((task) => task.state === TaskState.Creating) ||
            isLoadingTasks
          }
          icon={PlusIcon}
          onClick={handleNewTask}
        >
          Nova tarefa
        </Button>
      </section>

      {/* listagem de tarefas */}
      <section className="space-y-2">
        {!isLoadingTasks &&
          tasks.map((task) => <TaskItem key={task.id} task={task} />)}
        {isLoadingTasks && (
          <>
            <TaskItem loading task={{} as Task} />
            <TaskItem loading task={{} as Task} />
            <TaskItem loading task={{} as Task} />
          </>
        )}
      </section>
    </>
  )
}
