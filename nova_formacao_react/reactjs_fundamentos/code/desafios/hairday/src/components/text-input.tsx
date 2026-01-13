import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import Icon from "./icon"
import { textVariants } from "./text"

// eslint-disable-next-line react-refresh/only-export-components
export const textInputVariantsContainer = cva(
  "flex items-center justify-center gap-2 rounded-xl border border-gray-700 p-3 transition-colors has-[:focus]:border-yellow-500"
)

// eslint-disable-next-line react-refresh/only-export-components
export const textInputVariantsIcon = cva("size-5 fill-yellow-500")

// eslint-disable-next-line react-refresh/only-export-components
export const textInputVariants = cva(
  "w-full text-gray-200 outline-none placeholder:text-gray-400"
)

interface TextInputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof textInputVariants> {
  icon: React.ComponentProps<typeof Icon>["svg"]
}

export default function TextInput({
  className,
  icon,
  ...props
}: TextInputProps) {
  return (
    <label className={twMerge(textInputVariantsContainer({ className }))}>
      <Icon className={textInputVariantsIcon()} svg={icon} />
      <input
        className={twMerge(
          textVariants({
            variant: "text-md",
            className: textInputVariants(),
          })
        )}
        type="text"
        {...props}
      />
    </label>
  )
}
