import React from "react"
import useUser from "@/hooks/use-user"
import type { User } from "@/models/user"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function UserNewForm() {
  const formRef = React.useRef<HTMLFormElement>(null)

  const { createUser, userRequestStatus } = useUser()

  async function handleSubmit(e: React.FormEvent) {
    if (!formRef.current) {
      return
    }

    e.preventDefault()

    const data = new FormData(formRef.current)

    const payload = {
      id: data.get("id"),
      name: data.get("name"),
    }

    await createUser(payload as User)

    formRef.current?.reset()
  }

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <div className="ml-2 py-2">
        <Input className="w-24" name="id" placeholder="Username" required />
        {/* <input name="id" placeholder="Username" required /> */}
      </div>
      <div className="ml-2 py-2">
        <Input className="w-72" name="name" placeholder="Nome" required />
        {/* <input name="name" placeholder="Nome" required /> */}
      </div>
      <div className="ml-2">
        <Button
          className="bg-green-600 hover:bg-green-500 dark:bg-green-500 dark:hover:bg-green-400"
          type="submit"
          variant="default"
        >
          {userRequestStatus === "saving"
            ? "Criando usuário..."
            : "Criar usuário"}
        </Button>
      </div>
    </form>
  )
}
