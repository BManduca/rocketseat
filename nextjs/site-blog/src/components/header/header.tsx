import Link from "next/link"
import { useRouter } from "next/router"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"

export const Header = () => {
  const router = useRouter()
  const isHomePage = router.pathname === "/"
  const isBlogPage = router.pathname.startsWith("/blog")

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">Logo</Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className={cn(
                "text-sm fonst-medium transition-colors hover:text-blue-400",
                isHomePage ? "text-blue-600" : "text-muted-foreground",
              )}
            >
              Início
            </Link>
            <Link
              href="/blog"
              className={cn(
                "text-sm fonst-medium transition-colors hover:text-blue-400",
                isBlogPage ? "text-blue-600" : "text-muted-foreground",
              )}
            >
              Blog
            </Link>
            <Button className="bg-white" size="lg">
              Começar
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}
