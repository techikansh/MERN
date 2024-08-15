import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Singup from './pages/Signup/Singup';
import Home from './pages/Home/Home';


const routes = (
  <Router>
    <Routes>
      <Route path='/dashboard' exact element={<Home/>} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Singup />} />
    </Routes>
  </Router>
);


function App() {
   

  return (
    <>
      {routes}
    </>
  )
}

export default App
