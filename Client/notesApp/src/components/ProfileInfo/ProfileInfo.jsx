import React, {useState} from 'react'
import {getInitials} from '../../utils/helper'; // Make sure to import getInitials

const ProfileInfo = ({onLogout, userInfo}) => {
  const isLoggedIn = !!userInfo;
  const fullName = userInfo?.fullName || '';
  const initials = isLoggedIn ? getInitials(fullName) : 'SU';

  return (
    <div className='flex gap-4 items-center'>
        <div className="bg-slate-100 p-4 rounded-full font-bold">
            {initials}
        </div>
      <div className='flex flex-col'>
        <p className='font-semibold'>{isLoggedIn ? fullName : ''}</p>
        {isLoggedIn && (  
          <p onClick={onLogout} className='underline text-slate-600 text-lg cursor-pointer'>Logout</p>
        )}
      </div>
    </div>
  )
}

export default ProfileInfo
