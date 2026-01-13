import Trash from '../assets/icons/Trash.svg?react'
import UserSquare from '../assets/icons/UserSquare.svg?react'
import Button from "../components/button"
import ButtonIcon from "../components/button-icon"
import DatePicker from "../components/date-picker"
import TextInput from "../components/text-input"
import TimeSelect from "../components/time-select"

export function PageComponents() {
  return (
    <main className="flex flex-col gap-8 p-2">
      <DatePicker />
      <Button>Agendar</Button>
      <Button disabled>Agendar</Button>
      <TextInput icon={UserSquare} placeholder="Type your name" />
      <ButtonIcon icon={Trash} />
      <TimeSelect>09:00</TimeSelect>
      <TimeSelect disabled>09:00</TimeSelect>
      <TimeSelect disabled>09:00</TimeSelect>
    </main>
  )
}
