import { useQuery } from "@tanstack/react-query"
import { fetcher } from "../../../helpers/api"
import type { Photo } from "../models/photo"

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

  return {
    photo: data,
    nextPhotoId: data?.nextPhotoId,
    previousPhotoId: data?.previousPhotoId,
    isLoadingPhoto: isLoading,
  }
}
