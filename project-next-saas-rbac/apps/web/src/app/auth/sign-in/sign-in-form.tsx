"use client"

import { AlertTriangle, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { FormEvent, useState, useTransition } from "react"
import { requestFormReset } from "react-dom"
import { toast } from "sonner"

import githubIcon from "@/assets/github-icon.svg"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { signInWithEmailAndPassWord } from "./actions"

export function SignInForm() {
  const [isPending, startTransition] = useTransition()

  const [{ success, message, errors }, setFormState] = useState<{
    success: boolean
    message: string | null
    errors: Record<string, string[]> | null
  }>({
    success: false,
    message: null,
    errors: null,
  })

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = event.currentTarget
    const data = new FormData(form)

    startTransition(async () => {
      const state = await signInWithEmailAndPassWord(data)

      setFormState(state)

      // verificação se a autenticação foi bem-sucedida
      if (state.success) {
        toast.success("Login realizado!", {
          description: "Você foi autenticado com sucesso!",
        })
      } else if (state.message) {
        toast.error("Erro na autenticação!", {
          description: state.message,
        })
      }

      // O requestFormReset exige rodar dentro de uma transição (startTransition).
      // Neste momento como o processo ocorre após uma chamada assíncrona (await),
      // foi envolvido a limpeza do formulário em uma nova transição para evitar
      // avisos no React 19.
      startTransition(() => {
        requestFormReset(form)
      })
    })
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        className="w-full cursor-pointer"
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Sign in with Email"
        )}
      </Button>

      <Button
        className="w-full cursor-pointer"
        variant="link"
        nativeButton={false}
        render={<Link href="/auth/sign-up" />}
        size="sm"
      >
        Create new account
      </Button>

      <Separator />

      <Button variant="outline" className="w-full cursor-pointer">
        <Image
          src={githubIcon}
          alt="Github Icon"
          className="mr-2 size-4 dark:invert"
        />
        Sign in with Github
      </Button>
    </form>
  )
}
