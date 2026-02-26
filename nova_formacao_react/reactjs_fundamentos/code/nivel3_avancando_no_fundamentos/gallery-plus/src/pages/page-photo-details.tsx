import React from "react"
import { useParams } from "react-router"
import Button from "../components/button"
import Container from "../components/container"
import { ImagePreview } from "../components/image-preview"
import Skeleton from "../components/skeleton"
import Text from "../components/text"
import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable"
import { useAlbums } from "../contexts/albums/hooks/use-albums"
import { PhotosNavigator } from "../contexts/photos/components/photos-navigator"
import { usePhoto } from "../contexts/photos/hooks/use-photo"
import type { Photo } from "../contexts/photos/models/photo"

export function PagePhotoDetails() {
  const { photoId } = useParams()
  const { photo, previousPhotoId, nextPhotoId, isLoadingPhoto, deletePhoto } =
    usePhoto(photoId)
  const { albums, isLoadingAlbums } = useAlbums()
  const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition()

  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      // biome-ignore lint/style/noNonNullAssertion: nesta parte é certeza que existirá uma foto
      await deletePhoto(photo!.id)
    })
  }

  if (!(isLoadingPhoto || photo)) {
    return <div>Foto não encontrada</div>
  }

  return (
    <Container>
      <header className="mb-8 flex items-center justify-between gap-8">
        {isLoadingPhoto ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <Text as="h2" variant="heading-large">
            {photo?.title}
          </Text>
        )}

        <PhotosNavigator
          loading={isLoadingPhoto}
          nextPhotoId={nextPhotoId}
          previousPhotoId={previousPhotoId}
        />
      </header>
      <div className="grid grid-cols-[21rem_1fr] gap-24">
        <div className="space-y-3">
          {isLoadingPhoto ? (
            <Skeleton className="h-[21rem]" />
          ) : (
            <ImagePreview
              alt={(photo as Photo)?.alt}
              imageClassName="h-[21rem]"
              src={`${import.meta.env.VITE_IMAGES_URL}/${photo?.imageId}`}
              title={photo?.title}
            />
          )}
          {isLoadingPhoto ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <Button
              disabled={isDeletingPhoto}
              onClick={handleDeletePhoto}
              variant="destructive"
            >
              {isDeletingPhoto ? "Excluindo..." : "Excluir"}
            </Button>
          )}
        </div>

        <div className="py-3">
          <Text as="h3" className="mb-6" variant="heading-medium">
            Álbuns
          </Text>

          <AlbumsListSelectable
            albums={albums}
            loading={isLoadingAlbums}
            photo={photo as Photo}
          />
        </div>
      </div>
    </Container>
  )
}
