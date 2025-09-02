import { Outlet } from "react-router-dom"
import Navbar from "../pages/shared/navbar/NavBar"
import Footer from "../pages/shared/footer/Footer"

const Main = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Main
