import PlusIcon from '../assets/icons/plus_regular.svg?react'
import Button from '../components/button'
import useTask from '../hooks/use-task';
import useTasks from '../hooks/use-tasks'
import TaskItem from './task-item'

export default function TasksList() {
  const { tasks } = useTasks();
  const { prepareTask } = useTask();

  console.log(tasks)

  function handleNewTask() {
    prepareTask()
  }

  return (
    <>
      <section>
        <Button className="w-full" icon={PlusIcon} onClick={handleNewTask}>
          Nova tarefa
        </Button>
      </section>

      {/* listagem de tarefas */}
      <section className="space-y-2">
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </section>
    </>
  )
}
