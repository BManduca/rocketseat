import { tv } from "tailwind-variants"

export const imageFilePreviewVariants = tv({
  base: `
        rounded-lg overflow-hidden
    `,
})

export const imagePreviewImageVariants = tv({
  base: `
        w-full h-full object-cover
    `,
})

interface ImagePreviewProps extends React.ComponentProps<"img"> {
  imageClassName?: string
  alt: string
}

export function ImagePreview({
  className,
  imageClassName,
  alt,
  ...props
}: ImagePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      {/** biome-ignore lint/correctness/useImageSize: it's not necessary, because passed on as property  */}
      <img
        alt={alt}
        className={imagePreviewImageVariants({ className: imageClassName })}
        {...props}
      />
    </div>
  )
}
