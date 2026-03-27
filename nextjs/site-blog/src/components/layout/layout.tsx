import { Inter, PT_Sans_Caption } from 'next/font/google'
import { Footer } from './footer'
import { Header } from './header'

type LayoutProps = {
  children: React.ReactNode
}

const inter = Inter({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-inter' })
const ptSansCaptions = PT_Sans_Caption({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-sans',
})

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div
      className={`${inter.className} ${ptSansCaptions.className} relative flex min-h-screen flex-col bg-gray-700 font-inter`}
    >
      <Header />
      <main className="flex-1 flex flex-col mb-12 mt-10">{children}</main>
      <Footer />
    </div>
  )
}
