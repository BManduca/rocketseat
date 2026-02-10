import { BrowserRouter, Route, Routes } from "react-router"
import { LayoutMain } from "./pages/layout-main"
import { PageComponents } from "./pages/page-components"
import { PageHome } from "./pages/page-home"
import { PagePhotoDetails } from "./pages/page-photo-details"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutMain />}>
          <Route element={<PageHome />} index />
          <Route element={<PageComponents />} path="/componentes" />
          <Route element={<PagePhotoDetails />} path="/fotos/:photoId" />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
