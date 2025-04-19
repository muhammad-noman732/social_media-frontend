import React from 'react'

const SidebarItem = ({icon , label}) => {
  return (
    <div className='flex items-center gap-4 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition '>
      <span className='text-xl text-blue-500  '>{icon}</span>
      <p className='text-gray-700 text-sm font-medium'>{label}</p>
       
    </div>
  )
}

export default SidebarItem
