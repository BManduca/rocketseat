import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <form action="" className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <Button className="w-full cursor-pointer" type="submit">
        Recover password
      </Button>

      <Button
        className="w-full cursor-pointer"
        variant="link"
        nativeButton={false}
        render={<Link href="/auth/sign-in" />}
        size="sm"
      >
        Sign in instead
      </Button>
    </form>
  )
}
