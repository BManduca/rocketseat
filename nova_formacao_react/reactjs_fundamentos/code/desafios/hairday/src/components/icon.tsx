import { cva, type VariantProps } from "class-variance-authority"
import { twMerge } from "tailwind-merge"

export const iconVariants = cva("", {
  variants: {
    animate: {
      true: "animate-spin",
      false: "",
    },
  },
  defaultVariants: {
    animate: false,
  },
})

interface IconProps
  extends React.ComponentProps<"svg">,
    VariantProps<typeof iconVariants> {
  svg: React.FC<React.ComponentProps<"svg">>
}

export default function Icon({
  svg: SvgComponent,
  animate,
  className,
  ...props
}: IconProps) {
  return (
    <SvgComponent
      className={twMerge(iconVariants({ animate, className }))}
      {...props}
    />
  )
}
