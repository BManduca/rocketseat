import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'
import Text from './text'

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full',
  {
    variants: {
      variant: {
        primary: 'bg-green-light',
        secondary: 'bg-pink-light',
      },
      size: {
        sm: 'px-2 py-0.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'sm',
    },
  }
)

export const badgeTexteVariants = cva('', {
  variants: {
    variant: {
      primary: 'text-green-dark',
      secondary: 'text-pink-dark',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

interface BadgeProps
  extends React.ComponentProps<'div'>,
    VariantProps<typeof badgeVariants> {}

export default function Badge({
  variant,
  size,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, size, className })} {...props}>
      <Text
        className={badgeTexteVariants({ variant })}
        variant={'body-sm-bold'}
      >
        {children}
      </Text>
    </div>
  )
}
