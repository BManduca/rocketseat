import dayjs from "dayjs"
import { useState } from "react"
import UserSquare from "../assets/icons/UserSquare.svg?react"
import Button from "../components/button"
import DatePicker from "../components/date-picker"
import Text from "../components/text"
import TextInput from "../components/text-input"
import TimeSelect from "../components/time-select"
import useAppointment from "../hooks/use-appointment"
import useAppointments from "../hooks/use-appointments"

const morningTimeSlots = ["09:00", "10:00", "11:00", "12:00"]
const afternoonTimeSlots = [
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
]
const nightTimeSlots = ["19:00", "20:00", "21:00"]

export default function Sidebar() {
  const [client, setClient] = useState<string>("")
  const [time, setTime] = useState<string>("")
  const [date, setDate] = useState<string>("")

  const { createAppointment } = useAppointment()
  const { usedTimeSlots } = useAppointments({
    filters: { date: date ? dayjs(date).toDate() : new Date() },
  })

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const datetime = dayjs(`${date} ${time}`).toISOString()

    createAppointment({ client, datetime })

    setClient("")
    setTime("")
    setDate("")
  }

  return (
    <aside className="flex w-full max-w-124.5 flex-col gap-6 rounded-xl bg-neutral-500 p-20">
      <div className="w-full space-y-1">
        <Text as="h2" className="text-gray-100" variant="title-lg">
          Agende um atendimento
        </Text>

        <Text className="text-gray-300" variant="text-sm">
          Selecione data, horário e informe o nome do cliente para criar o
          agendamento
        </Text>
      </div>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <label className="flex w-full flex-col gap-2">
          <Text className="text-gray-200" variant="title-md">
            Data
          </Text>

          <DatePicker onChange={(e) => setDate(e.target.value)} value={date} />
        </label>

        <div className="flex flex-col gap-2">
          <Text className="text-gray-200" variant="title-md">
            Horários
          </Text>

          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <Text className="text-gray-200" variant="text-md">
                Manhã
              </Text>

              <div className="flex flex-wrap items-center gap-2">
                {morningTimeSlots.map((morningTime) => (
                  <TimeSelect
                    disabled={usedTimeSlots.includes(morningTime) || !date}
                    key={morningTime}
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                    selected={time === morningTime}
                    value={morningTime}
                  >
                    {morningTime}
                  </TimeSelect>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Text className="text-gray-200" variant="text-md">
                Tarde
              </Text>

              <div className="flex flex-wrap items-center gap-2">
                {afternoonTimeSlots.map((afternoonTime) => (
                  <TimeSelect
                    disabled={usedTimeSlots.includes(afternoonTime) || !date}
                    key={afternoonTime}
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                    selected={time === afternoonTime}
                    value={afternoonTime}
                  >
                    {afternoonTime}
                  </TimeSelect>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Text className="text-gray-200" variant="text-md">
                Noite
              </Text>

              <div className="flex flex-wrap items-center gap-2">
                {nightTimeSlots.map((nightTime) => (
                  <TimeSelect
                    disabled={usedTimeSlots.includes(nightTime) || !date}
                    key={nightTime}
                    name="time"
                    onChange={(e) => setTime(e.target.value)}
                    selected={time === nightTime}
                    value={nightTime}
                  >
                    {nightTime}
                  </TimeSelect>
                ))}
              </div>
            </div>
          </div>
        </div>

        <label className="flex w-full flex-col gap-2">
          <Text className="text-gray-200" variant="title-md">
            Cliente
          </Text>

          <TextInput
            icon={UserSquare}
            name="client"
            onChange={(e) => setClient(e.target.value)}
            placeholder="Helena Souza"
            value={client}
          />
        </label>

        <Button disabled={!(date && time && client)} type="submit">
          Agendar
        </Button>
      </form>
    </aside>
  )
}
