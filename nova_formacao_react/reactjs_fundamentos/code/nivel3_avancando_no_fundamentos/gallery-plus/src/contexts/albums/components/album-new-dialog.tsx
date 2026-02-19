/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */
import type React from "react"
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

interface AlbumNewDialogProps {
  trigger: React.ReactNode
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
  const { photos, isLoadingPhotos } = usePhotos()

  function handleTogglePhoto(selected: boolean, photoId: string) {
    console.log(selected, photoId)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Criar álbum</DialogHeader>

        <DialogBody className="flex flex-col gap-5">
          <InputText placeholder="Adicione um título" />

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
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
