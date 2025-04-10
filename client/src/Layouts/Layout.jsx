import React from "react"
import { Outlet } from "react-router-dom"
// import Footer from "../Components/Footer.jsx"


const Layout = () => {
  return (
    <div >
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout
