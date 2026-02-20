import { useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api, fetcher } from "../../../helpers/api"
import type { Photo } from "../models/photo"
import type { PhotoNewFormSchema } from "../schemas"

interface PhotoDetailsResponse extends Photo {
  nextPhotoId?: string
  previousPhotoId?: string
}

export function usePhoto(id?: string) {
  // buscar os dados da photo, caso o id exista
  const { data, isLoading } = useQuery<PhotoDetailsResponse>({
    queryKey: ["photo", id],
    queryFn: () => fetcher(`/photos/${id}`),
    // o enabled sempre espera um boolean por isso os !!
    // para converter o valor ali contido em boolean
    enabled: !!id,
  })

  const queryClient = useQueryClient()

  async function createPhoto(payload: PhotoNewFormSchema) {
    try {
      const { data: photo } = await api.post<Photo>("/photos", {
        title: payload.title,
      })

      await api.post(
        `/photos/${photo.id}/image`,
        {
          file: payload.file[0],
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )

      if (payload.albumsIds && payload.albumsIds.length > 0) {
        await api.put(`/photos/${photo.id}/albums`, {
          albumsIds: payload.albumsIds,
        })
      }

      queryClient.invalidateQueries({ queryKey: ["photos"] })

      toast.success("Foto criada com sucesso!")
    } catch (error) {
      toast.error(
        "Não foi possível criar a foto. Tente novamente em instantes!"
      )
      throw error
    }
  }

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
    createPhoto,
  }
}
