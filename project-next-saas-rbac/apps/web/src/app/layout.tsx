import "./globals.css"

import type { Metadata } from "next"
import { Geist } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Create Next App",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="dark">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
