import React, { useContext, useState } from 'react'
import { AuthContext } from '../store/Auth';
import axios,{URL} from '../axiosConfig';
import defaultProfile from '../assets/defaultProfile.png'
import { Button } from 'flowbite-react';

const Connects = ({i}) => {
    const {user} = useContext(AuthContext)
    const fields = ["followers", "requests", "pendings"];

    const foundInField = fields.find(field => {
      
      return user[field]?.some(item => {
        
        return item._id === i._id;
      });
    });
    const [foundInFields,setFoundInFields] = useState(foundInField)
    const mutual = user.followers.reduce((count, follower) => {
        if (i.followers.includes(follower._id)) {
            return count + 1; 
        } else {
            return count; 
        }
    }, 0);  
  

    const connection = async(id)=>{
      
        try {
          if(!foundInFields){
             await axios.patch('/edit_connection',{userId : id,requestId : i._id});
           setFoundInFields('pendings')
          }else if(foundInFields == 'followers'){
            await axios.patch('/edit_connection',{userId : id,unfollowId : i._id})
            setFoundInFields('requests')
            
          }else if(foundInFields == 'requests'){
            await axios.patch('/edit_connection',{userId : id,confirmId : i._id})
            setFoundInFields('followers')
          }else if(foundInFields == 'pendings'){
            await axios.patch('/edit_connection',{userId : id,takeId : i._id})
            setFoundInFields()
          }
          
        } catch (error) {
          console.log(error,'error')
        }
      }
  return (
    <div>
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
          <Button onClick={()=>{connection(localStorage.getItem('id'))}} className='w-full z-0 bg-gradient-to-br from-blue-900 via-black to-blue-900 m-1 hover:bg-black focus:ring-0'>{!foundInFields ? 'Connect' : foundInFields == 'followers' ? 'Connected' : foundInFields == 'requests' ? 'Confirm Request' : 'Cancel Request'}</Button>}
          </div>
        </div>
                </div>
    </div>
  )
}

export default Connects
