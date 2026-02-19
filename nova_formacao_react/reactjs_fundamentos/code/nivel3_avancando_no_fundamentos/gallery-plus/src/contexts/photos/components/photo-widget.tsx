/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */
import { Link } from "react-router"
import Badge from "../../../components/badge"
import { buttonTextVariants, buttonVariants } from "../../../components/button"
import { ImagePreview } from "../../../components/image-preview"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import type { Photo } from "../models/photo"

interface PhotoWidgetProps {
  photo: Photo
  loading?: boolean
}
// parei na aula em 5:27
export function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <Skeleton className="h-[10.875rem] w-[10.875rem] rounded-lg" />
      ) : (
        <ImagePreview
          alt={photo.alt}
          imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg"
          src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
          title={photo.title}
        />
      )}

      <div className="flex flex-col gap-2">
        {loading ? (
          <Skeleton className="h-6 w-full" />
        ) : (
          <Text className="truncate" variant="paragraph-large">
            {photo.title}
          </Text>
        )}

        <div className="flex min-h-[1.375rem] gap-1">
          {loading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <Skeleton
                className="h-4 w-full rounded-sm"
                key={`album-loading-${index}`}
              />
            ))
          ) : (
            <>
              {photo.albums.slice(0, 1).map((album) => (
                <Badge className="truncate" key={album.id} size="xs">
                  {album.title}
                </Badge>
              ))}
              {photo.albums.length > 1 && (
                <Badge size="xs">+{photo.albums.length - 1}</Badge>
              )}
            </>
          )}
        </div>
      </div>

      {loading ? (
        <Skeleton className="h-10 w-full" />
      ) : (
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "px-2 py-2",
          })}
          to={`/fotos/${photo.id}`}
        >
          <Text
            className={buttonTextVariants({ variant: "secondary", size: "sm" })}
          >
            Detalhes da imagem
          </Text>
        </Link>
      )}
    </div>
  )
}
