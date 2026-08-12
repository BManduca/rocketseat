"use client"

import Image from "next/image"
import Link from "next/link"

import githubIcon from "@/assets/github-icon.svg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

import { signInWithEmailAndPassWord } from "./actions"

export function SignInForm() {
  return (
    <form action={signInWithEmailAndPassWord} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" type="password" id="password" />

        <Link
          href="/auth/forgot-password"
          className="text-foreground text-xs font-medium hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button className="w-full cursor-pointer" type="submit">
        Sign in with e-mail
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
