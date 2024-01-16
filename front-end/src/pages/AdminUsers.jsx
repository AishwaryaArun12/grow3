import React,{useState, useEffect} from 'react'
import SideBar from '../components/SideBar';
import Users from '../components/Users';
import { Flowbite } from 'flowbite-react';

const AdminUsers = () => {
   
    
     
  return (
    <div>
       <Flowbite>
  <div className='sm:block lg:flex h-screen dark:bg-gradient-to-br from-zinc-900 via-gray-700 to-zinc-900'>
    <div>
    <SideBar/>
   
    </div>
    <div>
    
        <Users />
    </div>
  </div>
   </Flowbite>
    </div>
  )
}

export default AdminUsers
