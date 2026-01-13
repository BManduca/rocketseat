import { cva, type VariantProps } from "class-variance-authority"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"
import Calendar from "../assets/icons/CalendarBlank.svg?react"
import ChevronDown from "../assets/icons/CaretDown.svg?react"
import Icon from "./icon"
import { textVariants } from "./text"

// eslint-disable-next-line react-refresh/only-export-components
export const datePickerVariantsContainer = cva(
  "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-700 p-3 transition-colors focus-within:border-yellow-500"
)

// eslint-disable-next-line react-refresh/only-export-components
export const datePickerVariantsIcon = cva("size-5 fill-yellow-500")

// eslint-disable-next-line react-refresh/only-export-components
export const datePickerVariantsInput = cva(
  "w-full cursor-pointer outline-none" +
    "[&::-webkit-calendar-picker-indicator]:hidden" +
    "[&::-webkit-calendar-picker-indicator]:opacity-0" +
    "[&::-webkit-calendar-picker-indicator]:pointer-events-none" +
    "[&::-webkit-inner-spin-button]:hidden" +
    "[&::-webkit-outer-spin-button]:hidden"
)

interface DatePickerProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof datePickerVariantsInput> {
  icon?: React.ComponentProps<typeof Icon>["svg"]
}

export default function DatePicker({
  icon = Calendar,
  className,
  ...props
}: DatePickerProps) {
  const dateRef = useRef<HTMLInputElement>(null)

  const openDatePicker = () => {
    if (dateRef.current && typeof dateRef.current.showPicker === "function") {
      dateRef.current.showPicker()
    } else {
      dateRef.current?.focus()
    }
  }

  return (
    <button
      className={twMerge(datePickerVariantsContainer({ className }))}
      onClick={openDatePicker}
      type="button"
    >
      <Icon className={datePickerVariantsIcon()} svg={icon} />

      <input
        className={twMerge(
          datePickerVariantsInput({
            className: textVariants({ className: "text-gray-200" }),
          })
        )}
        min={new Date().toISOString().split("T")[0]}
        ref={dateRef}
        type="date"
        {...props}
      />

      <Icon className="ml-auto size-4 fill-gray-300" svg={ChevronDown} />
    </button>
  )
}
