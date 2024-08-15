
import React from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow'>
        <h2 className='text-2xl font-medium text-black py-2'>Notes</h2>

        {/* To Do Search Bar */}
        {/* <SearchBar /> */}


        <ProfileInfo onLogout = {onLogout}/>
    </div>
  )
}

export default Navbar
