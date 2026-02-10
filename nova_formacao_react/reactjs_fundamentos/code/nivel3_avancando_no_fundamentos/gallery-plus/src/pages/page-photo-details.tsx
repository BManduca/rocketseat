import Button from "../components/button"
import Container from "../components/container"
import { ImagePreview } from "../components/image-preview"
import Skeleton from "../components/skeleton"
import Text from "../components/text"
import { PhotosNavigator } from "../contexts/photos/components/photos-navigator"
import type { Photo } from "../contexts/photos/models/photo"

export function PagePhotoDetails() {
  const isLoadingPhoto = false
  const photo = {
    id: "12452",
    title: "Teste",
    imageId: "portrait-tower.png",
    alt: "Teste de photo",
    albums: [
      { id: "32564", title: "Album 1" },
      { id: "98547", title: "Album 2" },
      { id: "11425", title: "Album 3" },
    ],
  } as Photo

  return (
    <Container>
      <header className="mb-8 flex items-center justify-between gap-8">
        {isLoadingPhoto ? (
          <Skeleton className="h-8 w-48" />
        ) : (
          <Text variant="heading-large">{photo?.title}</Text>
        )}

        <PhotosNavigator />
      </header>
      <div className="grid grid-cols-[21rem] gap-24">
        <div className="space-y-3">
          {isLoadingPhoto ? (
            <Skeleton className="h-[21rem]" />
          ) : (
            <ImagePreview
              alt={photo?.alt}
              imageClassName="h-[21rem]"
              src={`/images/${photo.imageId}`}
              title={photo.title}
            />
          )}
          {isLoadingPhoto ? (
            <Skeleton className="h-10 w-20" />
          ) : (
            <Button variant="destructive">Excluir</Button>
          )}
        </div>
      </div>
    </Container>
  )
}
