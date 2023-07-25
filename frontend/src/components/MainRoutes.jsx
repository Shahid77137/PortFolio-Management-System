import React from 'react'
import {Routes,Route} from "react-router-dom"
import Homepage from './Homepage'
import SignupForm from './SignupForm'

const MainRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<SignupForm/>}/>
            <Route path='/home' element={<Homepage/>}/>
        </Routes>
      )
}

export default MainRoutes