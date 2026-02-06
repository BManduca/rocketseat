import { tv } from "tailwind-variants"

export const imageFilePreviewVariants = tv({
  base: `
        rounded-lg overflow-hidden
    `,
})

export const imageFilePreviewImageVariants = tv({
  base: `
        w-full h-full object-cover
    `,
})

interface ImageFilePreviewProps extends React.ComponentProps<"img"> {
  imageClassName?: string
  alt: string
}

export function ImageFilePreview({
  className,
  imageClassName,
  alt,
  ...props
}: ImageFilePreviewProps) {
  return (
    <div className={imageFilePreviewVariants({ className })}>
      {/** biome-ignore lint/correctness/useImageSize: it's not necessary, because passed on as property  */}
      <img
        alt={alt}
        className={imageFilePreviewImageVariants({ className: imageClassName })}
        {...props}
      />
    </div>
  )
}
