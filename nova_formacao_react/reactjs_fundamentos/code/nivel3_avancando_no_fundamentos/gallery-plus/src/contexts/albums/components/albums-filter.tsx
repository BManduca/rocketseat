/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */
import cx from "classnames"
import Button from "../../../components/button"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import type { Album } from "../models/album"

interface AlbumsFilterProps extends React.ComponentProps<"div"> {
  albums: Album[]
  loading?: boolean
}

export function AlbumsFilter({
  albums,
  loading,
  className,
  ...props
}: AlbumsFilterProps) {
  return (
    <div
      className={cx("flex items-center gap-3.5 overflow-x-auto", className)}
      {...props}
    >
      <Text variant="heading-small">Álbuns</Text>
      <div className="flex gap-3">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              className="h-7 w-28"
              key={`album-button-loading-${index}`}
            />
          ))
        ) : (
          <>
            <Button className="cursor-pointer" size="sm" variant="primary">
              Todos
            </Button>
            {!loading &&
              albums.map((album) => (
                <Button
                  className="cursor-pointer"
                  key={album.id}
                  size="sm"
                  variant="ghost"
                >
                  {album.title}
                </Button>
              ))}
          </>
        )}
      </div>
    </div>
  )
}
