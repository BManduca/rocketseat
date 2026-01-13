import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import Text from "./text"

// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = cva(
  `
    flex items-center justify-center cursor-pointer w-full select-none
    transition-colors py-4.5 px-6 bg-yellow-600 border-3 border-transparent 
    rounded-lg hover:border-yellow-400
  `,
  {
    variants: {
      disabled: {
        true: "pointer-events-none opacity-30",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
)

interface ButtonProps
  extends React.ComponentProps<"button">,
    Omit<VariantProps<typeof buttonVariants>, "disabled"> {}

export default function Button({
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        buttonVariants({
          className,
          disabled,
        })
      )}
      type="button"
      {...props}
    >
      <Text className="text-gray-900 uppercase" variant={"title-sm"}>
        {children}
      </Text>
    </button>
  )
}
