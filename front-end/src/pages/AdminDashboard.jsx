import React from 'react'
import SideBar from '../components/SideBar';
import { Flowbite } from 'flowbite-react';

const AdminDashboard = () => {
  return (
    <div>
        <Flowbite>
  <div className='sm:block lg:flex -mb-2 dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div className=' bg-slate-200 w-full dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
        
    
    </div>
  </div>
   </Flowbite>
    </div>
  )
}

export default AdminDashboard
