import { cva, type VariantProps } from 'class-variance-authority'
import type React from 'react'

export const iconVariants = cva('', {
  variants: {
    animate: {
      false: '',
      true: 'animate-spin',
    },
  },
  defaultVariants: {
    animate: false,
  },
})

// 'pegando' as propriedades do SVG e colocando dentro da interface
interface IconProps
  extends React.ComponentProps<'svg'>,
    VariantProps<typeof iconVariants> {
  // componente funcional que vai retornar um SVG
  svg: React.FC<React.ComponentProps<'svg'>>
}

export default function Icon({
  svg: SvgComponent,
  animate,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent className={iconVariants({ animate, className })} {...props} />
  )
}
