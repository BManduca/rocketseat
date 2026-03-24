import Link, { type LinkProps } from "next/link"
import { useRouter } from "next/router"
import type React from "react"
import { cn } from "@/lib/utils"

type AcriveLinkProps = {
  children: React.ReactNode
} & LinkProps

export const ActiveLink = ({ children, href, ...rest }: AcriveLinkProps) => {
  const router = useRouter()
  const isCurrentPath = router.asPath === href || router.asPath === rest.as || router.asPath.startsWith(String(rest.as))

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-blue-400",
        isCurrentPath ? "text-blue-600" : "text-muted-foreground",
      )}
    >
      {children}
    </Link>
  )
}
