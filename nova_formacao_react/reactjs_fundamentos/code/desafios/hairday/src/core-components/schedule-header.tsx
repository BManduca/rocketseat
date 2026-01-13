import type { ComponentProps } from "react"
import DatePicker from "../components/date-picker"
import Text from "../components/text"

interface Props {
  filteredDate: Date
  onChangeFilteredDate: ComponentProps<"input">["onChange"]
}

export default function ScheduleHeader({
  filteredDate,
  onChangeFilteredDate,
}: Props) {
  return (
    <header className="flex justify-between gap-6">
      <div className="flex flex-col gap-1">
        <Text as="h2" className="text-gray-100" variant={"title-lg"}>
          Sua agenda
        </Text>
        <Text className="text-gray-200" variant={"text-sm"}>
          Consulte os seus cortes de cabelo agendados do dia
        </Text>
      </div>

      <DatePicker
        onChange={onChangeFilteredDate}
        value={filteredDate.toISOString().split("T")[0]}
      />
    </header>
  )
}
