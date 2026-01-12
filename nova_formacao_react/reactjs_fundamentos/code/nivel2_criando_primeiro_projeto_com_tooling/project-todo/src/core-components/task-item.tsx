import { cx } from 'class-variance-authority'
import React from 'react'
import CheckIcon from '../assets/icons/check.svg?react'
import PencilIcon from '../assets/icons/pencil_simple_regular.svg?react'
import TrashIcon from '../assets/icons/trash.svg?react'
import XIcon from '../assets/icons/x_regular.svg?react'
import ButtonIcon from '../components/button-icon'
import Card from '../components/card'
import InputCheckbox from '../components/input-checkbox'
import InputText from '../components/input-text'
import Skeleton from '../components/skeleton'
import Text from '../components/text'
import useTask from '../hooks/use-task'
import { type Task, TaskState } from '../models/task'

type TaskItemProps = {
  task: Task
  loading?: boolean
}

export default function TaskItem({ task, loading }: TaskItemProps) {
  const [isEditing, setIsEditing] = React.useState(
    task?.state === TaskState.Creating
  )

  const [taskTitle, setTaskTitle] = React.useState(task.title || '')
  const {
    updateTask,
    updateTaskStatus,
    deleteTask,
    isUpdatingTask,
    isDeletingTask,
  } = useTask()

  function handleEditTask() {
    setIsEditing(true)
  }

  function handleExitEditTask() {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id)
    }

    setIsEditing(false)
  }

  function handleChangeTaskTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value || '')
  }

  async function handleSaveTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await updateTask(task.id, { title: taskTitle })
    setIsEditing(false)
  }

  function handleChangeTaskStatus(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked

    updateTaskStatus(task.id, checked)
  }

  async function handleDeleteTask() {
    await deleteTask(task.id)
  }

  return (
    <Card size={'md'}>
      {isEditing ? (
        <form className="flex items-center gap-4" onSubmit={handleSaveTask}>
          <InputText
            autoFocus
            className="flex-1"
            onChange={handleChangeTaskTitle}
            required
            value={taskTitle}
          />
          <div className="flex gap-1">
            <ButtonIcon
              icon={XIcon}
              onClick={handleExitEditTask}
              type="button"
              variant={'secondary'}
            />
            <ButtonIcon
              handling={isUpdatingTask}
              icon={CheckIcon}
              type="submit"
              variant={'primary'}
            />
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task?.concluded}
            loading={loading}
            onChange={handleChangeTaskStatus}
          />
          {loading ? (
            <Skeleton className="h-6 flex-1" />
          ) : (
            <Text
              className={cx('flex-1', {
                'line-through': task?.concluded,
              })}
            >
              {task?.title}
            </Text>
          )}
          <div className="flex gap-1">
            <ButtonIcon
              handling={isDeletingTask}
              icon={TrashIcon}
              loading={loading}
              onClick={handleDeleteTask}
              type="button"
              variant={'tertiary'}
            />{' '}
            <ButtonIcon
              icon={PencilIcon}
              loading={loading}
              onClick={handleEditTask}
              type="button"
              variant={'tertiary'}
            />
          </div>
        </div>
      )}
    </Card>
  )
}
