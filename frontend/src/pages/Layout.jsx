import { Outlet } from "react-router-dom";
import {Navbar,Footer} from "../components";


import React from 'react'

export const Layout = () => {
  return (
    <>
       <Navbar/>
       
      <Outlet/>
      
    </>
  )
}
