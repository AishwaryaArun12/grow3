import { Button } from 'flowbite-react';
import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/Auth';
import axios from '../axiosConfig'

const ConnectButton = ({foundInField,id}) => {
    const [found,setFound] = useState(foundInField);
    const {user} = useContext(AuthContext);

    const connection = async(foundInField)=>{
       
        try {
          if(!foundInField){
            await axios.patch('/edit_connection',{userId : id,requestId : user._id});
           setFound('requests')
          }else if(foundInField == 'followers'){
            await axios.patch('/edit_connection',{userId : id,unfollowId : user._id})
            setFound('pendings')
          }else if(foundInField == 'requests'){
            await axios.patch('/edit_connection',{userId : id,takeId : user._id})
            setFound()
          }else if(foundInField == 'pendings'){
            await axios.patch('/edit_connection',{userId : id,confirmId : user._id})
            setFound('followers')
          }
        
        } catch (error) {
          console.log(error,'error')
        }
      }
  return (
    <div>
      <Button onClick={()=>{
                  connection(found)}} className='z-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 m-1 hover:bg-black focus:ring-0'>
                    {!found ? 'Connect' : found == 'followers' ? 'Connected' : found == 'requests' ? 'Cancel Request' : 'Confirm Request'}</Button>
    </div>
  )
}

export default ConnectButton
