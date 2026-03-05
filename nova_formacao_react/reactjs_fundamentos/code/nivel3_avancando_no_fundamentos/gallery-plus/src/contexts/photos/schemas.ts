import { z } from "zod"

export const photoNewFormSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  file: z.instanceof(FileList).refine((file) => file.length > 0, {
    message: "Campo obrigatório",
  }),
  albumsIds: z.array(z.string().uuid()).optional(),
})

export const photoUpdateFormSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
})

// realizando a tipagem atraves do infer do zod
export type PhotoNewFormSchema = z.infer<typeof photoNewFormSchema>
export type PhotoUpdateFormSchema = z.infer<typeof photoUpdateFormSchema>
