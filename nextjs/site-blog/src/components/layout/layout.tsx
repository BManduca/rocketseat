import { Header } from "../header"

type LayoutProps = {
  children: React.ReactNode}

export const Layout = ({children}: LayoutProps) => {
  return (
    <div className="relative flex mi-h-screen flex-col dark">
      <Header />
      <main className="flex-1 flex flex-col-1 mb-12">{children}</main>
    </div>
  )
}