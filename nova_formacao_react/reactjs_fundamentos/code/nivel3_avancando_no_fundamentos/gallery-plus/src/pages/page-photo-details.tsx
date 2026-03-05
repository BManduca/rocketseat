import { Pencil } from "lucide-react"
import React from "react"
import { useParams } from "react-router"
import Button from "../components/button"
import ButtonIcon from "../components/button-icon"
import Container from "../components/container"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../components/dialog"
import { ImagePreview } from "../components/image-preview"
import { InputText } from "../components/input-text"
import Skeleton from "../components/skeleton"
import Text from "../components/text"
import { AlbumsListSelectable } from "../contexts/albums/components/albums-list-selectable"
import { useAlbums } from "../contexts/albums/hooks/use-albums"
import { PhotosNavigator } from "../contexts/photos/components/photos-navigator"
import { usePhoto } from "../contexts/photos/hooks/use-photo"
import type { Photo } from "../contexts/photos/models/photo"

export function PagePhotoDetails() {
  const { photoId } = useParams()
  const {
    photo,
    previousPhotoId,
    nextPhotoId,
    isLoadingPhoto,
    deletePhoto,
    updatePhoto,
  } = usePhoto(photoId)
  const { albums, isLoadingAlbums } = useAlbums()
  const [isDeletingPhoto, setIsDeletingPhoto] = React.useTransition()
  const [isUpdatingPhoto, setIsUpdatingPhoto] = React.useTransition()

  const [isEditingTitle, setIsEditingTitle] = React.useState(false)
  const [titleValue, setTitleValue] = React.useState("")

  // Sincroniza o valor inicial do input com o título da foto quando ela carrega
  React.useEffect(() => {
    if (photo) {
      setTitleValue(photo.title)
    }
  }, [photo])

  function handleUpdateTitle() {
    if (isUpdatingPhoto || !isEditingTitle) {
      return
    }

    if (!photo || titleValue.trim() === "" || titleValue === photo.title) {
      setIsEditingTitle(false)
      setTitleValue(photo?.title || "")
      return
    }

    setIsUpdatingPhoto(async () => {
      await updatePhoto(photo.id, { title: titleValue })
      setIsEditingTitle(false)
    })
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      // ao dar o enter, apenas será removido o foco. O onBlur cuidará da ação de salvar a alteração
      event.currentTarget.blur()
    } else if (event.key === "Escape") {
      setIsEditingTitle(false)
      setTitleValue(photo?.title || "")
    }
  }

  // essa função so será acessada se a foto existir
  function handleDeletePhoto() {
    setIsDeletingPhoto(async () => {
      // biome-ignore lint/style/noNonNullAssertion: nesta parte é certeza que existirá uma foto
      await deletePhoto(photo!.id)
    })
  }

  if (!(isLoadingPhoto || photo)) {
    return <div>Foto não encontrada</div>
  }

  const renderTitle = () => {
    if (isLoadingPhoto) {
      return <Skeleton className="h-8 w-48" />
    }

    if (isEditingTitle) {
      return (
        <div className="max-w-md flex-1">
          <InputText
            autoFocus
            disabled={isUpdatingPhoto}
            onBlur={handleUpdateTitle}
            onChange={(e) => setTitleValue(e.target.value)}
            onKeyDown={handleKeyDown}
            value={titleValue}
          />
        </div>
      )
    }

    return (
      <div className="group flex items-center gap-2">
        <Text as="h2" variant="heading-large">
          {photo?.title}
        </Text>
        <ButtonIcon
          icon={Pencil}
          onClick={() => setIsEditingTitle(true)}
          size="sm"
          variant="ghost"
        />
      </div>
    )
  }

  return (
    <Container>
      <header className="mb-8 flex items-center justify-between gap-8">
        {renderTitle()}

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
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={isDeletingPhoto} variant="destructive">
                  {isDeletingPhoto ? "Excluindo..." : "Excluir"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>Confirmar exclusão</DialogHeader>
                <DialogBody>
                  <Text as="p">
                    Tem certeza que deseja excluir a foto{" "}
                    <strong>{photo?.title}</strong>?
                  </Text>
                  <Text as="p">
                    <strong>Esta ação não poderá ser desfeita.</strong>
                  </Text>
                </DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancelar</Button>
                  </DialogClose>
                  <Button
                    disabled={isDeletingPhoto}
                    onClick={handleDeletePhoto}
                    variant="destructive"
                  >
                    {isDeletingPhoto ? "Excluindo..." : "Confirmar exclusão"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
