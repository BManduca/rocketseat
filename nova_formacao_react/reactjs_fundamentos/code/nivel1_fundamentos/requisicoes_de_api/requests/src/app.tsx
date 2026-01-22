import { Toaster } from "./components/ui/sonner"
import { ThemeToggle } from "./components/theme-toggle"
import UserInfo from "./components/user-info"
import UserNewForm from "./components/user-new-form"

export function App() {
  return (
    <div className="py-3">
      <ThemeToggle />
      <div className="py-3">
        <UserInfo />
      </div>
      <hr />
      <div>
        <UserNewForm />
      </div>

      <Toaster richColors position="top-right" />
    </div>
  )
}
