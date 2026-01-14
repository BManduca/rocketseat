import Trash from "../assets/icons/Trash.svg?react"
import ButtonIcon from "../components/button-icon"
import Text from "../components/text"
import useAppointment from "../hooks/use-appointment"

interface Props {
  id: string
  time: string
  client: string
}

export default function PeriodItem({ id, time, client }: Props) {
  const { deleteAppointment } = useAppointment()

  function handleDelete(id: string) {
    deleteAppointment(id)
  }

  return (
    <li className="flex items-center gap-5 py-1">
      <Text variant={"title-md"}>{time}</Text>
      <Text className="w-full" variant={"text-md"}>
        {client}
      </Text>
      <ButtonIcon
        className="shrink-0 fill-yellow-500"
        icon={Trash}
        onClick={() => handleDelete(id)}
      />
    </li>
  )
}
