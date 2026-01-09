import Badge from '../components/badge'
import Text from '../components/text'
import useTasks from '../hooks/use-tasks'

export default function TasksSummary() {
  const { createdTasksCount, concludedTasksCount, isLoadingTasks } = useTasks()

  return (
    <>
      <div className="flex items-center gap-2">
        <Text className="!text-gray-300" variant={'body-sm-bold'}>
          Tarefas criadas
        </Text>
        <Badge loading={isLoadingTasks} variant={'secondary'}>
          {createdTasksCount}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <Text className="!text-gray-300" variant={'body-sm-bold'}>
          Concluídas
        </Text>
        <Badge loading={isLoadingTasks} variant={'primary'}>
          {concludedTasksCount} de {createdTasksCount}
        </Badge>
      </div>
    </>
  )
}
