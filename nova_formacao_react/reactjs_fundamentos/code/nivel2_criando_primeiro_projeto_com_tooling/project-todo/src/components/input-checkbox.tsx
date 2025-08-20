import { cva, type VariantProps } from 'class-variance-authority'

import CheckIcon from '../assets/icons/check.svg?react'
import Icon from './icon'
import Skeleton from './skeleton'

export const inputCheckboxWrapperVariants = cva(`
    inline-flex items-center justify-center relative group
  `)

export const inputCheckboxVariants = cva(
  `
  appearance-none peer flex items-center justify-center cursor-pointer
   transition overflow-hidden border-green-base
  `,
  {
    variants: {
      variant: {
        none: '',
        default: `
          border-2 border-solid
          hover:border-green-dark hover:bg-green-dark/20
          checked:border-green-base checked:bg-green-base
          group-hover:checked:border-green-dark group-hover:checked:bg-green-dark
        `,
      },
      size: {
        md: 'h-5 w-5 rounded-sm',
      },
      disabled: {
        true: 'pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      disabled: false,
    },
  }
)

export const inputCheckboxIconVariants = cva(
  `
    absolute top-1/2 left-1 -translate-y-1/2
    hidden peer-checked:block fill-white
  `,
  {
    variants: {
      size: {
        md: 'h-3 w-3',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

interface InputCheckboxProps
  extends VariantProps<typeof inputCheckboxVariants>,
    Omit<React.ComponentProps<'input'>, 'size' | 'disabled'> {
  loading?: boolean
}

export default function InputCheckbox({
  variant,
  size,
  disabled,
  className,
  loading,
  ...props
}: InputCheckboxProps) {
  if (loading) {
    return (
      <Skeleton
        className={inputCheckboxVariants({ variant: 'none', size })}
        rounded={'sm'}
      />
    )
  }

  return (
    <label className={inputCheckboxWrapperVariants({ className })}>
      <input
        className={inputCheckboxVariants({ variant, size, disabled })}
        type="checkbox"
        {...props}
      />
      <Icon className={inputCheckboxIconVariants({ size })} svg={CheckIcon} />
    </label>
  )
}
