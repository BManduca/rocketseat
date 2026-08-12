import Image from "next/image"
import Link from "next/link"

import githubIcon from "@/assets/github-icon.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignUpPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input name="name" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirm your password</Label>
        <Input
          name="password_confirmation"
          type="password"
          id="password_confirmation"
        />
      </div>

      <Button className="w-full cursor-pointer" type="submit">
        Create account
      </Button>

      {/*
         iriamos utilizar asChild aqui, mas na atualização mais recente do Button no shadcn,
        foi introduzido o parametro render, que possibilita fazer isso de maneira mais limpa e acessivel
      */}
      <Button
        className="w-full cursor-pointer"
        variant="link"
        nativeButton={false}
        render={<Link href="/auth/sign-in" />}
        size="sm"
      >
        Already registered? Sign in
      </Button>

      <Separator />

      <Button variant="outline" className="w-full cursor-pointer">
        <Image
          src={githubIcon}
          alt="Github Icon"
          className="mr-2 size-4 dark:invert"
        />
        Sign up with Github
      </Button>
    </form>
  )
}
