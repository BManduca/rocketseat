import dayjs from "dayjs"
import { type ChangeEvent, useState } from "react"
import Text from "../components/text"
import useAppointments from "../hooks/use-appointments"
import PeriodItem from "./period-item"
import PeriodList from "./period-list"
import ScheduleHeader from "./schedule-header"

export default function Schedule() {
  const [filteredDate, setFilteredDate] = useState<Date>(
    dayjs().startOf("day").toDate()
  )

  const { morningAppointments, afternoonAppointments, nightAppointments } =
    useAppointments({ filters: { date: filteredDate } })

  function handleFilteredDateChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.value) {
      return
    }

    const date = dayjs(event.target.value).startOf("day").toDate()
    setFilteredDate(date)
  }

  return (
    <div className="w-full py-20">
      <div className="mx-auto flex max-w-170.5 flex-col gap-8">
        <ScheduleHeader
          filteredDate={filteredDate}
          onChangeFilteredDate={handleFilteredDateChange}
        />

        <div className="space-y-3">
          <PeriodList period="morning">
            {morningAppointments.length > 0 ? (
              morningAppointments.map((appointment) => (
                <PeriodItem
                  client={appointment.client}
                  id={appointment.id}
                  key={appointment.id}
                  time={appointment.time}
                />
              ))
            ) : (
              <Text className="text-gray-300" variant={"text-sm"}>
                Nenhum agendamento neste período
              </Text>
            )}
          </PeriodList>

          <PeriodList period="afternoon">
            {afternoonAppointments.length > 0 ? (
              afternoonAppointments.map((appointment) => (
                <PeriodItem
                  client={appointment.client}
                  id={appointment.id}
                  key={appointment.id}
                  time={appointment.time}
                />
              ))
            ) : (
              <Text className="text-gray-300" variant={"text-sm"}>
                Nenhum agendamento neste período
              </Text>
            )}
          </PeriodList>

          <PeriodList period="night">
            {nightAppointments.length > 0 ? (
              nightAppointments.map((appointment) => (
                <PeriodItem
                  client={appointment.client}
                  id={appointment.id}
                  key={appointment.id}
                  time={appointment.time}
                />
              ))
            ) : (
              <Text className="text-gray-300" variant={"text-sm"}>
                Nenhum agendamento neste período
              </Text>
            )}
          </PeriodList>
        </div>
      </div>
    </div>
  )
}
