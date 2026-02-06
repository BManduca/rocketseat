import { tv, type VariantProps } from "tailwind-variants"
import CheckIcon from "../assets/icons/check.svg?react"
import Icon from "./icon"

export const InputCheckboxWrapperVariants = tv({
  base: `
    inline-flex items-center justify-center relative group
  `,
})

export const inputCheckboxVariants = tv({
  base: `
    appearance-none peer flex items-center justify-center
    cursor-pointer transition overflow-hidden
  `,
  variants: {
    variant: {
      default: `
        border-2 border-solid border-border-primary
        hover:border-border-active checked:border-accent-brand
        checked:bg-accent-brand group-hover:checked:border-accent-brand-light
        group-hover:checked:bg-accent-brand-light
      `,
    },
    size: {
      sm: "h-2 w-3 rounded-sm",
      md: "h-5 w-5 rounded-sm",
    },
    disabled: {
      true: "pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
    disabled: false,
  },
})

export const inputCheckboxIconVariants = tv({
  base: `
    absolute top-1/2 -translate-y-1/2
    hidden peer-checked:block fill-white
    cursor-pointer
  `,
  variants: {
    size: {
      sm: "left-px h-3 w-3",
      md: "left-0.5 h-4 w-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface InputCheckboxProps
  extends VariantProps<typeof inputCheckboxVariants>,
    Omit<React.ComponentProps<"input">, "size" | "disabled"> {}

export function InputCheckbox({
  variant,
  size,
  disabled,
  className,
  ...props
}: InputCheckboxProps) {
  return (
    <label className={InputCheckboxWrapperVariants({ className })}>
      {/* props -> para trabalhar com os dados de maneira correta */}
      <input
        className={inputCheckboxVariants({ variant, size, disabled })}
        type="checkbox"
        {...props}
      />
      <Icon className={inputCheckboxIconVariants({ size })} svg={CheckIcon} />
    </label>
  )
}
