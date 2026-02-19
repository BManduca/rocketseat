/** biome-ignore-all lint/suspicious/noArrayIndexKey: index necessário para controle e detalhe visual skeleton */

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
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
import { useAlbums } from "../../albums/hooks/use-albums"
import { type PhotoNewFormSchema, photoNewFormSchema } from "../schemas"

interface PhotoNewDialogProps {
  trigger: React.ReactNode
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
  const [modalOpen, setModalOpen] = React.useState(false)
  const form = useForm<PhotoNewFormSchema>({
    // resolvendo o form com base no schema que será passado
    resolver: zodResolver(photoNewFormSchema),
  })
  const { albums, isLoadingAlbums } = useAlbums()

  const file = form.watch("file")
  const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined

  React.useEffect(() => {
    if (!modalOpen) {
      form.reset()
    }
  }, [modalOpen, form])

  function handleSubmit(payload: PhotoNewFormSchema) {
    console.log(payload)
  }

  return (
    <Dialog onOpenChange={setModalOpen} open={modalOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>Adicionar foto</DialogHeader>
          <DialogBody className="flex flex-col gap-5">
            <InputText
              error={form.formState.errors.title?.message}
              maxLength={255}
              placeholder="Adicione um título"
              {...form.register("title")}
            />
            <Alert>
              Tamanho máximo: 50MB <br /> Você pode selectionar arquivo em PNG,
              JPF pou JPEG
            </Alert>

            <InputSingleFile
              allowedExtensions={["png", "jpg", "jpeg"]}
              error={form.formState.errors.file?.message}
              form={form}
              maxSizeFileInMB={50}
              replaceBy={
                <ImagePreview
                  alt={""}
                  className="h-56 w-full"
                  src={fileSource}
                />
              }
              {...form.register("file")}
            />
            <div className="space-y-3">
              <Text variant="label-small">Selecionar álbuns</Text>

              <div className="flex flex-wrap gap-3">
                {!isLoadingAlbums &&
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

                {isLoadingAlbums &&
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

            <Button type="submit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
