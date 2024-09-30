import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Logout from './pages/Logout/Logout';


const routes = (
  <Router>
    <Routes>
      <Route path='/' exact element={<Login/>} />
      <Route path='/dashboard' exact element={<Home/>} />
      <Route path='/login' exact element={<Login />} />
      <Route path='/signup' exact element={<Signup />} />
      <Route path='/logout' exact element={<Logout />} />
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
