import React from "react"
import { tv } from "tailwind-variants"
import { ImagePreview } from "../../../components/image-preview"
import { InputCheckbox } from "../../../components/input-checkbox"

export const PhotoImageSelectableVariants = tv({
  base: "relative cursor-pointer rounded-lg",
  variants: {
    select: {
      true: "outline-2 outline-accent-brand",
    },
  },
})

interface PhotoImageSelectableProps
  extends React.ComponentProps<typeof ImagePreview> {
  selected?: boolean
  onSelectImage?: (selected: boolean) => void
}

export function PhotoImageSelectable({
  className,
  selected,
  onSelectImage,
  ...props
}: PhotoImageSelectableProps) {
  const [isSelected, setIsSelected] = React.useState(selected)

  function handleSelect() {
    const newValue = !isSelected

    setIsSelected(newValue)
    onSelectImage?.(newValue)
  }

  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: o InputCheckbox está aninhado dentro da label, portanto a associação é implícita e não requer htmlFor
    <label
      className={PhotoImageSelectableVariants({
        className,
        select: isSelected,
      })}
    >
      <InputCheckbox
        checked={isSelected}
        className="absolute top-1 left-1"
        onChange={handleSelect}
        size="sm"
      />
      <ImagePreview {...props} />
    </label>
  )
}
