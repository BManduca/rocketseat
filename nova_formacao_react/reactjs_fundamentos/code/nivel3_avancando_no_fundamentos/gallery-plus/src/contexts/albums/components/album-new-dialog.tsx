/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm } from "react-hook-form"
import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react"
import Button from "../../../components/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../../../components/dialog"
import { InputText } from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import { PhotoImageSelectable } from "../../photos/components/photo-image-selectable"
import { usePhotos } from "../../photos/hooks/use-photos"
import { useAlbum } from "../hooks/use-album"
import { type AlbumNewFormSchema, albumNewFormSchema } from "../schemas"

interface AlbumNewDialogProps {
  trigger: React.ReactNode
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const form = useForm<AlbumNewFormSchema>({
    // resolvendo os dados do form com base no schema
    resolver: zodResolver(albumNewFormSchema),
  })
  const { photos, isLoadingPhotos } = usePhotos()
  const { createAlbum } = useAlbum()
  const [isCreatingAlbum, setIsCreatingAlbum] = React.useTransition()

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])

  function handleTogglePhoto(selected: boolean, photoId: string) {
    const photosIds = form.getValues("photosIds") || []

    const newValue = selected
      ? [...photosIds, photoId]
      : photosIds.filter((id) => id !== photoId)

    form.setValue("photosIds", newValue)
  }

  function handleSubmit(payload: AlbumNewFormSchema) {
    setIsCreatingAlbum(async () => {
      await createAlbum(payload)
      setModalOpen(false)
    })
  }

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Criar álbum</DialogHeader>

          <DialogBody className="flex flex-col gap-5">
            <InputText
              error={form.formState.errors.title?.message}
              {...form.register("title")}
              placeholder="Adicione um título"
            />

            <div className="space-y-3">
              <Text as="div" className="mb-3" variant="label-small">
                Fotos cadastradas
              </Text>

              {!isLoadingPhotos && photos.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {photos.map((photo) => (
                    <PhotoImageSelectable
                      alt={""}
                      imageClassName="h-20 w-20"
                      key={photo.id}
                      onSelectImage={(selected) =>
                        handleTogglePhoto(selected, photo.id)
                      }
                      src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
                      title={photo.title}
                    />
                  ))}
                </div>
              )}

              {isLoadingPhotos && (
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      className="h-20 w-20 rounded-lg"
                      key={`photo-loading-${index}`}
                    />
                  ))}
                </div>
              )}

              {!isLoadingPhotos && photos.length === 0 && (
                <div className="flex w-full flex-col items-center justify-center gap-3">
                  <SelectCheckboxIllustration />
                  <Text className="text-center" variant="paragraph-medium">
                    Nenhuma foto disponível para seleção
                  </Text>
                </div>
              )}
            </div>
          </DialogBody>

          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isCreatingAlbum} variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={isCreatingAlbum}
              handling={isCreatingAlbum}
              type="submit"
            >
              {isCreatingAlbum ? "Criando..." : "Criar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
