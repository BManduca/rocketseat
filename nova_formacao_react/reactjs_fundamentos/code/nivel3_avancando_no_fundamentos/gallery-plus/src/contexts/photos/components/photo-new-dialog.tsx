/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */

import { useForm } from "react-hook-form"
import Alert from "../../../components/alert"
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
import { ImagePreview } from "../../../components/image-preview"
import { InputSingleFile } from "../../../components/input-single-file"
import { InputText } from "../../../components/input-text"
import Skeleton from "../../../components/skeleton"
import Text from "../../../components/text"
import type { Album } from "../../albums/models/album"

interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const form = useForm()

  const isLoadingAlbum = false
  const albums: Album[] = [
    { id: "32564", title: "Album 1" },
    { id: "98547", title: "Album 2" },
    { id: "11425", title: "Album 3" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>Adicionar foto</DialogHeader>
        <DialogBody className="flex flex-col gap-5">
          <InputText maxLength={255} placeholder="Adicione um título" />
          <Alert>
            Tamanho máximo: 50MB <br /> Você pode selectionar arquivo em PNG,
            JPF pou JPEG
          </Alert>

          <InputSingleFile
            allowedExtensions={["png", "jpg", "jpeg"]}
            form={form}
            maxSizeFileInMB={50}
            replaceBy={<ImagePreview alt={""} className="h-56 w-full" />}
          />
          <div className="space-y-3">
            <Text variant="label-small">Selecionar álbuns</Text>

            <div className="flex flex-wrap gap-3">
              {!isLoadingAlbum &&
                albums.length > 0 &&
                albums.map((album) => (
                  <Button
                    className="truncate"
                    key={album.id}
                    size="sm"
                    variant="ghost"
                  >
                    {album.title}
                  </Button>
                ))}

              {isLoadingAlbum &&
                Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    className="h-7 w-20"
                    key={`album-loading-${index}`}
                  />
                ))}
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>

          <Button>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
