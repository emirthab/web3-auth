import Header from "./Header"
import Navbar from "./Navbar"
import style from "../../styles/layout.css"

import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="main-container">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout