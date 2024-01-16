import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/Auth';
import axios from '../axiosConfig';
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';

const Mutual = ({i}) => {
    const {user} = useContext(AuthContext);
    const [connect,setConnect] = useState('followers')
    
    
    const unconnect = async(id)=>{
        try {
            if(connect == 'followers'){
                await axios.patch('/edit_connection',{userId : id,unfollowId : i._id})
                setConnect('confirm Request')
            }else{
                await axios.patch('/edit_connection',{userId : id,confirmId : i._id})
                setConnect('followers')
            }
          
        } catch (error) {
          console.log(error)
        }
      }
      if (user.followers.some((followerId) => followerId._id === i._id)) { 
        const mutual = user.followers.reduce((count, follower) => {
            if (i.followers.includes(follower._id)) {
                return count + 1; 
            } else {
                return count; 
            }
        }, 0);  
                return (
                <div className='flex my-3'>
                    <div className="flex items-center  bg-slate-100 w-full">
          
          <img src={i?.profileImg ? `${URL}/${i.profileImg.replace('uploads\\', '')}`: defaultProfile} alt="User Avatar" className="w-12 h-12 rounded-full mx-3" />
          <a href={`/user/${i._id}`} className='ml-3 w-3/5'>
            <p className="text-gray-800 font-semibold">{i?.name}</p>
            {/* <p className="text-gray-800 font-semibold">{i?.headline}</p> */}
            <p className="text-gray-500 text-sm">{mutual} Mutual Friends</p>
          </a>
          <div className='ml-3 '>
          {user._id == i._id ? <Button>&#x1F60A; Me</Button> :
          <Button onClick={()=>{unconnect(localStorage.getItem('id'))}} className='z-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 m-1 hover:bg-black focus:ring-0 w-full'>{connect == 'followers' ? 'Connected' : 'Confirm Request' }</Button>}
          </div>
        </div>
                </div>
            )}else{
              return 
            }
}

export default Mutual
