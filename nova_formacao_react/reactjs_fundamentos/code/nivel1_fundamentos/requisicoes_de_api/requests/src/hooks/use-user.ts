import React from "react"
import { toast } from "sonner"
import { api, fetcher } from "@/helpers/api"
import type { User } from "@/models/user"

export default function useUser() {
  const [user, setUser] = React.useState<User | null>(null)
  const [requestStatus, setRequestStatus] = React.useState<
    "idle" | "loading" | "saving"
  >("idle")

  const getUser = React.useCallback(async (username: string) => {
    try {
      setRequestStatus("loading")

      const data = await fetcher(`/users/${username}`)

      setUser(data)
    } catch (e) {
      console.error(e)
      toast.error("Erro ao buscar usuário")
      setRequestStatus("idle")
      setUser(null)
    } finally {
      setRequestStatus("idle")
    }
  }, [])

  async function createUser(payload: User) {
    try {
      setRequestStatus("saving")

      await api("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      toast.success("Usuário criado com sucesso!")
    } catch (e) {
      console.error(e)
      toast.warning("Erro ao criar usuário!")
    } finally {
      setRequestStatus("idle")
    }
  }

  return {
    user,
    userRequestStatus: requestStatus,
    getUser,
    createUser,
  }
}
