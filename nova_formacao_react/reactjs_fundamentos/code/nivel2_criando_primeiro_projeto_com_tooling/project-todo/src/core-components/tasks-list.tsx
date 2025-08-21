import PlusIcon from '../assets/icons/plus_regular.svg?react'
import Button from '../components/button'
import TaskItem from './task-item'

export default function TasksList() {
  return (
    <>
      <section>
        <Button className="w-full" icon={PlusIcon}>
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
