import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { NuqsAdapter } from "nuqs/adapters/react-router/v7"
import { BrowserRouter, Route, Routes } from "react-router"
import { LayoutMain } from "./pages/layout-main"
import { PageComponents } from "./pages/page-components"
import { PageHome } from "./pages/page-home"
import { PagePhotoDetails } from "./pages/page-photo-details"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <BrowserRouter>
          <Routes>
            <Route element={<LayoutMain />}>
              <Route element={<PageHome />} index />
              <Route element={<PageComponents />} path="/componentes" />
              <Route element={<PagePhotoDetails />} path="/fotos/:photoId" />
            </Route>
          </Routes>
        </BrowserRouter>
      </NuqsAdapter>
    </QueryClientProvider>
  )
}
