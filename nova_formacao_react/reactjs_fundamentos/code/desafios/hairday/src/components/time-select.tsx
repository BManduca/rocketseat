import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { textVariants } from "./text"

export const timeSelectVariants = cva(
  "w-fit rounded-lg border border-gray-500 px-5 py-2 transition-colors hover:bg-gray-500",
  {
    variants: {
      disabled: {
        true: "pointer-events-none border-zinc-600 bg-transparent hover:bg-zinc-500",
        false: "cursor-pointer",
      },
      selected: {
        true: "pointer-events-none border-yellow-600",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
      selected: false,
    },
  }
)

interface TimeSelectProps
  extends React.ComponentProps<"input">,
    Omit<VariantProps<typeof timeSelectVariants>, "disabled"> {
  children?: React.ReactNode
}

export default function TimeSelect({
  children,
  disabled,
  selected,
  ...props
}: TimeSelectProps) {
  const getTextColor = () => {
    if (disabled) {
      return "text-gray-800"
    }
    if (selected) {
      return "text-yellow-500"
    }
    return "text-gray-900"
  }

  return (
    <label
      className={twMerge(
        timeSelectVariants({
          className: textVariants({
            className: getTextColor(),
            variant: "text-md",
          }),
          disabled,
          selected,
        })
      )}
    >
      {children}
      <input className="hidden" disabled={disabled} type="radio" {...props} />
    </label>
  )
}
