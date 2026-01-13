import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { twMerge } from "tailwind-merge"

// eslint-disable-next-line react-refresh/only-export-components
export const textVariants = cva("font-sans text-gray-200", {
  variants: {
    variant: {
      "title-lg": "font-bold font-sans text-2xl/8",
      "title-md": "font-bold font-sans text-base/6",
      "title-sm": "font-bold font-sans text-sm/5",
      "text-md": "font-normal font-sans text-base/6",
      "text-sm": "font-normal font-sans text-sm/5",
    },
  },
  defaultVariants: {
    variant: "text-md",
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
}

export default function Text({
  as = "span",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: twMerge(textVariants({ variant, className })),
      ...props,
    },
    children
  )
}
