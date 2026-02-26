/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */

import React from "react"
import Divider from "../../../components/divider"
import { InputCheckbox } from "../../../components/input-checkbox"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import { usePhotoAlbums } from "../../photos/hooks/use-photo-albums"
import type { Photo } from "../../photos/models/photo"
import type { Album } from "../models/album"

interface AlbumsListSelectableProps {
  loading?: boolean
  albums: Album[]
  photo: Photo
}

export function AlbumsListSelectable({
  albums,
  photo,
  loading,
}: AlbumsListSelectableProps) {
  const { managePhotoOnAlbum } = usePhotoAlbums()
  const [isUpdatingPhoto, setIsUpdatingPhoto] = React.useTransition()

  function isChecked(albumId: string) {
    return photo?.albums?.some((album) => album.id === albumId)
  }

  function handlePhotoAlbums(albumId: string) {
    let albumsIds: string[] = []

    if (isChecked(albumId)) {
      albumsIds = photo.albums
        .filter((album) => album.id !== albumId)
        .map((album) => album.id)
    } else {
      albumsIds = [...photo.albums.map((album) => album.id), albumId]
    }

    setIsUpdatingPhoto(async () => {
      await managePhotoOnAlbum(photo.id, albumsIds)
    })
  }

  return (
    <ul className="flex flex-col gap-4">
      {!loading &&
        photo &&
        albums?.length > 0 &&
        albums.map((album, index) => (
          <li key={album.id}>
            <div className="flex items-center justify-between gap-1">
              <Text className="truncate" variant="paragraph-large">
                {album.title}
              </Text>
              <InputCheckbox
                defaultChecked={isChecked(album.id)}
                disabled={isUpdatingPhoto}
                onChange={() => handlePhotoAlbums(album.id)}
              />
            </div>
            {index !== albums.length - 1 && <Divider className="mt-4" />}
          </li>
        ))}
      {loading &&
        Array.from({ length: 5 }).map((_, index) => (
          <li key={`albums-list-${index}`}>
            <Skeleton className="h-[2.5rem]" />
          </li>
        ))}
    </ul>
  )
}
