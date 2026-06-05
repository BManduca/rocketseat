'use client'
import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { cn } from '@/lib/utils'

type AcriveLinkProps = {
  children: React.ReactNode
} & LinkProps

export const ActiveLink = ({ children, href, ...rest }: AcriveLinkProps) => {
  const linkPath = (typeof href === 'string' ? href : href.pathname) ?? ''
  const pathname = usePathname()
  const isActive = pathname === linkPath || pathname?.startsWith(`${linkPath}/`)

  return (
    <Link
      {...rest}
      href={href}
      className={cn(
        'text-action-sm transition-colors hover:text-blue-200',
        isActive ? 'text-blue-200' : 'text-gray-100',
      )}
    >
      {children}
    </Link>
  )
}
