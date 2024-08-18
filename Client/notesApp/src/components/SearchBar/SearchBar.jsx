import React from 'react'
import {FaMagnifyingGlass} from 'react-icons/fa6'
import {IoMdClose} from 'react-icons/io'

const SearchBar = ({value, onChange, handleSearch, onClearSearch}) => {
  return (
    <div className=' w-96 bg-slate-100 flex px-4 items-center'>

      <input className='outline-none bg-transparent w-full text-sm py-[11px]'
      type="text" value={value} onChange={onChange} placeholder='Search Notes..'/>
      
      {value && (
        <IoMdClose  className='hover:cursor-pointer text-slate-400 hover:text-black text-2xl mr-2'
        onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass className='hover:cursor-pointer text-slate-400 hover:text-black'
      onClick={handleSearch}
      />

    </div>
  )
}

export default SearchBar
