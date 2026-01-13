import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/home"
import { PageComponents } from "./pages/page-components"

export function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      {/* <div className="absolute top-2 right-6 z-50">
        <ModeToggle />
      </div> */}
      <Routes>
        <Route element={<Home />} index />
        <Route element={<PageComponents />} path="/components" />
      </Routes>
    </BrowserRouter>
  )
}
