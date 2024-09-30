
import React, { useState } from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import axiosInstance from '../../utils/axiosInstance'

const Navbar = ({userInfo, setAllNotes, getAllNotes}) => {


  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login")
    localStorage.clear();
  }

  const onChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSearch = async () => {
    
    try {
        const response = await axiosInstance.get(`/notes/search-notes?query=${searchQuery}`);
        console.log(response);
        if (response.data.error) {
          console.log(response.data.message)
        } else {
          setAllNotes(response.data.notes)
        }
    } catch (error) {
      console.log(error)
    }
    
    
  }

  const onClearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  }

  return (
    <div className='bg-white flex items-center justify-between px-6 py-2 drop-shadow gap-1 flex-wrap'>
        
        <h2 className='text-2xl font-medium text-black py-2 hover:cursor-pointer' onClick={ () => navigate("/dashboard")}>Notes</h2>

        <SearchBar 
          value={searchQuery}
          onChange={onChange}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />

        <ProfileInfo onLogout = {onLogout} userInfo={userInfo}/>
    </div>
  )
}

export default Navbar
