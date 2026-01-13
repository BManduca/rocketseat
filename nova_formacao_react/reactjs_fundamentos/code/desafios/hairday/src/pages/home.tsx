import Logo from "../core-components/logo"
import Schedule from "../core-components/schedule"
import Sidebar from "../core-components/sidebar"

export function Home() {
  return (
    <main className="relative mx-auto flex max-w-360 flex-col gap-3 p-3 md:flex-row">
      <Logo className="absolute top-3 left-3" />
      <Sidebar />
      <Schedule />
    </main>
  )
}
