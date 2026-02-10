/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import type { Photo } from "../models/photo"
import { PhotoWidget } from "./photo-widget"

interface PhotosListProps {
  photos: Photo[]
  loading?: boolean
}

export function PhotosList({ photos, loading }: PhotosListProps) {
  return (
    <div className="space-y-6">
      <Text
        className="flex items-center justify-end gap-1 text-accent-span"
        variant="paragraph-large"
      >
        Total:{" "}
        {loading ? (
          <Skeleton className="h-6 w-6" />
        ) : (
          <div>{photos.length}</div>
        )}
      </Text>
      {!loading && photos?.length > 0 && (
        <div className="grid grid-cols-5 gap-9">
          {photos.map((photo) => (
            <PhotoWidget key={photo.id} photo={photo} />
          ))}
        </div>
      )}
      {loading && (
        <div className="grid grid-cols-5 gap-9">
          {Array.from({ length: 10 }).map((_, index) => (
            <PhotoWidget
              key={`photo-loading-${index}`}
              loading
              photo={{} as Photo}
            />
          ))}
        </div>
      )}

      {!loading && photos.length === 0 && (
        <div className="itens-center flex h-full justify-center">
          <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
        </div>
      )}
    </div>
  )
}
