import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeToggle } from "./components/theme-toggle"
import { Toaster } from "./components/ui/sonner"
import UserInfo from "./components/user-info"
import UserNewForm from "./components/user-new-form"
import UsersList from "./components/users-list"

// gerecimento de cash, chaves, requisições, estados....
const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="py-3">
        <ThemeToggle />
        <div className="py-3">
          <UserInfo />
        </div>
        <hr />
        <div className="py-3">
          <UserNewForm />
        </div>
        <hr />
        <div className="py-3">
          <UsersList />
        </div>

        <Toaster position="top-right" richColors />
      </div>
    </QueryClientProvider>
  )
}
