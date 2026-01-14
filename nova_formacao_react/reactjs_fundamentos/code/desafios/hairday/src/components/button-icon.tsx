import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import Icon from "./icon"

// eslint-disable-next-line react-refresh/only-export-components
export const buttonIconVariants = cva(
  "group inline-flex size-4 cursor-pointer items-center justify-center"
)

interface ButtonIconProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonIconVariants> {
  icon: React.ComponentProps<typeof Icon>["svg"]
}

// eslint-disable-next-line react-refresh/only-export-components
export const buttonIconIconVariants = cva(
  "size-full fill-yellow-500 transition-colors group-hover:fill-yellow-700"
)

export default function ButtonIcon({
  className,
  icon,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className={twMerge(
        buttonIconVariants({
          className,
        })
      )}
      type="button"
      {...props}
    >
      <Icon className={buttonIconIconVariants()} svg={icon} />
    </button>
  )
}
