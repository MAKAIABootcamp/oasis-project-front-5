import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/Login'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/'>
            <Route index element={<Login/>}/>
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router