import { Outlet } from 'react-router'
import Footer from '../core-components/footer'
import Header from '../core-components/header'
import MainContent from '../core-components/main_content'

export default function LayoutMain() {
  return (
    <>
      <Header />

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer />
    </>
  )
}
