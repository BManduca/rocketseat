import type { Metadata } from 'next'
import '@/styles/globals.css'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Site Blog',
  description: 'Blog desenvolvido no Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
