import React from 'react'
import {MdOutlinePushPin, MdCreate, MdDelete} from "react-icons/md"


const NoteCard = ({title, content, date, tags, isPinned, onEdit, onDelete, onPinNote}) => {
  return (
    <div className=' p-3 border rounded-lg bg-white hover:shadow-md transition-all ease-in-out'>
        
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-bold'>{title}</h6>
                <span className='text-sx text-slate-400' >{date}</span>
            </div>

            <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-primary" : "text-slate-400"}`} onClick={onPinNote}/>
        </div>

        <p className='text-xs text-slate-600 mt-2'>{content.slice(0, 60)}</p>

        <div className='flex  justify-between items-center mt-2 '>

            <div className='text-slate-400 text-sm'>{tags}</div>

            <div className='flex items-center gap-2'>
                <MdCreate className='hover:text-green-500 icon-btn' onClick={onEdit}/>
                <MdDelete className='hover:text-red-500 icon-btn' onClick={onDelete}/>
            </div>

        </div>


    </div>
  )
}

export default NoteCard
