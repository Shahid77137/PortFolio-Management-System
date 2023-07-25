import React from 'react'
import Home from './Home'
import Navbar from './Navbar'
import MainFrame from './MainFrame'
import  { useState, useRef } from "react";

const Homepage = () => {
    const [nav,setNav]=useState("Project Dashboard")

  return (
    <div>
        <div className='home_main'>
            
            <Navbar setNav={setNav}/>
            <MainFrame nav={nav}/>
            
        </div>
    </div>
  )
}

export default Homepage