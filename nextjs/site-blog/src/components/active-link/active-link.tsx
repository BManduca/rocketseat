import Link, { type LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import type React from 'react'
import { cn } from '@/lib/utils'

type AcriveLinkProps = {
  children: React.ReactNode
} & LinkProps

export const ActiveLink = ({ children, href, ...rest }: AcriveLinkProps) => {
  const router = useRouter()
  const isCurrentPath = router.asPath === href || router.asPath === rest.as

  return (
    <Link
      href={href}
      className={cn(
        'text-action-sm transition-colors hover:text-blue-200',
        isCurrentPath ? 'text-blue-200' : 'text-gray-100',
      )}
    >
      {children}
    </Link>
  )
}
