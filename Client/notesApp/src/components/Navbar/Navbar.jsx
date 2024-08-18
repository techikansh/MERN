
import React, { useState } from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
  }

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearch = () => {
    console.log("handing Search...");
    
  }

  const onClearSearch = () => {
    setSearchQuery("");
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow gap-1 flex-wrap'>
        
        <h2 className='text-2xl font-medium text-black py-2'>Notes</h2>

        <SearchBar 
          value={searchQuery}
          onChange={onChange}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout = {onLogout}/>
    </div>
  )
}

export default Navbar
