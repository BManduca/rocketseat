import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import SpinnerIcon from '../assets/icons/spinner.svg?react'
import Icon from './icon'
import Text from './text'

export const buttonVariants = cva(
  'group flex cursor-pointer items-center justify-center gap-2 rounded-lg transition',
  {
    variants: {
      variant: {
        primary: 'bg-gray-200 hover:bg-pink-light',
      },
      size: {
        md: 'h-14 px-5 py-4',
      },
      disabled: {
        true: 'pointer-events-none opacity-50',
      },
      handling: {
        true: 'pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      disabled: false,
      handling: false,
    },
  }
)

export const buttonTextVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-gray-400',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

export const buttonIconVariants = cva('transition', {
  variants: {
    variant: {
      primary: 'fill-pink-base',
    },
    size: {
      md: 'h-5 w-5',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

interface ButtonProps
  // 'pegando' todas as propriedades do button e
  // remova o disabled, assim estara usando
  // as props definidas no cva
  extends Omit<React.ComponentProps<'button'>, 'size' | 'disabled'>,
    VariantProps<typeof buttonVariants> {
  icon?: React.ComponentProps<typeof Icon>['svg']
  handling?: boolean
}

export default function Button({
  variant,
  size,
  disabled,
  className,
  children,
  handling,
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        variant,
        size,
        disabled,
        handling,
        className,
      })}
      {...props}
    >
      {icon && (
        <Icon
          animate={handling}
          className={buttonIconVariants({ variant, size })}
          svg={handling ? SpinnerIcon : icon}
        />
      )}
      <Text
        className={buttonTextVariants({ variant })}
        variant={'body-md-bold'}
      >
        {children}
      </Text>
    </button>
  )
}
