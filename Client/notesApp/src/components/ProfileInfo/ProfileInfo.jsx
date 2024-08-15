import React from 'react'
import {getInitials} from "../../utils/helper"

const ProfileInfo = ({onLogout}) => {




  return (
    <div className='flex gap-4 items-center'>
        <div className="bg-slate-100 p-4 rounded-full font-bold">
            {getInitials("Devansh Kumar")}
        </div>
      <div className='flex flex-col'>
        <p className='font-semibold'>Devansh Kumar</p>
        <p onClick={onLogout} className='underline text-slate-600 text-lg cursor-pointer'>Logout</p>
      </div>
    </div>
  )
}

export default ProfileInfo
